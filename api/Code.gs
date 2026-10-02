/**
 * ARIMA MANAGEMENT SYSTEM - FINAL BACKEND
 * Deploy as Google Apps Script Web App.
 *
 * Features:
 * - doGet/doPost JSON API
 * - login with salted HMAC-SHA256 password verification
 * - spreadsheet-backed USERS sheet support
 * - demo fallback only when USERS sheet is missing
 * - public test wrappers for manual execution in Apps Script editor
 */
const ARIMA = Object.freeze({
  SPREADSHEET_ID: '1xm6FqlvKLi2a2WP0vy3qfjEbCz3CggZnMxc6GcvGaA4',
  TIMEZONE: 'Asia/Jakarta',
  DEFAULT_SECRET: 'ARIMA_SECRET_2026'
});

function doGet() {
  return json_(health_());
}

function doPost(e) {
  try {
    const body = JSON.parse(String(e && e.postData && e.postData.contents ? e.postData.contents : '{}'));
    const action = body && body.action ? body.action : 'health';
    const payload = body && body.payload ? body.payload : {};
    return json_(route_(action, payload, body && body.token));
  } catch (err) {
    return json_({ success: false, message: String(err && err.message ? err.message : err) });
  }
}

function route_(action, p, token) {
  switch (String(action || '')) {
    case 'health':
      return health_();
    case 'login':
      return login_(p);
    case 'logout':
      return logout_();
    case 'dashboard':
      return dashboard_();
    case 'students':
      return listSheet_('STUDENTS');
    case 'assignStudentIds':
      return assignMissingStudentIds_();
    case 'sensei':
      return senseiList_(token);
    case 'attendance':
      return listSheet_('ATTENDANCE');
    case 'billing':
      const billingAccessError = accountAccessError_(token);
      if (billingAccessError) return billingAccessError;
      return listSheet_('BILLING');
    case 'payments':
      const paymentsAccessError = accountAccessError_(token);
      if (paymentsAccessError) return paymentsAccessError;
      return listSheet_('PAYMENTS');
    case 'salary':
      const salaryAccessError = salaryAccessError_(token);
      if (salaryAccessError) return salaryAccessError;
      return listSheet_('SALARY');
    case 'salaryPreview':
      const salaryPreviewAccessError = salaryAccessError_(token);
      if (salaryPreviewAccessError) return salaryPreviewAccessError;
      return calculateSalaryRecord_(p || {});
    case 'users':
      const usersAccessError = accountAccessError_(token);
      if (usersAccessError) return usersAccessError;
      return listAccounts_();
    case 'userCreate':
      const userCreateAccessError = accountAccessError_(token);
      if (userCreateAccessError) return userCreateAccessError;
      return createAccount_(p);
    case 'userReset':
      const userResetAccessError = accountAccessError_(token);
      if (userResetAccessError) return userResetAccessError;
      return resetAccountPassword_(p);
    case 'userDelete':
      const userDeleteAccessError = accountAccessError_(token);
      if (userDeleteAccessError) return userDeleteAccessError;
      return deleteAccount_(p, token);
    case 'studentSave':
      return saveSheetRecord_('STUDENTS', 'ID_SISWA', p);
    case 'studentDelete':
      return deleteSheetRecord_('STUDENTS', 'ID_SISWA', p);
    case 'senseiSave':
      return saveSenseiRecord_(p, token);
    case 'senseiDelete':
      return deleteSheetRecord_('SENSEI', 'ID_SENSEI', p);
    case 'attendanceSave':
      return saveSheetRecord_('ATTENDANCE', 'ATTENDANCE_ID', p);
    case 'billingSave':
      const billingSaveAccessError = accountAccessError_(token);
      if (billingSaveAccessError) return billingSaveAccessError;
      return saveSheetRecord_('BILLING', 'BILLING_ID', p);
    case 'paymentSave':
      const paymentSaveAccessError = accountAccessError_(token);
      if (paymentSaveAccessError) return paymentSaveAccessError;
      return saveSheetRecord_('PAYMENTS', 'PAYMENT_ID', p);
    case 'salarySave':
      const salarySaveAccessError = salaryAccessError_(token);
      if (salarySaveAccessError) return salarySaveAccessError;
      return saveSheetRecord_('SALARY', 'SALARY_ID', p);
    default:
      return { success: false, message: 'Unknown action: ' + action };
  }
}

function ss_() {
  return SpreadsheetApp.openById(ARIMA.SPREADSHEET_ID);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function health_() {
  return {
    success: true,
    app: 'ARIMA MANAGEMENT SYSTEM',
    status: 'online'
  };
}

function logout_() {
  return { success: true, message: 'Logout berhasil.' };
}

function tokenUser_(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2) return null;

  try {
    const payloadText = Utilities.newBlob(Utilities.base64Decode(parts[0])).getDataAsString('UTF-8');
    const expectedSignature = toBase64Url_(Utilities.computeHmacSha256Signature(payloadText, buildAuthSecret_()));
    if (parts[1] !== expectedSignature) return null;
    const payload = JSON.parse(payloadText);
    if (!payload.id || Number(payload.exp) <= Date.now()) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

function isAdminToken_(token) {
  const user = tokenUser_(token);
  return String(user && user.role || '').trim().toUpperCase() === 'ADMIN';
}

function adminOnlyResponse_() {
  return { success: false, code: 'FORBIDDEN', message: 'Data payroll hanya dapat diakses oleh admin.' };
}

function accountAccessError_(token) {
  const user = tokenUser_(token);
  if (!user) {
    return { success: false, code: 'AUTH_REQUIRED', message: 'Sesi login perlu diperbarui. Silakan login kembali.' };
  }
  if (String(user.role || '').trim().toUpperCase() !== 'ADMIN') {
    return { success: false, code: 'FORBIDDEN', message: 'Pengelolaan akun hanya dapat dilakukan admin.' };
  }
  return null;
}

function accountSheetMeta_() {
  const workbook = ss_();
  let sheet = workbook.getSheetByName('USERS');
  if (!sheet) sheet = workbook.insertSheet('USERS');

  let values = sheet.getDataRange().getValues();
  if (!values.length || !values[0].some(function (cell) { return String(cell || '').trim(); })) {
    const headers = ['ID', 'NAMA', 'ROLE', 'SALT', 'PASSWORD_HASH', 'CREATED_AT', 'UPDATED_AT'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    values = sheet.getDataRange().getValues();
  }

  const headers = values[0].map(function (header) { return String(header || '').trim(); });
  const columns = {
    id: findColumnIndex_(headers, ['USER_ID', 'ID_USER', 'ID']),
    name: findColumnIndex_(headers, ['NAME', 'NAMA']),
    role: findColumnIndex_(headers, ['ROLE']),
    salt: findColumnIndex_(headers, ['PASSWORD_SALT', 'SALT']),
    hash: findColumnIndex_(headers, ['PASSWORD_HASH', 'PASSWORDHASH'])
  };
  if (Object.keys(columns).some(function (key) { return columns[key] < 0; })) {
    return { success: false, message: 'Header USERS harus memiliki ID, NAMA, ROLE, SALT, dan PASSWORD_HASH.' };
  }

  return { success: true, sheet: sheet, values: values, headers: headers, columns: columns };
}

function listAccounts_() {
  const meta = accountSheetMeta_();
  if (!meta.success) return meta;

  const data = meta.values.slice(1).map(function (row, index) {
    const id = String(row[meta.columns.id] || '').trim();
    if (!id) return null;
    return {
      USER_ID: id,
      NAMA: String(row[meta.columns.name] || id),
      ROLE: String(row[meta.columns.role] || 'USER'),
      __ROW_NUMBER: index + 2
    };
  }).filter(function (user) { return !!user; });

  return { success: true, data: data };
}

function linkedAccountPerson_(role, userId) {
  const sheetName = role === 'SISWA' ? 'STUDENTS' : role === 'SENSEI' ? 'SENSEI' : '';
  if (!sheetName) return { success: true, person: null };

  const sheet = ss_().getSheetByName(sheetName);
  if (!sheet) return { success: false, message: 'Sheet ' + sheetName + ' tidak ditemukan.' };
  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  const idIndex = findColumnIndex_(headers, [role === 'SISWA' ? 'ID_SISWA' : 'ID_SENSEI']);
  const nameIndex = findColumnIndex_(headers, ['NAMA', 'NAME']);
  if (idIndex < 0) return { success: false, message: 'Kolom ID untuk ' + role + ' tidak ditemukan.' };

  const row = values.slice(1).find(function (item) {
    return String(item[idIndex] || '').trim().toUpperCase() === String(userId || '').trim().toUpperCase();
  });
  if (!row) return { success: false, message: 'ID tersebut belum terdaftar pada data ' + (role === 'SISWA' ? 'siswa.' : 'sensei.') };
  return { success: true, person: { id: row[idIndex], name: nameIndex < 0 ? String(userId) : String(row[nameIndex] || userId) } };
}

function accountRowById_(meta, userId) {
  const normalized = String(userId || '').trim().toUpperCase();
  for (let index = 1; index < meta.values.length; index += 1) {
    if (String(meta.values[index][meta.columns.id] || '').trim().toUpperCase() === normalized) {
      return { row: meta.values[index], rowNumber: index + 1 };
    }
  }
  return null;
}

function accountPasswordValues_(password) {
  const value = String(password || '');
  if (value.length < 8) return { success: false, message: 'Password minimal 8 karakter.' };
  const salt = Utilities.getUuid();
  return { success: true, salt: salt, hash: hashPassword_(value, salt, buildAuthSecret_()) };
}

function createAccount_(payload) {
  const record = payload && typeof payload === 'object' ? payload : {};
  const userId = String(record.userId || record.USER_ID || '').trim();
  const role = String(record.role || record.ROLE || '').trim().toUpperCase();
  if (!userId) return { success: false, message: 'ID akun wajib diisi.' };
  if (['ADMIN', 'SENSEI', 'SISWA'].indexOf(role) < 0) return { success: false, message: 'Role akun tidak valid.' };

  const password = accountPasswordValues_(record.password);
  if (!password.success) return password;

  let name = String(record.name || record.NAMA || '').trim();
  if (role !== 'ADMIN') {
    const linked = linkedAccountPerson_(role, userId);
    if (!linked.success) return linked;
    name = linked.person.name;
  }
  if (!name) return { success: false, message: 'Nama admin wajib diisi.' };

  const meta = accountSheetMeta_();
  if (!meta.success) return meta;
  if (accountRowById_(meta, userId)) return { success: false, message: 'ID akun sudah terdaftar.' };

  const row = new Array(meta.headers.length).fill('');
  row[meta.columns.id] = userId;
  row[meta.columns.name] = name;
  row[meta.columns.role] = role;
  row[meta.columns.salt] = password.salt;
  row[meta.columns.hash] = password.hash;
  const createdIndex = findColumnIndex_(meta.headers, ['CREATED_AT']);
  if (createdIndex >= 0) row[createdIndex] = new Date();
  meta.sheet.appendRow(row);

  return { success: true, message: 'Akun berhasil dibuat.', data: { USER_ID: userId, NAMA: name, ROLE: role } };
}

function resetAccountPassword_(payload) {
  const record = payload && typeof payload === 'object' ? payload : {};
  const userId = String(record.userId || record.USER_ID || '').trim();
  const meta = accountSheetMeta_();
  if (!meta.success) return meta;
  const found = accountRowById_(meta, userId);
  if (!found) return { success: false, message: 'Akun tidak ditemukan.' };

  const password = accountPasswordValues_(record.password);
  if (!password.success) return password;
  meta.sheet.getRange(found.rowNumber, meta.columns.salt + 1).setValue(password.salt);
  meta.sheet.getRange(found.rowNumber, meta.columns.hash + 1).setValue(password.hash);
  const updatedIndex = findColumnIndex_(meta.headers, ['UPDATED_AT']);
  if (updatedIndex >= 0) meta.sheet.getRange(found.rowNumber, updatedIndex + 1).setValue(new Date());

  return { success: true, message: 'Password akun berhasil direset.', data: { USER_ID: userId } };
}

function deleteAccount_(payload, token) {
  const record = payload && typeof payload === 'object' ? payload : {};
  const userId = String(record.userId || record.USER_ID || '').trim();
  const actor = tokenUser_(token);
  if (String(actor && actor.id || '').trim().toUpperCase() === userId.toUpperCase()) {
    return { success: false, message: 'Akun yang sedang digunakan tidak dapat dihapus.' };
  }

  const meta = accountSheetMeta_();
  if (!meta.success) return meta;
  const found = accountRowById_(meta, userId);
  if (!found) return { success: false, message: 'Akun tidak ditemukan.' };

  const role = String(found.row[meta.columns.role] || '').trim().toUpperCase();
  if (role === 'ADMIN') {
    const admins = meta.values.slice(1).filter(function (row) {
      return String(row[meta.columns.role] || '').trim().toUpperCase() === 'ADMIN';
    });
    if (admins.length <= 1) return { success: false, message: 'Akun admin terakhir tidak dapat dihapus.' };
  }

  meta.sheet.deleteRow(found.rowNumber);
  return { success: true, message: 'Akun berhasil dihapus.' };
}

function salaryAccessError_(token) {
  const user = tokenUser_(token);
  if (!user) {
    return { success: false, code: 'AUTH_REQUIRED', message: 'Sesi login perlu diperbarui. Silakan keluar lalu login kembali.' };
  }
  return String(user.role || '').trim().toUpperCase() === 'ADMIN' ? null : adminOnlyResponse_();
}

function senseiList_(token) {
  const response = listSheet_('SENSEI');
  if (!response.success || isAdminToken_(token)) return response;

  response.data.forEach(function (row) {
    delete row.TARIF_PER_PERTEMUAN;
    delete row.TARIF_PER_JAM;
  });
  return response;
}

function saveSenseiRecord_(payload, token) {
  if (isAdminToken_(token)) return saveSheetRecord_('SENSEI', 'ID_SENSEI', payload);

  const record = Object.assign({}, payload && typeof payload === 'object' ? payload : {});
  delete record.TARIF_PER_PERTEMUAN;
  delete record.TARIF_PER_JAM;
  return saveSheetRecord_('SENSEI', 'ID_SENSEI', record);
}

function buildAuthSecret_() {
  const props = PropertiesService.getScriptProperties();
  let secret = props.getProperty('ARIMA_AUTH_SECRET');
  if (!secret) {
    secret = ARIMA.DEFAULT_SECRET;
    props.setProperty('ARIMA_AUTH_SECRET', secret);
  }
  return secret;
}

function toHex_(bytes) {
  const data = Array.isArray(bytes) ? bytes : Array.from(bytes || []);
  return data.map(function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

function hashPassword_(password, salt, secret) {
  const text = String(salt || '') + ':' + String(password || '');
  const signature = Utilities.computeHmacSha256Signature(text, String(secret || ''));
  return toHex_(signature).toLowerCase();
}

function toBase64Url_(bytes) {
  if (!bytes) return '';
  const encoded = Utilities.base64Encode(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  return String(encoded || '').trim();
}

function passwordHashCandidates_(password, salt, secret) {
  const values = new Set();
  const textA = String(salt || '') + ':' + String(password || '');
  const textB = String(password || '') + ':' + String(salt || '');
  const secretText = String(secret || '');

  const add = function (value) {
    if (!value) return;
    const normalized = String(value).trim();
    if (!normalized) return;
    values.add(normalized.toLowerCase());
    values.add(normalized);
  };

  const hmacA = Utilities.computeHmacSha256Signature(textA, secretText);
  const hmacB = Utilities.computeHmacSha256Signature(textB, secretText);
  add(toHex_(hmacA));
  add(toHex_(hmacB));
  add(toBase64Url_(hmacA));
  add(toBase64Url_(hmacB));
  add(Utilities.base64Encode(hmacA));
  add(Utilities.base64Encode(hmacB));

  if (typeof Utilities.computeDigest === 'function') {
    const shaA = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, textA);
    const shaB = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, textB);
    add(toHex_(shaA));
    add(toHex_(shaB));
    add(toBase64Url_(shaA));
    add(toBase64Url_(shaB));
    add(Utilities.base64Encode(shaA));
    add(Utilities.base64Encode(shaB));
  }

  return Array.from(values);
}

function verifyPassword_(password, user, secret) {
  const storedHash = String(user && user.passwordHash ? user.passwordHash : '').trim();
  if (!storedHash) return false;

  const salt = String(user && user.salt ? user.salt : '').trim();
  if (!salt) return false;

  const candidates = passwordHashCandidates_(password, salt, secret);
  const normalizedStored = storedHash.replace(/\s+/g, '').trim();

  return candidates.some(function (candidate) {
    return String(candidate).replace(/\s+/g, '').toLowerCase() === normalizedStored.replace(/\s+/g, '').toLowerCase();
  });
}

function demoUsers_() {
  const secret = buildAuthSecret_();
  return [
    {
      id: 'ADMIN001',
      name: 'Admin',
      role: 'ADMIN',
      salt: 'admin001',
      passwordHash: hashPassword_('admin123', 'admin001', secret)
    },
    {
      id: 'SENSEI001',
      name: 'Sensei',
      role: 'SENSEI',
      salt: 'sensei001',
      passwordHash: hashPassword_('admin123', 'sensei001', secret)
    },
    {
      id: 'SISWA001',
      name: 'Siswa',
      role: 'SISWA',
      salt: 'siswa001',
      passwordHash: hashPassword_('admin123', 'siswa001', secret)
    }
  ];
}

function ensureUsersSheet_() {
  const workbook = ss_();
  if (!workbook || typeof workbook.getSheetByName !== 'function') {
    return null;
  }

  let sheet = workbook.getSheetByName('USERS');
  if (!sheet) {
    if (typeof workbook.insertSheet !== 'function') {
      return null;
    }
    sheet = workbook.insertSheet('USERS');
  }

  const headers = ['ID', 'NAMA', 'ROLE', 'SALT', 'PASSWORD_HASH'];
  const current = typeof sheet.getDataRange === 'function' ? sheet.getDataRange().getValues() : [];
  if (!current.length) {
    if (typeof sheet.appendRow !== 'function') {
      return sheet;
    }
    sheet.appendRow(headers);
    const users = demoUsers_();
    users.forEach(function (user) {
      sheet.appendRow([
        user.id,
        user.name,
        user.role,
        user.salt,
        user.passwordHash
      ]);
    });
    return sheet;
  }

  const firstRow = current[0].map(function (cell) {
    return String(cell || '').trim();
  });
  if (JSON.stringify(firstRow) !== JSON.stringify(headers)) {
    if (typeof sheet.getRange === 'function') {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  }

  return sheet;
}

function normalizeUserRecord_(record) {
  if (!record || typeof record !== 'object') return null;

  const id = String(record.USER_ID || record.ID || record.userId || record.id || '').trim();
  if (!id) return null;

  const name = String(record.NAME || record.NAMA || record.name || record.fullName || id).trim();
  const role = String(record.ROLE || record.role || 'USER').trim() || 'USER';
  const passwordHash = record.PASSWORD_HASH || record.PASSWORDHASH || record.passwordHash || record['PASSWORD HASH'] || '';
  const salt = record.PASSWORD_SALT || record.SALT || record.PASSWORD_SALT || record.passwordSalt || record['PASSWORD SALT'] || '';

  return {
    id: id,
    name: name,
    role: role,
    passwordHash: String(passwordHash || ''),
    salt: String(salt || '')
  };
}

function getUsers_() {
  const workbook = ss_();
  if (!workbook || typeof workbook.getSheetByName !== 'function') {
    return demoUsers_();
  }

  let sh = workbook.getSheetByName('USERS');
  if (!sh) {
    const ensured = ensureUsersSheet_();
    if (!ensured) {
      return demoUsers_();
    }
    sh = ensured;
  }

  if (typeof sh.getDataRange !== 'function') {
    return demoUsers_();
  }

  const values = sh.getDataRange().getValues();
  if (values.length < 2) {
    const demo = demoUsers_();
    if (typeof sh.appendRow === 'function') {
      sh.appendRow(['ID', 'NAMA', 'ROLE', 'SALT', 'PASSWORD_HASH']);
      demo.forEach(function (user) {
        sh.appendRow([user.id, user.name, user.role, user.salt, user.passwordHash]);
      });
    }
    return demo;
  }

  const headers = values[0].map(function (header) {
    return String(header || '').trim();
  });

  const rows = values.slice(1).filter(function (row) {
    return row.some(function (cell) {
      return cell !== '' && cell !== null && cell !== undefined;
    });
  });

  return rows.map(function (row) {
    const record = {};
    headers.forEach(function (header, index) {
      record[header] = row[index];
    });
    return normalizeUserRecord_(record);
  }).filter(function (user) {
    return !!user;
  });
}

function findUserById_(userId) {
  const normalized = String(userId || '').trim().toUpperCase();
  const users = getUsers_();
  return users.find(function (user) {
    return String(user.id || '').trim().toUpperCase() === normalized;
  }) || null;
}

function login_(p) {
  const id = String(p && p.userId ? p.userId : '').trim();
  const password = String(p && p.password ? p.password : '');

  if (!id) return { success: false, message: 'ID wajib diisi.' };
  if (!password) return { success: false, message: 'Password wajib diisi.' };

  const user = findUserById_(id);
  if (!user) {
    return { success: false, message: 'User tidak ditemukan.' };
  }

  const secret = buildAuthSecret_();
  if (!verifyPassword_(password, user, secret)) {
    return { success: false, message: 'Password salah.' };
  }

  const safeUser = {
    id: String(user.id || id),
    name: String(user.name || id),
    role: String(user.role || 'USER')
  };

  const tokenPayload = JSON.stringify({
    id: safeUser.id,
    name: safeUser.name,
    role: safeUser.role,
    exp: Date.now() + (60 * 60 * 1000)
  });

  const token = Utilities.base64Encode(tokenPayload) + '.' + toBase64Url_(
    Utilities.computeHmacSha256Signature(tokenPayload, buildAuthSecret_())
  );

  return {
    success: true,
    message: 'Login berhasil.',
    token: token,
    user: safeUser
  };
}

function listSheet_(name) {
  const sh = ss_().getSheetByName(name);
  if (!sh) return { success: false, message: 'Sheet not found: ' + name };

  const values = sh.getDataRange().getValues();
  if (values.length < 2) return { success: true, data: [] };

  const headers = values[0].map(String);
  const data = values.slice(1).map(function (row, index) {
    return { row: row, rowNumber: index + 2 };
  }).filter(function (entry) {
    return entry.row.some(function (cell) {
      return cell !== '' && cell !== null && cell !== undefined;
    });
  }).map(function (entry) {
    const obj = {};
    headers.forEach(function (header, index) {
      obj[header] = entry.row[index];
    });
    obj.__ROW_NUMBER = entry.rowNumber;
    return obj;
  });

  return { success: true, data: data };
}

function requiredFields_(sheetName) {
  const fields = {
    STUDENTS: ['NAMA', 'NO_WA', 'NAMA_ORANG_TUA', 'PROGRAM', 'ASRAMA', 'TANGGAL_MASUK', 'STATUS'],
    SENSEI: ['NAMA'],
    ATTENDANCE: ['ACTOR_ID', 'ACTOR_TYPE', 'TANGGAL', 'STATUS'],
    BILLING: ['ID_SISWA', 'DESCRIPTION', 'CATEGORY', 'AMOUNT', 'DUE_DATE', 'STATUS'],
    PAYMENTS: ['BILLING_ID', 'ID_SISWA', 'PAYMENT_DATE', 'AMOUNT', 'PAYMENT_METHOD'],
    SALARY: ['ID_SENSEI', 'PERIOD', 'PAYMENT_STATUS']
  };
  return fields[sheetName] || [];
}

function assignMissingStudentIds_() {
  const sh = ss_().getSheetByName('STUDENTS');
  if (!sh) return { success: false, message: 'Sheet not found: STUDENTS' };

  const values = sh.getDataRange().getValues();
  if (!values.length) return { success: false, message: 'Header sheet STUDENTS belum tersedia.' };

  const headers = values[0].map(function (header) { return String(header || '').trim(); });
  const idIndex = findColumnIndex_(headers, ['ID_SISWA']);
  if (idIndex < 0) return { success: false, message: 'Kolom ID_SISWA tidak ditemukan.' };

  let assigned = 0;
  for (let i = 1; i < values.length; i += 1) {
    const row = values[i];
    if (!row.some(function (cell) { return String(cell || '').trim() !== ''; })) continue;
    if (String(row[idIndex] || '').trim()) continue;

    row[idIndex] = nextRecordId_('STUDENTS', values, idIndex);
    assigned += 1;
  }

  if (values.length > 1 && assigned) {
    sh.getRange(2, idIndex + 1, values.length - 1, 1).setValues(
      values.slice(1).map(function (row) { return [row[idIndex]]; })
    );
  }

  return {
    success: true,
    message: assigned ? assigned + ' ID siswa berhasil dibuat.' : 'Semua siswa sudah memiliki ID.',
    data: { assigned: assigned }
  };
}

function nextRecordId_(sheetName, values, keyIndex) {
  const prefixes = {
    STUDENTS: 'SISWA',
    SENSEI: 'SENSEI',
    ATTENDANCE: 'ATT',
    BILLING: 'BILL',
    PAYMENTS: 'PAY',
    SALARY: 'SAL'
  };
  const prefix = prefixes[sheetName] || 'REC';
  let highest = 0;

  values.slice(1).forEach(function (row) {
    const match = String(row[keyIndex] || '').trim().match(new RegExp('^' + prefix + '(\\d+)$', 'i'));
    if (match) highest = Math.max(highest, Number(match[1]));
  });

  return prefix + String(highest + 1).padStart(3, '0');
}

function normalizeRecordValue_(field, value) {
  const numericFields = [
    'TARIF_PER_PERTEMUAN', 'TARIF_PER_JAM', 'AMOUNT', 'MEETING_COUNT',
    'HOUR_COUNT', 'BASE_AMOUNT', 'BONUS', 'DEDUCTION', 'NET_SALARY'
  ];
  const text = String(value === null || value === undefined ? '' : value).trim();
  if (!text || numericFields.indexOf(field) < 0) return text;

  const number = Number(text);
  if (!Number.isFinite(number)) {
    throw new Error(field + ' harus berupa angka yang valid.');
  }
  return number;
}

function periodKey_(value) {
  if (value instanceof Date) return Utilities.formatDate(value, ARIMA.TIMEZONE, 'yyyy-MM');
  return String(value || '').trim().slice(0, 7);
}

function clockMinutes_(value) {
  if (value instanceof Date) return value.getHours() * 60 + value.getMinutes();
  if (typeof value === 'number' && value >= 0 && value < 1) return Math.round(value * 1440);

  const text = String(value || '').trim();
  const match = text.match(/(?:T|^)(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function paidTeachingMinutes_(start, end) {
  if (start === null || end === null || start === end) return null;

  const startAt = start;
  const endAt = end > start ? end : end + 1440;
  let paidMinutes = endAt - startAt;
  const breaks = [[600, 615], [720, 795]];

  for (let dayStart = Math.floor(startAt / 1440) * 1440; dayStart < endAt; dayStart += 1440) {
    breaks.forEach(function (pause) {
      const overlapStart = Math.max(startAt, dayStart + pause[0]);
      const overlapEnd = Math.min(endAt, dayStart + pause[1]);
      paidMinutes -= Math.max(0, overlapEnd - overlapStart);
    });
  }

  return Math.max(0, paidMinutes);
}

function calculateSalaryRecord_(record) {
  const senseiSheet = ss_().getSheetByName('SENSEI');
  const attendanceSheet = ss_().getSheetByName('ATTENDANCE');
  if (!senseiSheet || !attendanceSheet) {
    return { success: false, message: 'Sheet SENSEI atau ATTENDANCE tidak ditemukan.' };
  }

  const senseiValues = senseiSheet.getDataRange().getValues();
  const senseiHeaders = senseiValues[0].map(String);
  const senseiIdIndex = findColumnIndex_(senseiHeaders, ['ID_SENSEI']);
  const rateIndex = findColumnIndex_(senseiHeaders, ['TARIF_PER_JAM']);
  const sensei = senseiValues.slice(1).find(function (row) {
    return String(row[senseiIdIndex] || '').trim() === String(record.ID_SENSEI || '').trim();
  });
  if (!sensei || rateIndex < 0) return { success: false, message: 'Sensei atau tarif per JP tidak ditemukan.' };

  const rate = Number(sensei[rateIndex]);
  if (!Number.isFinite(rate) || rate <= 0) {
    return { success: false, message: 'Tarif per JP sensei harus lebih dari 0.' };
  }

  const period = periodKey_(record.PERIOD);
  if (!/^\d{4}-\d{2}$/.test(period)) {
    return { success: false, message: 'Periode payroll harus menggunakan format bulan dan tahun.' };
  }

  const attendanceValues = attendanceSheet.getDataRange().getValues();
  const headers = attendanceValues[0].map(String);
  const actorIdIndex = findColumnIndex_(headers, ['ACTOR_ID']);
  const actorTypeIndex = findColumnIndex_(headers, ['ACTOR_TYPE']);
  const dateIndex = findColumnIndex_(headers, ['TANGGAL']);
  const statusIndex = findColumnIndex_(headers, ['STATUS']);
  const startIndex = findColumnIndex_(headers, ['JAM_MASUK']);
  const endIndex = findColumnIndex_(headers, ['JAM_KELUAR']);
  if ([actorIdIndex, actorTypeIndex, dateIndex, statusIndex, startIndex, endIndex].some(function (index) { return index < 0; })) {
    return { success: false, message: 'Kolom absensi untuk perhitungan JP belum lengkap.' };
  }

  let meetingCount = 0;
  let totalMinutes = 0;
  let incompleteTimes = 0;
  attendanceValues.slice(1).forEach(function (row) {
    const status = String(row[statusIndex] || '').trim().toUpperCase();
    if (String(row[actorIdIndex] || '').trim() !== String(record.ID_SENSEI || '').trim()) return;
    if (String(row[actorTypeIndex] || '').trim().toUpperCase() !== 'SENSEI') return;
    if (periodKey_(row[dateIndex]) !== period) return;
    if (status !== 'HADIR' && status !== 'TERLAMBAT') return;

    meetingCount += 1;
    const paidMinutes = paidTeachingMinutes_(clockMinutes_(row[startIndex]), clockMinutes_(row[endIndex]));
    if (paidMinutes === null) {
      incompleteTimes += 1;
      return;
    }
    totalMinutes += paidMinutes;
  });

  if (incompleteTimes) {
    return { success: false, message: incompleteTimes + ' absensi hadir sensei belum memiliki waktu masuk dan keluar.' };
  }

  const jpCount = Math.round((totalMinutes / 45) * 100) / 100;
  const baseAmount = Math.round(jpCount * rate);
  const bonus = Number(record.BONUS || 0);
  const deduction = Number(record.DEDUCTION || 0);
  if (!Number.isFinite(bonus) || !Number.isFinite(deduction)) {
    return { success: false, message: 'Bonus dan potongan harus berupa angka.' };
  }

  return {
    success: true,
    data: {
      MEETING_COUNT: meetingCount,
      HOUR_COUNT: jpCount,
      BASE_AMOUNT: baseAmount,
      NET_SALARY: baseAmount + bonus - deduction
    }
  };
}

function saveSheetRecord_(sheetName, keyField, payload) {
  const sh = ss_().getSheetByName(sheetName);
  if (!sh) return { success: false, message: 'Sheet not found: ' + sheetName };

  const values = sh.getDataRange().getValues();
  if (!values.length) return { success: false, message: 'Header sheet ' + sheetName + ' belum tersedia.' };

  const headers = values[0].map(function (header) { return String(header || '').trim(); });
  const keyIndex = findColumnIndex_(headers, [keyField]);
  if (keyIndex < 0) return { success: false, message: 'Kolom ' + keyField + ' tidak ditemukan.' };

  const record = Object.assign({}, payload && typeof payload === 'object' ? payload : {});
  const mode = String(record.__MODE || 'upsert');
  const missing = requiredFields_(sheetName).filter(function (field) {
    return String(record[field] || '').trim() === '';
  });
  if (missing.length) {
    return { success: false, message: 'Kolom wajib belum diisi: ' + missing.join(', ') };
  }

  if (sheetName === 'SALARY') {
    const calculation = calculateSalaryRecord_(record);
    if (!calculation.success) return calculation;
    Object.assign(record, calculation.data);
  }

  const requestedKey = String(record[keyField] || '').trim();
  const requestedRow = Number(record.__ROW_NUMBER);
  let rowNumber = Number.isInteger(requestedRow) && requestedRow >= 2 && requestedRow <= sh.getLastRow()
    ? requestedRow
    : 0;

  if (rowNumber && requestedKey) {
    const existingKey = String(sh.getRange(rowNumber, keyIndex + 1).getValue() || '').trim();
    if (existingKey !== requestedKey) {
      return { success: false, message: 'Data berubah sejak dibuka. Muat ulang lalu coba lagi.' };
    }
  }

  if (!rowNumber && requestedKey) {
    for (let i = 1; i < values.length; i += 1) {
      if (String(values[i][keyIndex] || '').trim() === requestedKey) {
        rowNumber = i + 1;
        break;
      }
    }
  }

  if (mode === 'update' && !rowNumber) {
    return { success: false, message: 'Data yang akan diperbarui tidak ditemukan.' };
  }
  if (mode === 'create' && rowNumber) {
    return { success: false, message: 'ID tersebut sudah digunakan.' };
  }

  const isUpdate = rowNumber > 0;
  const row = isUpdate
    ? sh.getRange(rowNumber, 1, 1, headers.length).getValues()[0]
    : new Array(headers.length).fill('');
  const finalKey = requestedKey || String(row[keyIndex] || '').trim() || nextRecordId_(sheetName, values, keyIndex);

  headers.forEach(function (header, index) {
    if (Object.prototype.hasOwnProperty.call(record, header) && header !== '__ROW_NUMBER') {
      row[index] = normalizeRecordValue_(header, record[header]);
    }
  });

  if (!String(row[keyIndex] || '').trim()) row[keyIndex] = finalKey;

  const createdIndex = findColumnIndex_(headers, ['CREATED_AT']);
  const updatedIndex = findColumnIndex_(headers, ['UPDATED_AT']);
  if (!isUpdate && createdIndex >= 0 && !row[createdIndex]) row[createdIndex] = new Date();
  if (updatedIndex >= 0) row[updatedIndex] = new Date();

  if (isUpdate) {
    sh.getRange(rowNumber, 1, 1, headers.length).setValues([row]);
  } else {
    sh.appendRow(row);
    rowNumber = sh.getLastRow();
  }

  return {
    success: true,
    message: isUpdate ? 'Data berhasil diperbarui.' : 'Data berhasil ditambahkan.',
    data: { [keyField]: row[keyIndex], __ROW_NUMBER: rowNumber }
  };
}

function deleteSheetRecord_(sheetName, keyField, payload) {
  const sh = ss_().getSheetByName(sheetName);
  if (!sh) return { success: false, message: 'Sheet not found: ' + sheetName };
  if (sh.getLastRow() < 2 || sh.getLastColumn() < 1) {
    return { success: false, message: 'Belum ada data untuk dihapus.' };
  }

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function (header) {
    return String(header || '').trim();
  });
  const keyIndex = findColumnIndex_(headers, [keyField]);
  if (keyIndex < 0) return { success: false, message: 'Kolom ' + keyField + ' tidak ditemukan.' };

  const record = payload && typeof payload === 'object' ? payload : {};
  const key = String(record[keyField] || '').trim();
  const requestedRow = Number(record.__ROW_NUMBER);
  let rowNumber = Number.isInteger(requestedRow) && requestedRow >= 2 && requestedRow <= sh.getLastRow()
    ? requestedRow
    : 0;

  if (rowNumber && key) {
    const existingKey = String(sh.getRange(rowNumber, keyIndex + 1).getValue() || '').trim();
    if (existingKey !== key) {
      return { success: false, message: 'Data berubah sejak dibuka. Muat ulang lalu coba lagi.' };
    }
  }

  if (!rowNumber && key) {
    const values = sh.getRange(2, keyIndex + 1, sh.getLastRow() - 1, 1).getValues();
    for (let i = 0; i < values.length; i += 1) {
      if (String(values[i][0] || '').trim() === key) {
        rowNumber = i + 2;
        break;
      }
    }
  }

  if (!rowNumber) return { success: false, message: 'Data tidak ditemukan.' };
  sh.deleteRow(rowNumber);
  return { success: true, message: 'Data berhasil dihapus.' };
}

function dashboard_() {
  return {
    success: true,
    data: {
      students: countActive_('STUDENTS', 'STATUS', 'AKTIF'),
      sensei: countActive_('SENSEI', 'STATUS', 'AKTIF'),
      attendance: 0,
      pendingBilling: 0
    }
  };
}

function normalizeHeaderName_(value) {
  return String(value || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

function findColumnIndex_(headers, candidates) {
  const normalizedCandidates = (candidates || []).map(function (candidate) {
    return normalizeHeaderName_(candidate);
  });

  for (let i = 0; i < headers.length; i += 1) {
    const header = normalizeHeaderName_(headers[i]);
    if (normalizedCandidates.indexOf(header) >= 0) {
      return i;
    }
  }

  return -1;
}

function countActive_(sheetName, statusCol, statusValue) {
  const sh = ss_().getSheetByName(sheetName);
  if (!sh) return 0;

  const values = sh.getDataRange().getValues();
  if (values.length < 2) return 0;

  const headers = values[0].map(String);
  const index = findColumnIndex_(headers, [statusCol, 'STATUS', 'STATUS_SISWA', 'STATUS_SENSEI']);
  if (index < 0) {
    return values.slice(1).filter(function (row) {
      return row.some(function (cell) {
        return String(cell || '').trim() !== '';
      });
    }).length;
  }

  return values.slice(1).filter(function (row) {
    return String(row[index] || '').trim().toUpperCase() === String(statusValue || '').trim().toUpperCase();
  }).length;
}

function testLogin() {
  const result = login_({ userId: 'ADMIN001', password: 'admin123' });
  Logger.log(JSON.stringify(result));
  return result;
}

function testSpreadsheetConnection() {
  const workbook = ss_();
  const users = workbook.getSheetByName('USERS');
  const result = {
    success: !!workbook,
    spreadsheetId: ARIMA.SPREADSHEET_ID,
    usersSheetExists: !!users,
    usersCount: users ? users.getLastRow() - 1 : 0
  };
  Logger.log(JSON.stringify(result));
  return result;
}
