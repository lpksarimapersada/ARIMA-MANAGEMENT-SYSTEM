window.App = (() => {

  /* =========================================================
     MENU
  ========================================================= */

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


  /* =========================================================
     FORM CONFIGURATION
  ========================================================= */

  const FORM_CONFIG = {

    students: {
      title: "Tambah Siswa",
      action: "studentSave",
      fields: [
        {
          key: "ID_SISWA",
          label: "ID Siswa",
          type: "text",
          required: false,
          placeholder: "Kosongkan untuk ID otomatis"
        },
        {
          key: "NAMA",
          label: "Nama Siswa",
          type: "text",
          required: true
        },
        {
          key: "NIK",
          label: "NIK",
          type: "text"
        },
        {
          key: "NO_WA",
          label: "No. WhatsApp",
          type: "text"
        },
        {
          key: "NAMA_ORANG_TUA",
          label: "Nama Orang Tua / Wali",
          type: "text"
        },
        {
          key: "NO_WA_ORANG_TUA",
          label: "No. WhatsApp Orang Tua / Wali",
          type: "text"
        },
        {
          key: "PROGRAM",
          label: "Program",
          type: "select",
          options: [
            "MAGANG",
            "SSW",
            "TOKUTEI GINOU",
            "ENGINEERING",
            "ENGINEER"
          ]
        },
        {
          key: "ASRAMA",
          label: "Asrama",
          type: "select",
          options: [
            "YA",
            "TIDAK"
          ]
        },
        {
          key: "TANGGAL_MASUK",
          label: "Tanggal Masuk",
          type: "date"
        },
        {
          key: "STATUS",
          label: "Status",
          type: "select",
          options: [
            "AKTIF",
            "NONAKTIF",
            "LULUS",
            "BERANGKAT",
            "KELUAR"
          ]
        }
      ]
    },


    sensei: {
      title: "Tambah Sensei",
      action: "senseiSave",
      fields: [
        {
          key: "ID_SENSEI",
          label: "ID Sensei",
          type: "text",
          required: false,
          placeholder: "Kosongkan untuk ID otomatis"
        },
        {
          key: "NAMA",
          label: "Nama Sensei",
          type: "text",
          required: true
        },
        {
          key: "NO_WA",
          label: "No. WhatsApp",
          type: "text"
        },
        {
          key: "STATUS",
          label: "Status",
          type: "select",
          options: [
            "AKTIF",
            "NONAKTIF"
          ]
        }
      ]
    },


    attendance: {
      title: "Catat Absensi",
      action: "attendanceSave",
      fields: [
        {
          key: "ATTENDANCE_ID",
          label: "ID Absensi",
          type: "text",
          required: false,
          placeholder: "Kosongkan untuk ID otomatis"
        },
        {
          key: "ID_SISWA",
          label: "ID Siswa",
          type: "text",
          required: true
        },
        {
          key: "DATE",
          label: "Tanggal",
          type: "date",
          required: true
        },
        {
          key: "STATUS",
          label: "Status Kehadiran",
          type: "select",
          options: [
            "HADIR",
            "IZIN",
            "SAKIT",
            "ALPA"
          ]
        },
        {
          key: "CLASS_ID",
          label: "ID Kelas",
          type: "text"
        },
        {
          key: "SESSION_ID",
          label: "ID Sesi",
          type: "text"
        }
      ]
    },


    billing: {
      title: "Buat Tagihan",
      action: "billingSave",
      fields: [
        {
          key: "BILLING_ID",
          label: "ID Tagihan",
          type: "text",
          required: false,
          placeholder: "Kosongkan untuk ID otomatis"
        },
        {
          key: "ID_SISWA",
          label: "ID Siswa",
          type: "text",
          required: true
        },
        {
          key: "DESCRIPTION",
          label: "Keterangan Tagihan",
          type: "text",
          required: true,
          placeholder: "Contoh: Biaya JFT / SSW / JLPT"
        },
        {
          key: "AMOUNT",
          label: "Jumlah Tagihan",
          type: "number",
          required: true
        },
        {
          key: "DUE_DATE",
          label: "Tanggal Jatuh Tempo",
          type: "date"
        },
        {
          key: "STATUS",
          label: "Status",
          type: "select",
          options: [
            "PENDING",
            "LUNAS",
            "SEBAGIAN",
            "BATAL"
          ]
        }
      ]
    },


    payments: {
      title: "Input Pembayaran",
      action: "paymentSave",
      fields: [
        {
          key: "PAYMENT_ID",
          label: "ID Pembayaran",
          type: "text",
          required: false,
          placeholder: "Kosongkan untuk ID otomatis"
        },
        {
          key: "BILLING_ID",
          label: "ID Tagihan",
          type: "text",
          required: true
        },
        {
          key: "PAYMENT_DATE",
          label: "Tanggal Pembayaran",
          type: "date",
          required: true
        },
        {
          key: "AMOUNT",
          label: "Jumlah Pembayaran",
          type: "number",
          required: true
        },
        {
          key: "PAYMENT_METHOD",
          label: "Metode Pembayaran",
          type: "select",
          options: [
            "CASH",
            "TRANSFER",
            "QRIS",
            "LAINNYA"
          ]
        },
        {
          key: "DESCRIPTION",
          label: "Keterangan",
          type: "textarea"
        }
      ]
    },


    salary: {
      title: "Rekap Payroll Sensei",
      action: "salarySave",
      fields: [
        {
          key: "SALARY_ID",
          label: "ID Payroll",
          type: "text",
          required: false,
          placeholder: "Kosongkan untuk ID otomatis"
        },
        {
          key: "ID_SENSEI",
          label: "ID Sensei",
          type: "text",
          required: true
        },
        {
          key: "PERIOD",
          label: "Periode",
          type: "text",
          required: true,
          placeholder: "Contoh: Oktober 2026"
        },
        {
          key: "BASE_SALARY",
          label: "Gaji Pokok",
          type: "number"
        },
        {
          key: "BONUS",
          label: "Bonus",
          type: "number"
        },
        {
          key: "DEDUCTION",
          label: "Potongan",
          type: "number"
        },
        {
          key: "NET_SALARY",
          label: "Gaji Bersih",
          type: "number"
        },
        {
          key: "PAYMENT_STATUS",
          label: "Status Pembayaran",
          type: "select",
          options: [
            "PENDING",
            "DIBAYAR"
          ]
        }
      ]
    }

  };


  /* =========================================================
     INIT
  ========================================================= */

  async function init() {

    user = Auth.require();

    if (!user) {
      return;
    }

    renderShell();

    await load("dashboard");
  }


  /* =========================================================
     SHELL
  ========================================================= */

  function renderShell() {

    document.getElementById("app").innerHTML = `

      <div class="shell">

        <aside class="sidebar">

          <div class="side-brand">
            <img src="assets/logo.webp">
            <strong>
              ARIMA<br>
              MANAGEMENT
            </strong>
          </div>

          <nav class="nav">

            ${menus.map(m => `
              <a href="#"
                 data-page="${m[0]}">
                ${m[2]} &nbsp; ${m[1]}
              </a>
            `).join("")}

            <a href="#" id="logout">
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


          <section class="content" id="page"></section>

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


  /* =========================================================
     PAGE LOADER
  ========================================================= */

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
          <div style="
            color:#b00020;
            font-weight:600;
            margin-bottom:8px;
          ">
            Terjadi kesalahan
          </div>

          <div class="muted">
            ${esc(error.message)}
          </div>
        </div>
      `;

    }

  }


  /* =========================================================
     HELPERS
  ========================================================= */

  const esc = value => {

    return String(value ?? "")
      .replace(
        /[&<>"']/g,
        c => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        }[c])
      );

  };


  const table = (rows, cols) => {

    return `

      <div class="table-wrap">

        <table class="table">

          <thead>

            <tr>

              ${cols.map(c => `
                <th>${esc(c)}</th>
              `).join("")}

            </tr>

          </thead>


          <tbody>

            ${
              rows.length

              ?

              rows.map(r => `

                <tr>

                  ${cols.map(c => `
                    <td>
                      ${esc(r[c])}
                    </td>
                  `).join("")}

                </tr>

              `).join("")

              :

              `
                <tr>
                  <td
                    colspan="${cols.length}"
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

  };


  /* =========================================================
     DASHBOARD
  ========================================================= */

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
          [
            "Siswa Aktif",
            d.students ?? 0
          ],

          [
            "Sensei",
            d.sensei ?? 0
          ],

          [
            "Kehadiran",
            `${d.attendance ?? 0}%`
          ],

          [
            "Tagihan Pending",
            d.pendingBilling ?? 0
          ]

        ].map(x => `

          <div class="card">

            <div class="muted">
              ${esc(x[0])}
            </div>

            <div class="metric">
              ${esc(x[1])}
            </div>

          </div>

        `).join("")}

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


  /* =========================================================
     SISWA
  ========================================================= */

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
          onclick="App.form('students')"
        >
          + Tambah Siswa
        </button>

      </div>


      ${table(
        rows,
        [
          "ID_SISWA",
          "NAMA",
          "NIK",
          "NO_WA",
          "PROGRAM",
          "ASRAMA",
          "TANGGAL_MASUK",
          "STATUS"
        ]
      )}

    `;

  }


  /* =========================================================
     SENSEI
  ========================================================= */

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
          onclick="App.form('sensei')"
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

  }


  /* =========================================================
     ABSENSI
  ========================================================= */

  async function renderAttendance(el) {

    const r =
      await API.attendance();


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
          onclick="App.form('attendance')"
        >
          + Catat Absensi
        </button>

      </div>


      ${table(
        r.data || [],
        [
          "ID_SISWA",
          "DATE",
          "STATUS",
          "CLASS_ID",
          "SESSION_ID"
        ]
      )}

    `;

  }


  /* =========================================================
     TAGIHAN
  ========================================================= */

  async function renderBilling(el) {

    const r =
      await API.billing();


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
          onclick="App.form('billing')"
        >
          + Buat Tagihan
        </button>

      </div>


      ${table(
        r.data || [],
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

  }


  /* =========================================================
     PEMBAYARAN
  ========================================================= */

  async function renderPayments(el) {

    const r =
      await API.payments();


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
          onclick="App.form('payments')"
        >
          + Input Pembayaran
        </button>

      </div>


      ${table(
        r.data || [],
        [
          "PAYMENT_ID",
          "BILLING_ID",
          "PAYMENT_DATE",
          "AMOUNT",
          "PAYMENT_METHOD"
        ]
      )}

    `;

  }


  /* =========================================================
     PAYROLL
  ========================================================= */

  async function renderSalary(el) {

    const r =
      await API.salary();


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Payroll Sensei</h1>

          <p>
            Rekap gaji, bonus,
            potongan, dan pembayaran.
          </p>

        </div>


        <button
          class="btn btn-primary"
          onclick="App.form('salary')"
        >
          + Rekap Payroll
        </button>

      </div>


      ${table(
        r.data || [],
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

  }


  /* =========================================================
     REPORTS
  ========================================================= */

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

          <br>

          <button
            class="btn btn-dark"
            style="margin-top:10px"
          >
            Buka
          </button>

        </div>


        <div class="card">

          Laporan tagihan

          <br>

          <button
            class="btn btn-dark"
            style="margin-top:10px"
          >
            Buka
          </button>

        </div>


        <div class="card">

          Laporan payroll

          <br>

          <button
            class="btn btn-dark"
            style="margin-top:10px"
          >
            Buka
          </button>

        </div>

      </div>

    `;

  }


  /* =========================================================
     SETTINGS
  ========================================================= */

  async function renderSettings(el) {

    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>Pengaturan</h1>

          <p>
            Konfigurasi aplikasi dan database.
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
          API_URL terhubung ke backend
          Google Apps Script.
        </p>

      </div>

    `;

  }


  /* =========================================================
     FORM GENERATOR
  ========================================================= */

  function form(type, editData = null) {

    const config =
      FORM_CONFIG[type];


    if (!config) {

      toast(
        "Form untuk menu ini belum tersedia."
      );

      return;

    }


    const modal =
      document.createElement("div");


    modal.className =
      "modal-backdrop";


    modal.innerHTML = `

      <div
        class="modal"
        style="
          max-width:900px;
          max-height:90vh;
          overflow-y:auto;
        "
      >

        <div class="section-head">

          <h2>
            ${esc(config.title)}
          </h2>


          <button
            class="btn btn-light"
            id="close"
            type="button"
          >
            Tutup
          </button>

        </div>


        <form id="dynamicForm">

          <div class="form-grid">

            ${config.fields
              .map(fieldHTML)
              .join("")}

          </div>


          <div
            class="modal-actions"
            style="
              display:flex;
              justify-content:flex-end;
              gap:10px;
              margin-top:20px;
            "
          >

            <button
              class="btn btn-light"
              id="cancel"
              type="button"
            >
              Batal
            </button>


            <button
              class="btn btn-primary"
              id="save"
              type="submit"
            >
              Simpan
            </button>

          </div>

        </form>

      </div>

    `;


    document.body.appendChild(modal);


    /* Isi data edit jika ada */

    if (editData) {

      config.fields.forEach(field => {

        const input =
          modal.querySelector(
            `[name="${field.key}"]`
          );


        if (
          input &&
          editData[field.key] !== undefined
        ) {

          input.value =
            editData[field.key] ?? "";

        }

      });

    }


    /* Close */

    modal
      .querySelector("#close")
      .onclick = () =>
        modal.remove();


    modal
      .querySelector("#cancel")
      .onclick = () =>
        modal.remove();


    /* Submit */

    modal
      .querySelector("#dynamicForm")
      .onsubmit = async e => {

        e.preventDefault();


        const button =
          modal.querySelector("#save");


        button.disabled = true;

        button.textContent =
          "Menyimpan...";


        try {

          const formData =
            new FormData(e.target);


          const payload = {};


          config.fields.forEach(field => {

            const value =
              formData.get(field.key);


            payload[field.key] =
              value === null
                ? ""
                : String(value).trim();

          });


          /* Validasi required */

          for (const field of config.fields) {

            if (
              field.required &&
              !payload[field.key]
            ) {

              throw new Error(
                `${field.label} wajib diisi.`
              );

            }

          }


          console.log(
            "SAVE ACTION:",
            config.action
          );


          console.log(
            "SAVE PAYLOAD:",
            payload
          );


          /*
           * Kirim langsung ke Apps Script
           */

          const result =
            await API.call(
              config.action,
              payload
            );


          if (
            !result ||
            result.success !== true
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


          /*
           * Refresh halaman
           */

          const currentPage =
            getCurrentPage();


          await load(
            currentPage
          );


        } catch (error) {

          console.error(
            "SAVE ERROR:",
            error
          );


          toast(
            error.message ||
            "Gagal menyimpan data."
          );


          button.disabled = false;

          button.textContent =
            "Simpan";

        }

      };

  }


  /* =========================================================
     FORM FIELD HTML
  ========================================================= */

  function fieldHTML(field) {

    const required =
      field.required
        ? "required"
        : "";


    const placeholder =
      field.placeholder
        ? `placeholder="${esc(field.placeholder)}"`
        : "";


    if (field.type === "textarea") {

      return `

        <div class="field full">

          <label>
            ${esc(field.label)}
            ${field.required
              ? '<span style="color:#e30613">*</span>'
              : ""}
          </label>


          <textarea
            name="${esc(field.key)}"
            rows="4"
            ${required}
            ${placeholder}
          ></textarea>

        </div>

      `;

    }


    if (field.type === "select") {

      return `

        <div class="field">

          <label>
            ${esc(field.label)}
            ${field.required
              ? '<span style="color:#e30613">*</span>'
              : ""}
          </label>


          <select
            name="${esc(field.key)}"
            ${required}
          >

            <option value="">
              -- Pilih ${esc(field.label)} --
            </option>


            ${(field.options || [])
              .map(option => `

                <option
                  value="${esc(option)}"
                >
                  ${esc(option)}
                </option>

              `)
              .join("")}

          </select>

        </div>

      `;

    }


    return `

      <div class="field">

        <label>
          ${esc(field.label)}
          ${field.required
            ? '<span style="color:#e30613">*</span>'
            : ""}
        </label>


        <input
          type="${esc(field.type || "text")}"
          name="${esc(field.key)}"
          ${required}
          ${placeholder}
        >

      </div>

    `;

  }


  /* =========================================================
     CURRENT PAGE
  ========================================================= */

  function getCurrentPage() {

    const active =
      document.querySelector(
        "[data-page].active"
      );


    return active
      ? active.dataset.page
      : "dashboard";

  }


  /* =========================================================
     TOAST
  ========================================================= */

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


  /* =========================================================
     PUBLIC
  ========================================================= */

  return {

    init,

    form,

    load

  };

})();
