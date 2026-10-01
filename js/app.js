window.App = (() => {

  const menus = [
    ["dashboard", "Dashboard", "▦"],
    ["students", "Siswa", "♙"],
    ["sensei", "Sensei", "◎"],
    ["attendance", "Absensi", "✓"],
    ["billing", "Tagihan", "Rp"],
    ["payments", "Pembayaran", "↔"],
    ["salary", "Payroll Sensei", "¥"],
    ["reports", "Laporan", "▤"],
    ["settings", "Pengaturan", "⚙"]
  ];

  let user = null;
  let schema = {};

  // =========================================================
  // INIT
  // =========================================================

  async function init() {

    user = Auth.require();

    if (!user) return;

    renderShell();

    try {

      const r = await API.call("schema");

      if (r && r.success) {
        schema = r.data || {};
      }

    } catch (error) {

      console.error("Schema error:", error);

    }

    await load("dashboard");
  }


  // =========================================================
  // SHELL
  // =========================================================

  function renderShell() {

    document.getElementById("app").innerHTML = `
      <div class="shell">

        <aside class="sidebar">

          <div class="side-brand">

            <img
              src="assets/logo.webp"
              alt="Arima Management"
            >

            <strong>
              ARIMA<br>
              MANAGEMENT
            </strong>

          </div>

          <nav class="nav">

            ${menus.map(m => `
              <a
                href="#"
                data-page="${m[0]}"
              >
                ${m[2]} &nbsp; ${m[1]}
              </a>
            `).join("")}

            <a
              href="#"
              id="logout"
            >
              ↪ &nbsp; Keluar
            </a>

          </nav>

        </aside>


        <main class="main">

          <header class="topbar">

            <div>
              <strong>
                ${esc(ARIMA_CONFIG.COMPANY_NAME)}
              </strong>
            </div>

            <div class="muted">
              ${esc(user.name)} · ${esc(user.role)}
            </div>

          </header>


          <section
            class="content"
            id="page"
          ></section>

        </main>

      </div>
    `;


    document
      .querySelectorAll("[data-page]")
      .forEach(a => {

        a.onclick = e => {

          e.preventDefault();

          load(a.dataset.page);

        };

      });


    document
      .getElementById("logout")
      .onclick = async e => {

        e.preventDefault();

        await Auth.logout();

      };

  }


  // =========================================================
  // PAGE LOADER
  // =========================================================

  async function load(page) {

    document
      .querySelectorAll("[data-page]")
      .forEach(a => {

        a.classList.toggle(
          "active",
          a.dataset.page === page
        );

      });


    const el =
      document.getElementById("page");


    el.innerHTML = `
      <div class="card">
        Memuat...
      </div>
    `;


    const map = {

      dashboard: renderDashboard,

      students: renderStudents,

      sensei: renderSensei,

      attendance: renderAttendance,

      billing: renderBilling,

      payments: renderPayments,

      salary: renderSalary,

      reports: renderReports,

      settings: renderSettings

    };


    try {

      await (
        map[page] ||
        renderDashboard
      )(el);

    } catch (error) {

      console.error(error);

      el.innerHTML = `
        <div class="card">
          <div class="error-box">
            ${esc(error.message || "Terjadi kesalahan.")}
          </div>
        </div>
      `;

    }

  }


  // =========================================================
  // ESCAPE HTML
  // =========================================================

  function esc(value) {

    return String(value ?? "")
      .replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c]));

  }


  // =========================================================
  // TABLE
  // =========================================================

  function table(rows, cols) {

    return `
      <div class="table-wrap">

        <table class="table">

          <thead>

            <tr>

              ${cols
                .map(c => `<th>${esc(c)}</th>`)
                .join("")}

              <th>Aksi</th>

            </tr>

          </thead>


          <tbody>

            ${
              rows.length

              ?

              rows.map(r => `

                <tr>

                  ${cols
                    .map(c =>
                      `<td>${esc(r[c])}</td>`
                    )
                    .join("")}

                  <td>

                    <button
                      class="btn btn-light btn-edit"
                      data-id="${esc(
                        r[cols[0]]
                      )}"
                    >
                      Edit
                    </button>

                  </td>

                </tr>

              `).join("")

              :

              `
                <tr>

                  <td
                    colspan="${cols.length + 1}"
                    class="muted"
                  >
                    Belum ada data.
                  </td>

                </tr>
              `
            }

          </tbody>

        </table>

      </div>
    `;

  }


  // =========================================================
  // DASHBOARD
  // =========================================================

  async function renderDashboard(el) {

    const r =
      await API.dashboard();

    const d =
      r.data || {};


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Dashboard</h1>

          <p>
            Ringkasan operasional
            LPKS Arima Persada.
          </p>

        </div>

      </div>


      <div class="cards">

        ${[
          ["Siswa Aktif", d.students ?? 0],
          ["Sensei", d.sensei ?? 0],
          ["Kehadiran", `${d.attendance ?? 0}%`],
          ["Tagihan Pending", d.pendingBilling ?? 0]
        ]

          .map(x => `

            <div class="card">

              <div class="muted">
                ${esc(x[0])}
              </div>

              <div class="metric">
                ${esc(x[1])}
              </div>

            </div>

          `)
          .join("")}

      </div>


      <div class="section">

        <div class="card">

          <strong>
            Selamat datang,
            ${esc(user.name)}
          </strong>

          <p class="muted">
            Gunakan menu di sebelah kiri
            untuk mengelola sistem.
          </p>

        </div>

      </div>

    `;

  }


  // =========================================================
  // SISWA
  // =========================================================

  async function renderStudents(el) {

    const r =
      await API.students();

    const rows =
      r.data || [];


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Data Siswa</h1>

          <p>
            Kelola identitas dan program siswa.
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addStudent"
        >
          + Tambah Siswa
        </button>

      </div>


      ${table(
        rows,
        [
          "ID_SISWA",
          "NAMA",
          "PROGRAM",
          "STATUS",
          "NO_WA"
        ]
      )}

    `;


    document
      .getElementById("addStudent")
      .onclick = () =>
        form("STUDENTS");


    bindEditButtons(
      "STUDENTS",
      rows
    );

  }


  // =========================================================
  // SENSEI
  // =========================================================

  async function renderSensei(el) {

    const r =
      await API.sensei();

    const rows =
      r.data || [];


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Data Sensei</h1>

          <p>
            Kelola data pengajar.
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addSensei"
        >
          + Tambah Sensei
        </button>

      </div>


      ${table(
        rows,
        [
          "ID_SENSEI",
          "NAMA",
          "STATUS",
          "NO_WA"
        ]
      )}

    `;


    document
      .getElementById("addSensei")
      .onclick = () =>
        form("SENSEI");


    bindEditButtons(
      "SENSEI",
      rows
    );

  }


  // =========================================================
  // ABSENSI
  // =========================================================

  async function renderAttendance(el) {

    const r =
      await API.attendance();

    const rows =
      r.data || [];


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Absensi</h1>

          <p>
            Pencatatan kehadiran berdasarkan ID.
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addAttendance"
        >
          + Catat Absensi
        </button>

      </div>


      ${table(
        rows,
        [
          "ID_SISWA",
          "DATE",
          "STATUS",
          "CLASS_ID",
          "SESSION_ID"
        ]
      )}

    `;


    document
      .getElementById("addAttendance")
      .onclick = () =>
        form("ATTENDANCE");

  }


  // =========================================================
  // BILLING
  // =========================================================

  async function renderBilling(el) {

    const r =
      await API.billing();

    const rows =
      r.data || [];


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Tagihan</h1>

          <p>
            Biaya belajar dan kegiatan
            seperti JFT, SSW, dan JLPT.
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addBilling"
        >
          + Buat Tagihan
        </button>

      </div>


      ${table(
        rows,
        [
          "BILLING_ID",
          "ID_SISWA",
          "DESCRIPTION",
          "AMOUNT",
          "DUE_DATE",
          "STATUS"
        ]
      )}

    `;


    document
      .getElementById("addBilling")
      .onclick = () =>
        form("BILLING");

  }


  // =========================================================
  // PAYMENTS
  // =========================================================

  async function renderPayments(el) {

    const r =
      await API.payments();

    const rows =
      r.data || [];


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Pembayaran</h1>

          <p>
            Riwayat pembayaran dan kwitansi.
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addPayment"
        >
          + Input Pembayaran
        </button>

      </div>


      ${table(
        rows,
        [
          "PAYMENT_ID",
          "BILLING_ID",
          "PAYMENT_DATE",
          "AMOUNT",
          "PAYMENT_METHOD"
        ]
      )}

    `;


    document
      .getElementById("addPayment")
      .onclick = () =>
        form("PAYMENTS");

  }


  // =========================================================
  // SALARY
  // =========================================================

  async function renderSalary(el) {

    const r =
      await API.salary();

    const rows =
      r.data || [];


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Payroll Sensei</h1>

          <p>
            Rekap gaji, jam/pertemuan,
            bonus, potongan, dan pembayaran.
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addSalary"
        >
          + Rekap Payroll
        </button>

      </div>


      ${table(
        rows,
        [
          "SALARY_ID",
          "ID_SENSEI",
          "PERIOD",
          "BASE_SALARY",
          "BONUS",
          "DEDUCTION",
          "NET_SALARY",
          "PAYMENT_STATUS"
        ]
      )}

    `;


    document
      .getElementById("addSalary")
      .onclick = () =>
        form("SALARY");

  }


  // =========================================================
  // REPORTS
  // =========================================================

  async function renderReports(el) {

    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Laporan</h1>

          <p>
            Ringkasan operasional dan keuangan.
          </p>

        </div>

      </div>


      <div class="cards">

        <div class="card">
          Laporan absensi
        </div>

        <div class="card">
          Laporan tagihan
        </div>

        <div class="card">
          Laporan payroll
        </div>

      </div>

    `;

  }


  // =========================================================
  // SETTINGS
  // =========================================================

  async function renderSettings(el) {

    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Pengaturan</h1>

          <p>
            Konfigurasi aplikasi
            dan integrasi database.
          </p>

        </div>

      </div>


      <div class="card">

        <div class="field">

          <label>
            Google Spreadsheet ID
          </label>

          <input
            value="${esc(
              ARIMA_CONFIG.SPREADSHEET_ID
            )}"
            readonly
          >

        </div>


        <p class="muted">

          API_URL diatur pada
          js/config.js.

        </p>

      </div>

    `;

  }


  // =========================================================
  // DYNAMIC FORM
  // =========================================================

  async function form(sheetName, existingData = null) {

    const headers =
      schema[sheetName];


    if (
      !headers ||
      !Array.isArray(headers)
    ) {

      toast(
        "Schema " +
        sheetName +
        " belum tersedia."
      );

      return;

    }


    const idField =
      headers[0];


    const hiddenFields = [
      "CREATED_AT",
      "UPDATED_AT"
    ];


    const fields =
      headers.filter(
        h => !hiddenFields.includes(h)
      );


    const modal =
      document.createElement("div");


    modal.className =
      "modal-backdrop";


    modal.innerHTML = `

      <div
        class="modal"
        style="max-width:900px"
      >

        <div class="section-head">

          <h2>
            ${
              existingData
                ? "Edit "
                : "Tambah "
            }

            ${esc(
              sheetLabel(sheetName)
            )}

          </h2>


          <button
            class="btn btn-light"
            id="close"
          >
            Tutup
          </button>

        </div>


        <div
          class="form-grid"
          id="dynamicForm"
        >

          ${fields
            .map(
              field =>
                makeField(
                  field,
                  existingData
                    ? existingData[field]
                    : ""
                )
            )
            .join("")}

        </div>


        <div class="modal-actions">

          <button
            class="btn btn-primary"
            id="save"
          >
            ${
              existingData
                ? "Perbarui"
                : "Simpan"
            }
          </button>

        </div>

      </div>

    `;


    document.body.appendChild(modal);


    modal
      .querySelector("#close")
      .onclick = () =>
        modal.remove();


    modal
      .querySelector("#save")
      .onclick = async () => {

        const button =
          modal.querySelector("#save");


        button.disabled = true;

        button.textContent =
          "Menyimpan...";


        try {

          const payload = {};


          fields.forEach(field => {

            const input =
              modal.querySelector(
                `[name="${field}"]`
              );


            if (input) {

              payload[field] =
                input.value.trim();

            }

          });


          const action =
            getSaveAction(sheetName);


          const result =
            await API.call(
              action,
              payload
            );


          if (
            !result ||
            !result.success
          ) {

            throw new Error(
              result?.message ||
              "Data gagal disimpan."
            );

          }


          toast(
            result.message ||
            "Data berhasil disimpan."
          );


          modal.remove();


          await reloadCurrentPage();

        } catch (error) {

          console.error(error);

          toast(
            error.message ||
            "Gagal menyimpan data."
          );

          button.disabled = false;

          button.textContent =
            existingData
              ? "Perbarui"
              : "Simpan";

        }

      };

  }


  // =========================================================
  // FIELD GENERATOR
  // =========================================================

  function makeField(field, value) {

    const label =
      fieldLabel(field);


    const type =
      fieldType(field);


    const full =
      [
        "NAMA",
        "NAMA_ORANG_TUA",
        "DESCRIPTION",
        "KETERANGAN",
        "CATATAN"
      ].includes(field);


    let input = "";


    // SELECT
    if (field === "STATUS") {

      input = `

        <select name="${esc(field)}">

          <option
            value="AKTIF"
            ${value === "AKTIF" ? "selected" : ""}
          >
            AKTIF
          </option>

          <option
            value="NONAKTIF"
            ${value === "NONAKTIF" ? "selected" : ""}
          >
            NONAKTIF
          </option>

        </select>

      `;

    }

    else if (field === "ASRAMA") {

      input = `

        <select name="${esc(field)}">

          <option value="">
            Pilih
          </option>

          <option
            value="YA"
            ${value === "YA" ? "selected" : ""}
          >
            YA
          </option>

          <option
            value="TIDAK"
            ${value === "TIDAK" ? "selected" : ""}
          >
            TIDAK
          </option>

        </select>

      `;

    }

    else if (field === "PROGRAM") {

      input = `

        <select name="${esc(field)}">

          <option value="">
            Pilih Program
          </option>

          <option
            value="MAGANG"
            ${value === "MAGANG" ? "selected" : ""}
          >
            MAGANG
          </option>

          <option
            value="SSW"
            ${value === "SSW" ? "selected" : ""}
          >
            SSW / TOKUTEI GINOU
          </option>

          <option
            value="ENGINEERING"
            ${value === "ENGINEERING" ? "selected" : ""}
          >
            ENGINEERING
          </option>

        </select>

      `;

    }

    else if (full) {

      input = `

        <textarea
          name="${esc(field)}"
          rows="3"
        >${esc(value)}</textarea>

      `;

    }

    else {

      input = `

        <input
          type="${type}"
          name="${esc(field)}"
          value="${esc(value)}"
          ${field === "ID_SISWA" || field === "ID_SENSEI" ? "" : ""}
        >

      `;

    }


    return `

      <div
        class="field ${full ? "full" : ""}"
      >

        <label>
          ${esc(label)}
        </label>

        ${input}

      </div>

    `;

  }


  // =========================================================
  // FIELD TYPE
  // =========================================================

  function fieldType(field) {

    if (
      field.includes("DATE") ||
      field === "TANGGAL_MASUK" ||
      field === "PAYMENT_DATE" ||
      field === "DUE_DATE"
    ) {
      return "date";
    }


    if (
      field.includes("AMOUNT") ||
      field.includes("SALARY") ||
      field === "BONUS" ||
      field === "DEDUCTION"
    ) {
      return "number";
    }


    return "text";

  }


  // =========================================================
  // FIELD LABEL
  // =========================================================

  function fieldLabel(field) {

    const labels = {

      ID_SISWA: "ID Siswa",

      ID_SENSEI: "ID Sensei",

      NAMA: "Nama",

      NIK: "NIK",

      NO_WA: "No. WhatsApp",

      NAMA_ORANG_TUA:
        "Nama Orang Tua / Wali",

      NO_WA_ORANG_TUA:
        "No. WhatsApp Orang Tua / Wali",

      PROGRAM:
        "Program",

      ASRAMA:
        "Asrama",

      TANGGAL_MASUK:
        "Tanggal Masuk",

      STATUS:
        "Status",

      DESCRIPTION:
        "Deskripsi",

      AMOUNT:
        "Jumlah",

      DUE_DATE:
        "Jatuh Tempo",

      BILLING_ID:
        "ID Tagihan",

      PAYMENT_DATE:
        "Tanggal Pembayaran",

      PAYMENT_METHOD:
        "Metode Pembayaran",

      PERIOD:
        "Periode",

      BASE_SALARY:
        "Gaji Pokok",

      BONUS:
        "Bonus",

      DEDUCTION:
        "Potongan",

      NET_SALARY:
        "Gaji Bersih",

      PAYMENT_STATUS:
        "Status Pembayaran"

    };


    return (
      labels[field] ||
      field
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, x =>
          x.toUpperCase()
        )
    );

  }


  // =========================================================
  // SHEET LABEL
  // =========================================================

  function sheetLabel(sheet) {

    const labels = {

      STUDENTS: "Siswa",

      SENSEI: "Sensei",

      CLASSES: "Kelas",

      SCHEDULES: "Jadwal",

      ATTENDANCE: "Absensi",

      BILLING: "Tagihan",

      PAYMENTS: "Pembayaran",

      SALARY: "Payroll Sensei",

      SETTINGS: "Pengaturan"

    };


    return labels[sheet] || sheet;

  }


  // =========================================================
  // SAVE ACTION
  // =========================================================

  function getSaveAction(sheet) {

    const map = {

      STUDENTS:
        "studentSave",

      SENSEI:
        "senseiSave",

      CLASSES:
        "classSave",

      SCHEDULES:
        "scheduleSave",

      ATTENDANCE:
        "attendanceSave",

      BILLING:
        "billingSave",

      PAYMENTS:
        "paymentSave",

      SALARY:
        "salarySave",

      SETTINGS:
        "settingSave"

    };


    return map[sheet];

  }


  // =========================================================
  // EDIT BUTTON
  // =========================================================

  function bindEditButtons(
    sheetName,
    rows
  ) {

    document
      .querySelectorAll(".btn-edit")
      .forEach(button => {

        button.onclick = () => {

          const id =
            button.dataset.id;


          const headers =
            schema[sheetName] || [];


          const idField =
            headers[0];


          const row =
            rows.find(
              r =>
                String(
                  r[idField]
                ) === String(id)
            );


          if (row) {

            form(
              sheetName,
              row
            );

          }

        };

      });

  }


  // =========================================================
  // RELOAD CURRENT PAGE
  // =========================================================

  async function reloadCurrentPage() {

    const active =
      document.querySelector(
        "[data-page].active"
      );


    const page =
      active
        ? active.dataset.page
        : "dashboard";


    await load(page);

  }


  // =========================================================
  // TOAST
  // =========================================================

  function toast(msg) {

    const t =
      document.createElement("div");


    t.className =
      "toast";


    t.textContent =
      msg;


    document.body.appendChild(t);


    setTimeout(
      () => t.remove(),
      2500
    );

  }


  // =========================================================
  // PUBLIC
  // =========================================================

  return {

    init,

    form

  };

})();
