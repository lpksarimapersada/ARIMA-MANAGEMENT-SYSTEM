/**
 * ARIMA MANAGEMENT SYSTEM - BACKEND STARTER
 * Deploy as Web App.
 *
 * This endpoint is designed to be extended with the database schema
 * from the existing Apps Script project. It does not store plaintext passwords.
 */
const ARIMA = Object.freeze({
  SPREADSHEET_ID: '1xm6FqlvKLi2a2WP0vy3qfjEbCz3CggZnMxc6GcvGaA4',
  TIMEZONE: 'Asia/Jakarta'
});

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    return json_(route_(body.action, body.payload || {}));
  } catch (err) {
    return json_({success:false, message:String(err.message || err)});
  }
}

function doGet() {
  return json_({success:true, app:'ARIMA MANAGEMENT SYSTEM', status:'online'});
}

function route_(action, p) {
  switch (String(action || '')) {
    case 'login': return login_(p);
    case 'dashboard': return dashboard_(p);
    case 'students': return listSheet_('STUDENTS');
    case 'sensei': return listSheet_('SENSEI');
    case 'attendance': return listSheet_('ATTENDANCE');
    case 'billing': return listSheet_('BILLING');
    case 'payments': return listSheet_('PAYMENTS');
    case 'salary': return listSheet_('SALARY');
    default: return {success:false,message:'Unknown action: '+action};
  }
}

function ss_(){ return SpreadsheetApp.openById(ARIMA.SPREADSHEET_ID); }

function listSheet_(name) {
  const sh=ss_().getSheetByName(name);
  if(!sh) return {success:false,message:'Sheet not found: '+name};
  const values=sh.getDataRange().getValues();
  if(values.length<2) return {success:true,data:[]};
  const heads=values[0].map(String);
  return {success:true,data:values.slice(1).filter(r=>r.some(v=>v!=='')).map(r=>{
    const o={}; heads.forEach((h,i)=>o[h]=r[i]); return o;
  })};
}

function login_(p) {
  const id=String(p.userId||'').trim();
  if(!id) return {success:false,message:'ID wajib diisi.'};
  // Production authentication should reuse the secure hash/salt functions
  // from the existing Apps Script project. This starter intentionally
  // refuses plaintext password verification.
  return {success:false,message:'Backend login belum diaktifkan. Hubungkan fungsi Auth produksi dari project Apps Script.'};
}

function dashboard_() {
  return {
    success:true,
    data:{
      students: countActive_('STUDENTS','STATUS','AKTIF'),
      sensei: countActive_('SENSEI','STATUS','AKTIF'),
      attendance: 0,
      pendingBilling: 0
    }
  };
}

function countActive_(sheetName, statusCol, statusValue){
  const sh=ss_().getSheetByName(sheetName);
  if(!sh) return 0;
  const values=sh.getDataRange().getValues();
  if(values.length<2) return 0;
  const idx=values[0].map(String).indexOf(statusCol);
  if(idx<0) return values.length-1;
  return values.slice(1).filter(r=>String(r[idx]).toUpperCase()===statusValue).length;
}

function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
