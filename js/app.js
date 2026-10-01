window.App = (() => {
  "use strict";

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

  /*
   * =========================================================
   * FORM CONFIGURATION
   * =========================================================
   *
   * Field di bawah dibuat mengikuti struktur backend
   * ARIMA-MANAGEMENT-SYSTEM.
   */

const FORM_CONFIG = {

  students: {
    title: "Tambah Siswa",
    editTitle: "Edit Siswa",
    idField: "ID_SISWA",

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
        required: true,
        placeholder: "Nama lengkap siswa"
      },

      {
        key: "NIK",
        label: "NIK",
        type: "text",
        required: false,
        placeholder: "Nomor Induk Kependudukan"
      },

      {
        key: "NO_WA",
        label: "No. WhatsApp",
        type: "text",
        required: true,
        placeholder: "08xxxxxxxxxx"
      },

      {
        key: "NAMA_ORANG_TUA",
        label: "Nama Orang Tua / Wali",
        type: "text",
        required: true,
        placeholder: "Nama orang tua / wali"
      },

      {
        key: "NO_WA_ORANG_TUA",
        label: "No. WhatsApp Orang Tua / Wali",
        type: "text",
        required: false,
        placeholder: "08xxxxxxxxxx"
      },

      {
        key: "PROGRAM",
        label: "Program",
        type: "select",
        required: true,
        options: [
          "MAGANG",
          "SSW",
          "ENGINEERING",
          "ENGINEER"
        ]
      },

      {
        key: "ASRAMA",
        label: "Asrama",
        type: "select",
        required: true,
        options: [
          "YA",
          "TIDAK"
        ]
      },

      {
        key: "TANGGAL_MASUK",
        label: "Tanggal Masuk",
        type: "date",
        required: true
      },

      {
        key: "STATUS",
        label: "Status",
        type: "select",
        required: true,
        options: [
          "AKTIF",
          "NONAKTIF",
          "LULUS",
          "KELUAR"
        ]
      }
    ]
  },


  sensei: {

    title: "Tambah Sensei",

    editTitle: "Edit Sensei",

    idField: "ID_SENSEI",

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
        required: true,
        placeholder: "Nama lengkap sensei"
      },

      {
        key: "NO_WA",
        label: "No. WhatsApp",
        type: "text",
        required: false,
        placeholder: "08xxxxxxxxxx"
      },

      {
        key: "EMAIL",
        label: "Email",
        type: "email",
        required: false,
        placeholder: "email@example.com"
      },

      {
        key: "TARIF_PER_PERTEMUAN",
        label: "Tarif per Pertemuan",
        type: "number",
        required: false,
        placeholder: "0"
      },

      {
        key: "TARIF_PER_JAM",
        label: "Tarif per Jam",
        type: "number",
        required: false,
        placeholder: "0"
      },

      {
        key: "STATUS",
        label: "Status",
        type: "select",
        required: true,
        options: [
          "AKTIF",
          "NONAKTIF"
        ]
      }

    ]

  },


  attendance: {

    title: "Catat Absensi",

    editTitle: "Edit Absensi",

    idField: "ATTENDANCE_ID",

    fields: [

      {
        key: "ATTENDANCE_ID",
        label: "ID Absensi",
        type: "text",
        required: false,
        placeholder: "Kosongkan untuk ID otomatis"
      },

      {
        key: "ACTOR_ID",
        label: "ID Siswa / Sensei",
        type: "text",
        required: true,
        placeholder: "Contoh: SISWA001"
      },

      {
        key: "ACTOR_TYPE",
        label: "Tipe",
        type: "select",
        required: true,
        options: [
          "SISWA",
          "SENSEI"
        ]
      },

      {
        key: "SESSION_ID",
        label: "Session ID",
        type: "text",
        required: false
      },

      {
        key: "CLASS_ID",
        label: "Class ID",
        type: "text",
        required: false
      },

      {
        key: "TANGGAL",
        label: "Tanggal",
        type: "date",
        required: true
      },

      {
        key: "JAM_MASUK",
        label: "Jam Masuk",
        type: "time",
        required: false
      },

      {
        key: "JAM_KELUAR",
        label: "Jam Keluar",
        type: "time",
        required: false
      },

      {
        key: "STATUS",
        label: "Status",
        type: "select",
        required: true,
        options: [
          "HADIR",
          "IZIN",
          "SAKIT",
          "ALPA",
          "TERLAMBAT"
        ]
      },

      {
        key: "CATATAN",
        label: "Catatan",
        type: "textarea",
        required: false
      }

    ]

  },


  billing: {

    title: "Buat Tagihan",

    editTitle: "Edit Tagihan",

    idField: "BILLING_ID",

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
        required: true,
        placeholder: "Contoh: SISWA001"
      },

      {
        key: "DESCRIPTION",
        label: "Deskripsi",
        type: "text",
        required: true,
        placeholder: "Contoh: Biaya belajar bulan Oktober"
      },

      {
        key: "CATEGORY",
        label: "Kategori",
        type: "select",
        required: true,
        options: [
          "BIAYA_BELAJAR",
          "JFT",
          "SSW",
          "JLPT",
          "MAGANG",
          "DOKUMEN",
          "LAINNYA"
        ]
      },

      {
        key: "AMOUNT",
        label: "Jumlah Tagihan",
        type: "number",
        required: true,
        placeholder: "0"
      },

      {
        key: "DUE_DATE",
        label: "Jatuh Tempo",
        type: "date",
        required: true
      },

      {
        key: "STATUS",
        label: "Status",
        type: "select",
        required: true,
        options: [
          "PENDING",
          "SEBAGIAN",
          "LUNAS",
          "TERLAMBAT",
          "BATAL"
        ]
      },

      {
        key: "NOTES",
        label: "Catatan",
        type: "textarea",
        required: false
      }

    ]

  },


  payments: {

    title: "Input Pembayaran",

    editTitle: "Edit Pembayaran",

    idField: "PAYMENT_ID",

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
        key: "ID_SISWA",
        label: "ID Siswa",
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
        required: true,
        options: [
          "CASH",
          "TRANSFER",
          "QRIS",
          "LAINNYA"
        ]
      },

      {
        key: "REFERENCE_NO",
        label: "Nomor Referensi",
        type: "text",
        required: false
      },

      {
        key: "NOTES",
        label: "Catatan",
        type: "textarea",
        required: false
      }

    ]

  },


  salary: {

    title: "Rekap Payroll Sensei",

    editTitle: "Edit Payroll Sensei",

    idField: "SALARY_ID",

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
        type: "month",
        required: true
      },

      {
        key: "MEETING_COUNT",
        label: "Jumlah Pertemuan",
        type: "number",
        required: false
      },

      {
        key: "HOUR_COUNT",
        label: "Jumlah Jam",
        type: "number",
        required: false
      },

      {
        key: "BASE_AMOUNT",
        label: "Gaji Pokok",
        type: "number",
        required: true
      },

      {
        key: "BONUS",
        label: "Bonus",
        type: "number",
        required: false
      },

      {
        key: "DEDUCTION",
        label: "Potongan",
        type: "number",
        required: false
      },

      {
        key: "NET_SALARY",
        label: "Gaji Bersih",
        type: "number",
        required: false
      },

      {
        key: "PAYMENT_DATE",
        label: "Tanggal Pembayaran",
        type: "date",
        required: false
      },

      {
        key: "PAYMENT_STATUS",
        label: "Status Pembayaran",
        type: "select",
        required: true,
        options: [
          "PENDING",
          "DIBAYAR"
        ]
      },

      {
        key: "NOTES",
        label: "Catatan",
        type: "textarea",
        required: false
      }

    ]

  }

};  

  /*
   * =========================================================
   * TABLE CONFIGURATION
   * =========================================================
   */

  const TABLE_CONFIG = {

    students: {
      api: "students",
      title: "Data Siswa",
      description: "Kelola identitas dan program siswa.",
      addLabel: "+ Tambah Siswa",
      form: "students",

      columns: [
        "ID_SISWA",
        "NAMA",
        "NIK",
        "NO_WA",
        "PROGRAM",
        "ASRAMA",
        "TANGGAL_MASUK",
        "STATUS"
      ],

      search: [
        "ID_SISWA",
        "NAMA",
        "NIK",
        "NO_WA"
      ]
    },

    sensei: {
      api: "sensei",
      title: "Data Sensei",
      description: "Kelola data pengajar dan tarif.",
      addLabel: "+ Tambah Sensei",
      form: "sensei",

      columns: [
        "ID_SENSEI",
        "NAMA",
        "NO_WA",
        "EMAIL",
        "TARIF_PER_PERTEMUAN",
        "TARIF_PER_JAM",
        "STATUS"
      ],

      search: [
        "ID_SENSEI",
        "NAMA",
        "NO_WA",
        "EMAIL"
      ]
    },

    attendance: {
      api: "attendance",
      title: "Absensi",
      description: "Pencatatan kehadiran berdasarkan ID.",
      addLabel: "+ Catat Absensi",
      form: "attendance",

      columns: [
        "ATTENDANCE_ID",
        "ACTOR_ID",
        "ACTOR_TYPE",
        "SESSION_ID",
        "CLASS_ID",
        "TANGGAL",
        "JAM_MASUK",
        "JAM_KELUAR",
        "STATUS",
        "CATATAN"
      ],

      search: [
        "ATTENDANCE_ID",
        "ACTOR_ID",
        "CLASS_ID",
        "STATUS"
      ]
    },

    billing: {
      api: "billing",
      title: "Tagihan",
      description:
        "Biaya belajar dan kegiatan seperti JFT, SSW, dan JLPT.",
      addLabel: "+ Buat Tagihan",
      form: "billing",

      columns: [
        "BILLING_ID",
        "ID_SISWA",
        "DESCRIPTION",
        "CATEGORY",
        "AMOUNT",
        "DUE_DATE",
        "STATUS",
        "NOTES"
      ],

      search: [
        "BILLING_ID",
        "ID_SISWA",
        "DESCRIPTION",
        "CATEGORY",
        "STATUS"
      ]
    },

    payments: {
      api: "payments",
      title: "Pembayaran",
      description:
        "Riwayat pembayaran dan transaksi siswa.",
      addLabel: "+ Input Pembayaran",
      form: "payments",

      columns: [
        "PAYMENT_ID",
        "BILLING_ID",
        "ID_SISWA",
        "PAYMENT_DATE",
        "AMOUNT",
        "PAYMENT_METHOD",
        "REFERENCE_NO",
        "NOTES"
      ],

      search: [
        "PAYMENT_ID",
        "BILLING_ID",
        "ID_SISWA",
        "REFERENCE_NO"
      ]
    },

    salary: {
      api: "salary",
      title: "Payroll Sensei",
      description:
        "Rekap gaji, pertemuan, jam, bonus, potongan, dan pembayaran.",
      addLabel: "+ Rekap Payroll",
      form: "salary",

      columns: [
        "SALARY_ID",
        "ID_SENSEI",
        "PERIOD",
        "MEETING_COUNT",
        "HOUR_COUNT",
        "BASE_AMOUNT",
        "BONUS",
        "DEDUCTION",
        "NET_SALARY",
        "PAYMENT_DATE",
        "PAYMENT_STATUS"
      ],

      search: [
        "SALARY_ID",
        "ID_SENSEI",
        "PERIOD",
        "PAYMENT_STATUS"
      ]
    }
  };


  /*
   * =========================================================
   * INITIALIZATION
   * =========================================================
   */

  async function init() {

    user = Auth.require();

    if (!user) {
      return;
    }

    renderShell();

    await load("dashboard");
  }


  /*
   * =========================================================
   * MAIN SHELL
   * =========================================================
   */

  function renderShell() {

    const app = document.getElementById("app");

    if (!app) {
      throw new Error(
        "Element #app tidak ditemukan."
      );
    }

    app.innerHTML = `
      <div class="shell">

        <aside class="sidebar">

          <div class="side-brand">

            <img
              src="assets/logo.webp"
              alt="LPKS Arima Persada"
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
                data-page="${esc(m[0])}"
              >
                ${m[2]} &nbsp; ${esc(m[1])}
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
                ${esc(
                  ARIMA_CONFIG.COMPANY_NAME ||
                  "LPKS Arima Persada"
                )}
              </strong>
            </div>

            <div class="muted">
              ${esc(user.name || "")}
              ·
              ${esc(user.role || "")}
            </div>

          </header>


          <section
            class="content"
            id="page"
          ></section>

        </main>

      </div>
    `;


    /*
     * MENU NAVIGATION
     */

    document
      .querySelectorAll("[data-page]")
      .forEach(a => {

        a.addEventListener(
          "click",
          e => {

            e.preventDefault();

            load(
              a.dataset.page
            );

          }
        );

      });


    /*
     * LOGOUT
     */

    const logoutButton =
      document.getElementById("logout");

    if (logoutButton) {

      logoutButton.addEventListener(
        "click",
        async e => {

          e.preventDefault();

          try {

            await Auth.logout();

          } catch (error) {

            console.error(
              "Logout error:",
              error
            );

          }

        }
      );

    }

  }


  /*
   * =========================================================
   * PAGE LOADER
   * =========================================================
   */

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

    if (!el) {
      return;
    }


    el.innerHTML = `
      <div class="card">
        Memuat...
      </div>
    `;


    const map = {

      dashboard:
        renderDashboard,

      students:
        () =>
          renderCrudPage(
            el,
            "students"
          ),

      sensei:
        () =>
          renderCrudPage(
            el,
            "sensei"
          ),

      attendance:
        () =>
          renderCrudPage(
            el,
            "attendance"
          ),

      billing:
        () =>
          renderCrudPage(
            el,
            "billing"
          ),

                payments:
            () =>
              renderCrudPage(
                el,
                "payments"
              ),

      salary:
        () =>
          renderCrudPage(
            el,
            "salary"
          ),

      reports:
        renderReports,

      settings:
        renderSettings

    };


    const renderer =
      map[page] || renderDashboard;

    await renderer(el);

  }


  /*
   * =========================================================
   * UTILITY
   * =========================================================
   */

  const esc = value => {

    return String(
      value ?? ""
    ).replace(
      /[&<>"']/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character])
    );

  };


  function formatNumber(value) {

    const number =
      Number(value || 0);

    if (
      !Number.isFinite(number)
    ) {
      return "0";
    }

    return new Intl.NumberFormat(
      "id-ID"
    ).format(number);

  }


  function formatCurrency(value) {

    const number =
      Number(value || 0);

    if (
      !Number.isFinite(number)
    ) {
      return "Rp 0";
    }

    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }
    ).format(number);

  }


  function formatDate(value) {

    if (!value) {
      return "";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return String(value);
    }

    return new Intl.DateTimeFormat(
      "id-ID",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    ).format(date);

  }


  function fieldLabel(
    key
  ) {

    const labels = {

      ID_SISWA:
        "ID Siswa",

      ID_SENSEI:
        "ID Sensei",

      NAMA:
        "Nama",

      NIK:
        "NIK",

      NO_WA:
        "No. WhatsApp",

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

      EMAIL:
        "Email",

      TARIF_PER_PERTEMUAN:
        "Tarif per Pertemuan",

      TARIF_PER_JAM:
        "Tarif per Jam",

      ATTENDANCE_ID:
        "ID Absensi",

      ACTOR_ID:
        "ID Siswa / Sensei",

      ACTOR_TYPE:
        "Tipe",

      SESSION_ID:
        "Session ID",

      CLASS_ID:
        "Class ID",

      TANGGAL:
        "Tanggal",

      JAM_MASUK:
        "Jam Masuk",

      JAM_KELUAR:
        "Jam Keluar",

      CATATAN:
        "Catatan",

      BILLING_ID:
        "ID Tagihan",

      DESCRIPTION:
        "Deskripsi",

      CATEGORY:
        "Kategori",

      AMOUNT:
        "Jumlah",

      DUE_DATE:
        "Jatuh Tempo",

      NOTES:
        "Catatan",

      PAYMENT_ID:
        "ID Pembayaran",

      PAYMENT_DATE:
        "Tanggal Pembayaran",

      PAYMENT_METHOD:
        "Metode Pembayaran",

      REFERENCE_NO:
        "Nomor Referensi",

      SALARY_ID:
        "ID Payroll",

      PERIOD:
        "Periode",

      MEETING_COUNT:
        "Jumlah Pertemuan",

      HOUR_COUNT:
        "Jumlah Jam",

      BASE_AMOUNT:
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
      labels[key] ||
      key
        .replaceAll(
          "_",
          " "
        )
    );

  }


  /*
   * =========================================================
   * TABLE
   * =========================================================
   */

  function table(
    rows,
    columns,
    options = {}
  ) {

    const {
      editable = false
    } = options;


    const safeRows =
      Array.isArray(rows)
        ? rows
        : [];


    let html = `
      <div class="table-wrap">

        <table class="table">

          <thead>

            <tr>

              ${columns
                .map(
                  column => `
                    <th>
                      ${esc(
                        fieldLabel(
                          column
                        )
                      )}
                    </th>
                  `
                )
                .join("")}

              ${
                editable
                  ? `<th>Aksi</th>`
                  : ""
              }

            </tr>

          </thead>

          <tbody>
    `;


    if (
      safeRows.length === 0
    ) {

      html += `
        <tr>

          <td
            colspan="${
              columns.length +
              (editable ? 1 : 0)
            }"
            class="muted"
          >
            Belum ada data.
          </td>

        </tr>
      `;

    } else {

      safeRows.forEach(
        (row, index) => {

          html += `
            <tr>

              ${columns
                .map(
                  column => {

                    let value =
                      row[column];

                    if (
                      column.includes(
                        "AMOUNT"
                      ) ||
                      column.includes(
                        "SALARY"
                      ) ||
                      column.includes(
                        "BONUS"
                      ) ||
                      column.includes(
                        "DEDUCTION"
                      )
                    ) {

                      value =
                        formatCurrency(
                          value
                        );

                    }

                    return `
                      <td>
                        ${esc(
                          value
                        )}
                      </td>
                    `;

                  }
                )
                .join("")}

              ${
                editable
                  ? `
                    <td>

                      <div
                        class="table-actions"
                      >

                        <button
                          class="btn btn-light btn-edit"
                          data-index="${index}"
                        >
                          Edit
                        </button>

                        <button
                          class="btn btn-danger btn-delete"
                          data-index="${index}"
                        >
                          Hapus
                        </button>

                      </div>

                    </td>
                  `
                  : ""
              }

            </tr>
          `;

        }
      );

    }


    html += `
          </tbody>

        </table>

      </div>
    `;


    return html;

  }


  /*
   * =========================================================
   * DASHBOARD
   * =========================================================
   */

async function renderDashboard(el) {

  try {

    const response = await API.dashboard();

    const data = response.data || {};

    const number = function (value) {
      return formatNumber(Number(value) || 0);
    };

    const rupiah = function (value) {

      const amount = Number(value) || 0;

      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }).format(amount);

    };


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


      <!-- ======================================
           STATISTIK UTAMA
      ======================================= -->

      <div class="cards">


        <div class="card">

          <div class="muted">
            Siswa Aktif
          </div>

          <div class="metric">
            ${number(data.students)}
          </div>

        </div>


        <div class="card">

          <div class="muted">
            Sensei Aktif
          </div>

          <div class="metric">
            ${number(data.sensei)}
          </div>

        </div>


        <div class="card">

          <div class="muted">
            Kehadiran
          </div>

          <div class="metric">
            ${number(data.attendance)}%
          </div>

        </div>


        <div class="card">

          <div class="muted">
            Tagihan Pending
          </div>

          <div class="metric">
            ${number(data.pendingBilling)}
          </div>

        </div>


      </div>


      <!-- ======================================
           TOTAL DATA
      ======================================= -->

      <div class="section">

        <div class="page-title">

          <div>

            <h2>Total Data</h2>

            <p class="muted">
              Ringkasan seluruh data dalam sistem.
            </p>

          </div>

        </div>


        <div class="cards">


          <div class="card">

            <div class="muted">
              Siswa
            </div>

            <div class="metric">
              ${number(data.totalStudents)}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Sensei
            </div>

            <div class="metric">
              ${number(data.totalSensei)}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Absensi
            </div>

            <div class="metric">
              ${number(data.totalAttendance)}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Tagihan
            </div>

            <div class="metric">
              ${number(data.totalBilling)}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Pembayaran
            </div>

            <div class="metric">
              ${number(data.totalPayments)}
            </div>

          </div>


        </div>

      </div>


      <!-- ======================================
           KEUANGAN
      ======================================= -->

      <div class="section">

        <div class="page-title">

          <div>

            <h2>Keuangan</h2>

            <p class="muted">
              Ringkasan tagihan dan pembayaran.
            </p>

          </div>

        </div>


        <div class="cards">


          <div class="card">

            <div class="muted">
              Tagihan Pending
            </div>

            <div class="metric">

              ${rupiah(
                data.pendingBillingAmount
              )}

            </div>

            <p class="muted">
              ${number(data.pendingBilling)}
              tagihan belum selesai
            </p>

          </div>


          <div class="card">

            <div class="muted">
              Total Pembayaran
            </div>

            <div class="metric">

              ${rupiah(
                data.totalPaymentsAmount
              )}

            </div>

            <p class="muted">
              ${number(data.totalPayments)}
              transaksi pembayaran
            </p>

          </div>


        </div>

      </div>


      <!-- ======================================
           PAYROLL
      ======================================= -->

      <div class="section">

        <div class="page-title">

          <div>

            <h2>Payroll</h2>

            <p class="muted">
              Status pembayaran payroll Sensei.
            </p>

          </div>

        </div>


        <div class="cards">


          <div class="card">

            <div class="muted">
              Total Data Payroll
            </div>

            <div class="metric">

              ${number(data.totalSalary)}

            </div>

          </div>


          <div class="card">

            <div class="muted">
              Payroll Pending
            </div>

            <div class="metric">

              ${number(data.pendingSalary)}

            </div>

          </div>


        </div>

      </div>


      <!-- ======================================
           WELCOME
      ======================================= -->

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


  } catch (error) {

    renderError(
      el,
      error
    );

  }

}
  
  /*
   * =========================================================
   * CRUD PAGE
   * =========================================================
   */

  async function renderCrudPage(
    el,
    type
  ) {

    const config =
      TABLE_CONFIG[type];

    if (!config) {

      renderError(
        el,
        new Error(
          "Konfigurasi halaman tidak ditemukan: " +
          type
        )
      );

      return;

    }


    let rows = [];


    try {

      const response =
        await API[config.api]();

      rows =
        Array.isArray(
          response.data
        )
          ? response.data
          : [];


    } catch (error) {

      renderError(
        el,
        error
      );

      return;

    }


    let filteredRows =
      [...rows];


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>
            ${esc(
              config.title
            )}
          </h1>

          <p>
            ${esc(
              config.description
            )}
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addRecord"
        >
          ${esc(
            config.addLabel
          )}
        </button>

      </div>


      <div
        class="card"
        style="margin-bottom:16px"
      >

        <div
          class="field"
        >

          <label>
            Cari Data
          </label>

          <input
            type="search"
            id="tableSearch"
            placeholder="Cari berdasarkan data..."
          >

        </div>

      </div>


      <div
        id="crudTable"
      >
        ${table(
          filteredRows,
          config.columns,
          {
            editable: true
          }
        )}
      </div>

    `;


    /*
     * ADD
     */

    document
      .getElementById(
        "addRecord"
      )
      .addEventListener(
        "click",
        () => {

          openForm(
            config.form,
            null,
            async () => {

              await refreshCrud();

            }
          );

        }
      );


    /*
     * SEARCH
     */

    const searchInput =
      document.getElementById(
        "tableSearch"
      );


    if (searchInput) {

      searchInput.addEventListener(
        "input",
        () => {

          const query =
            searchInput.value
              .trim()
              .toLowerCase();


          if (!query) {

            filteredRows =
              [...rows];

          } else {

            filteredRows =
              rows.filter(
                row =>
                  config.search.some(
                    key =>
                      String(
                        row[key] ??
                        ""
                      )
                        .toLowerCase()
                        .includes(
                          query
                        )
                  )
              );

          }


          document.getElementById(
            "crudTable"
          ).innerHTML =
            table(
              filteredRows,
              config.columns,
              {
                editable: true
              }
            );


          bindTableActions();

        }

      );

    }


    /*
     * TABLE ACTIONS
     */

    function bindTableActions() {

      document
        .querySelectorAll(
          ".btn-edit"
        )
        .forEach(
          button => {

            button.addEventListener(
              "click",
              () => {

                const index =
                  Number(
                    button.dataset.index
                  );

                const record =
                  filteredRows[index];

                if (!record) {
                  return;
                }


                openForm(
                  config.form,
                  record,
                  async () => {

                    await refreshCrud();

                  }
                );

              }
            );

          }
        );


      document
        .querySelectorAll(
          ".btn-delete"
        )
        .forEach(
          button => {

            button.addEventListener(
              "click",
              async () => {

                const index =
                  Number(
                    button.dataset.index
                  );

                const record =
                  filteredRows[index];

                if (!record) {
                  return;
                }


                await deleteRecord(
                  type,
                  record
                );

              }
            );

          }
        );

    }


    bindTableActions();


    /*
     * REFRESH
     */

    async function refreshCrud() {

      try {

        const response =
          await API[config.api]();

        rows =
          Array.isArray(
            response.data
          )
            ? response.data
            : [];

        filteredRows =
          [...rows];


        const search =
          document.getElementById(
            "tableSearch"
          );


        if (search) {
          search.value = "";
        }


        const tableElement =
          document.getElementById(
            "crudTable"
          );


        if (tableElement) {

          tableElement.innerHTML =
            table(
              filteredRows,
              config.columns,
              {
                editable: true
              }
            );

          bindTableActions();

        }

      } catch (error) {

        toast(
          error.message ||
          "Gagal memuat data."
        );

      }

    }

  }


  /*
   * =========================================================
   * FORM GENERATOR
   * =========================================================
   */

  function openForm(
    formType,
    existing,
    onSaved
  ) {

    const config =
      FORM_CONFIG[formType];

    if (!config) {

      toast(
        "Form tidak ditemukan: " +
        formType
      );

      return;

    }


    const isEdit =
      !!existing;


    const modal =
      document.createElement(
        "div"
      );

    modal.className =
      "modal-backdrop";


    modal.innerHTML = `

      <div
        class="modal"
      >

        <div
          class="section-head"
        >

          <div>

            <h2>
              ${esc(
                isEdit
                  ? config.editTitle
                  : config.title
              )}
            </h2>

          </div>


          <button
            type="button"
            class="btn btn-light"
            id="closeModal"
          >
            Tutup
          </button>

        </div>


        <form
          id="recordForm"
        >

          <div
            class="form-grid"
          >

            ${config.fields
              .map(
                field =>
                  renderField(
                    field,
                    existing
                  )
              )
              .join("")}

          </div>


          <div
            class="modal-actions"
          >

            <button
              type="button"
              class="btn btn-light"
              id="cancelForm"
            >
              Batal
            </button>

            <button
              type="submit"
              class="btn btn-primary"
              id="saveForm"
            >
              Simpan
            </button>

          </div>

        </form>

      </div>

    `;


    document.body.appendChild(
      modal
    );


    /*
     * CLOSE
     */

    const close =
      () => {

        modal.remove();

      };


    modal
      .querySelector(
        "#closeModal"
      )
      .addEventListener(
        "click",
        close
      );


    modal
      .querySelector(
        "#cancelForm"
      )
      .addEventListener(
        "click",
        close
      );


    /*
     * SUBMIT
     */

    modal
      .querySelector(
        "#recordForm"
      )
      .addEventListener(
        "submit",
        async event => {

          event.preventDefault();


          const button =
            modal.querySelector(
              "#saveForm"
            );


          const originalText =
            button.textContent;


          try {

            button.disabled =
              true;

            button.textContent =
              "Menyimpan...";


            const payload =
              collectFormData(
                modal,
                config
              );


            validateFormData(
              payload,
              config
            );


            await saveRecord(
              formType,
              payload
            );


            toast(
              isEdit
                ? "Data berhasil diperbarui."
                : "Data berhasil ditambahkan."
            );


            close();


            if (
              typeof onSaved ===
              "function"
            ) {

              await onSaved();

            }

          } catch (error) {

            console.error(
              "Save error:",
              error
            );


            toast(
              error.message ||
              "Gagal menyimpan data."
            );


            button.disabled =
              false;

            button.textContent =
              originalText;

          }

        }
      );

  }


  /*
   * =========================================================
   * FIELD RENDERER
   * =========================================================
   */

  function renderField(
    field,
    existing
  ) {

    const value =
      existing
        ? existing[field.key] ??
          ""
        : "";


    const required =
      field.required
        ? "required"
        : "";


    const full =
      field.type ===
        "textarea"
        ? "full"
        : "";


    const id =
      "field_" +
      field.key;


    let control = "";


    if (
      field.type ===
      "select"
    ) {

      control = `

        <select
          id="${esc(id)}"
          name="${esc(field.key)}"
          ${required}
        >

          <option value="">
            Pilih...
          </option>

          ${(field.options || [])
            .map(
              option => `
                <option
                  value="${esc(option)}"
                  ${
                    String(
                      value
                    ) ===
                    String(
                      option
                    )
                      ? "selected"
                      : ""
                  }
                >
                  ${esc(option)}
                </option>
              `
            )
            .join("")}

        </select>

      `;

    } else if (
      field.type ===
      "textarea"
    ) {

      control = `

        <textarea
          id="${esc(id)}"
          name="${esc(field.key)}"
          rows="4"
          ${required}
          placeholder="${esc(
            field.placeholder ||
            ""
          )}"
        >${esc(
          value
        )}</textarea>

      `;

    } else {

      control = `

        <input
          id="${esc(id)}"
          name="${esc(field.key)}"
          type="${esc(
            field.type ||
            "text"
          )}"
          value="${esc(
            value
          )}"
          ${required}
          placeholder="${esc(
            field.placeholder ||
            ""
          )}"
        >

      `;

    }


    return `

      <div
        class="field ${full}"
      >

        <label
          for="${esc(id)}"
        >

          ${esc(
            field.label ||
            fieldLabel(
              field.key
            )
          )}

          ${
            field.required
              ? `<span style="color:#dc2626">*</span>`
              : ""
          }

        </label>

        ${control}

      </div>

    `;

  }


  /*
   * =========================================================
   * COLLECT FORM DATA
   * =========================================================
   */

  function collectFormData(
    modal,
    config
  ) {

    const form =
      modal.querySelector(
        "#recordForm"
      );


    const formData =
      new FormData(
        form
      );


    const payload = {};


    config.fields.forEach(
      field => {

        let value =
          formData.get(
            field.key
          );


        if (
          value === null ||
          value === undefined
        ) {

          value = "";

        }


        if (
          field.type ===
          "number"
        ) {

          if (
            String(
              value
            ).trim() === ""
          ) {

            value = "";

          } else {

            value =
              Number(
                value
              );

          }

        } else {

          value =
            String(
              value
            ).trim();

        }


        payload[field.key] =
          value;

      }
    );


    return payload;

  }


  /*
   * =========================================================
   * VALIDATION
   * =========================================================
   */

  function validateFormData(
    payload,
    config
  ) {

    const errors = [];


    config.fields.forEach(
      field => {

        if (
          !field.required
        ) {
          return;
        }


        const value =
          payload[field.key];


        if (
          value === "" ||
          value === null ||
          value === undefined
        ) {

          errors.push(
            field.label ||
            field.key
          );

        }

      }
    );


    if (
      errors.length
    ) {

      throw new Error(
        "Field wajib belum diisi: " +
        errors.join(", ")
      );

    }

  }


  /*
   * =========================================================
   * SAVE RECORD
   * =========================================================
   */

  async function saveRecord(
    type,
    payload
  ) {

    const actions = {

      students:
        "studentSave",

      sensei:
        "senseiSave",

      attendance:
        "attendanceSave",

      billing:
        "billingSave",

      payments:
        "paymentSave",

      salary:
        "salarySave"

    };


    const action =
      actions[type];


    if (!action) {

      throw new Error(
        "Action penyimpanan tidak ditemukan untuk: " +
        type
      );

    }


    const result =
      await API.call(
        action,
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


    return result;

  }


  /*
   * =========================================================
   * DELETE RECORD
   * =========================================================
   */

  async function deleteRecord(
    type,
    record
  ) {

    const actions = {

      students:
        "studentDelete",

      sensei:
        "senseiDelete"

    };


    const action =
      actions[type];


    if (!action) {

      toast(
        "Penghapusan untuk menu ini belum tersedia."
      );

      return;

    }


    const config =
      TABLE_CONFIG[type];


    const idField =
      config?.columns?.[0];


    const id =
      record[
        idField
      ];


    if (!id) {

      toast(
        "ID data tidak ditemukan."
      );

      return;

    }


    const confirmed =
      window.confirm(
        "Yakin ingin menghapus data " +
        id +
        "?"
      );


    if (!confirmed) {
      return;
    }


    try {

      const result =
        await API.call(
          action,
          {
            id
          }
        );


      if (
        !result ||
        result.success !== true
      ) {

        throw new Error(
          result?.message ||
          "Data gagal dihapus."
        );

      }


      toast(
        "Data berhasil dihapus."
      );


      /*
       * Reload halaman aktif.
       */

      const activePage =
        document
          .querySelector(
            "[data-page].active"
          );


      if (
        activePage
      ) {

        await load(
          activePage.dataset.page
        );

      }

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );


      toast(
        error.message ||
        "Gagal menghapus data."
      );

    }

  }


  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  function renderError(
    el,
    error
  ) {

    const message =
      error?.message ||
      "Terjadi kesalahan.";


    el.innerHTML = `

      <div class="card">

        <h3>
          Terjadi kesalahan
        </h3>

        <p
          class="muted"
        >
          ${esc(
            message
          )}
        </p>

        <button
          class="btn btn-primary"
          id="retryButton"
        >
          Coba Lagi
        </button>

      </div>

    `;


    const retry =
      document.getElementById(
        "retryButton"
      );


    if (retry) {

      retry.addEventListener(
        "click",
        () => {

          const active =
            document.querySelector(
              "[data-page].active"
            );


          if (active) {

            load(
              active.dataset.page
            );

          } else {

            load(
              "dashboard"
            );

          }

        }
      );

    }

  }


  /*
   * =========================================================
   * TOAST
   * =========================================================
   */

  function toast(
    message
  ) {

    const old =
      document.querySelectorAll(
        ".toast"
      );


    old.forEach(
      element =>
        element.remove()
    );


    const t =
      document.createElement(
        "div"
      );


    t.className =
      "toast";


    t.textContent =
      message;


    document.body.appendChild(
      t
    );


    setTimeout(
      () => {

        t.remove();

      },
      2600
    );

  }


  /*
   * =========================================================
   * REPORTS
   * =========================================================
   */

  async function renderReports(
    el
  ) {

    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>
            Laporan
          </h1>

          <p>
            Ringkasan operasional
            dan keuangan.
          </p>

        </div>

      </div>


      <div class="cards">

        <div class="card">

          <strong>
            Laporan Absensi
          </strong>

          <p class="muted">
            Rekap kehadiran siswa
            dan sensei.
          </p>

          <button
            class="btn btn-dark"
            style="margin-top:10px"
          >
            Buka
          </button>

        </div>


        <div class="card">

          <strong>
            Laporan Tagihan
          </strong>

          <p class="muted">
            Rekap tagihan dan status
            pembayaran.
          </p>

          <button
            class="btn btn-dark"
            style="margin-top:10px"
          >
            Buka
          </button>

        </div>


        <div class="card">

          <strong>
            Laporan Payroll
          </strong>

          <p class="muted">
            Rekap pembayaran payroll
            sensei.
          </p>

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


  /*
   * =========================================================
   * SETTINGS
   * =========================================================
   */

  async function renderSettings(
    el
  ) {

    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>
            Pengaturan
          </h1>

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
              ARIMA_CONFIG.SPREADSHEET_ID ||
              ""
            )}"
            readonly
          >

        </div>


        <p
          class="muted"
        >
          API_URL diatur pada
          js/config.js setelah backend
          Apps Script dideploy.
        </p>

      </div>

    `;

  }


  /*
   * =========================================================
   * PUBLIC API
   * =========================================================
   */

  return {

    init,

    load,

    form: (
      type,
      existing = null,
      onSaved = null
    ) =>
      openForm(
        type,
        existing,
        onSaved
      )

  };


})();

  /*
   * =========================================================
   * TABLE CONFIGURATION
   * =========================================================
   *
   * Konfigurasi ini harus mengikuti kolom pada Google Sheet.
   *
   * API:
   *   students   -> API.students()
   *   sensei     -> API.sensei()
   *   attendance -> API.attendance()
   *   billing    -> API.billing()
   *   payments   -> API.payments()
   *   salary     -> API.salary()
   *
   */


  const TABLE_CONFIG = {

    students: {

      title:
        "Data Siswa",

      description:
        "Kelola identitas dan program siswa.",

      addLabel:
        "+ Tambah Siswa",

      api:
        "students",

      columns: [
        "ID_SISWA",
        "NAMA",
        "NIK",
        "NO_WA",
        "NAMA_ORANG_TUA",
        "NO_WA_ORANG_TUA",
        "PROGRAM",
        "ASRAMA",
        "TANGGAL_MASUK",
        "STATUS"
      ],

      search: [
        "ID_SISWA",
        "NAMA",
        "NIK",
        "NO_WA",
        "PROGRAM",
        "STATUS"
      ],

      form:
        "students"

    },


    sensei: {

      title:
        "Data Sensei",

      description:
        "Kelola data pengajar LPKS Arima Persada.",

      addLabel:
        "+ Tambah Sensei",

      api:
        "sensei",

      columns: [
        "ID_SENSEI",
        "NAMA",
        "NO_WA",
        "EMAIL",
        "TARIF_PER_PERTEMUAN",
        "TARIF_PER_JAM",
        "STATUS"
      ],

      search: [
        "ID_SENSEI",
        "NAMA",
        "NO_WA",
        "EMAIL",
        "STATUS"
      ],

      form:
        "sensei"

    },


    attendance: {

      title:
        "Absensi",

      description:
        "Pencatatan kehadiran siswa dan sensei.",

      addLabel:
        "+ Catat Absensi",

      api:
        "attendance",

      columns: [
        "ATTENDANCE_ID",
        "ACTOR_ID",
        "ACTOR_TYPE",
        "SESSION_ID",
        "CLASS_ID",
        "TANGGAL",
        "JAM_MASUK",
        "JAM_KELUAR",
        "STATUS",
        "CATATAN"
      ],

      search: [
        "ATTENDANCE_ID",
        "ACTOR_ID",
        "SESSION_ID",
        "CLASS_ID",
        "STATUS"
      ],

      form:
        "attendance"

    },


    billing: {

      title:
        "Tagihan",

      description:
        "Kelola tagihan siswa.",

      addLabel:
        "+ Buat Tagihan",

      api:
        "billing",

      columns: [
        "BILLING_ID",
        "ID_SISWA",
        "DESCRIPTION",
        "CATEGORY",
        "AMOUNT",
        "DUE_DATE",
        "STATUS",
        "NOTES"
      ],

      search: [
        "BILLING_ID",
        "ID_SISWA",
        "DESCRIPTION",
        "CATEGORY",
        "STATUS"
      ],

      form:
        "billing"

    },


    payments: {

      title:
        "Pembayaran",

      description:
        "Kelola pembayaran dan transaksi siswa.",

      addLabel:
        "+ Input Pembayaran",

      api:
        "payments",

      columns: [
        "PAYMENT_ID",
        "BILLING_ID",
        "ID_SISWA",
        "PAYMENT_DATE",
        "AMOUNT",
        "PAYMENT_METHOD",
        "REFERENCE_NO",
        "NOTES"
      ],

      search: [
        "PAYMENT_ID",
        "BILLING_ID",
        "ID_SISWA",
        "REFERENCE_NO",
        "PAYMENT_METHOD"
      ],

      form:
        "payments"

    },


    salary: {

      title:
        "Payroll Sensei",

      description:
        "Kelola payroll dan pembayaran sensei.",

      addLabel:
        "+ Rekap Payroll",

      api:
        "salary",

      columns: [
        "SALARY_ID",
        "ID_SENSEI",
        "PERIOD",
        "MEETING_COUNT",
        "HOUR_COUNT",
        "BASE_AMOUNT",
        "BONUS",
        "DEDUCTION",
        "NET_SALARY",
        "PAYMENT_DATE",
        "PAYMENT_STATUS",
        "NOTES"
      ],

      search: [
        "SALARY_ID",
        "ID_SENSEI",
        "PERIOD",
        "PAYMENT_STATUS"
      ],

      form:
        "salary"

    }

  };


  /*
   * =========================================================
   * FORM CONFIGURATION
   * =========================================================
   *
   * Form dibuat berdasarkan SCHEMA Google Spreadsheet.
   *
   * ID otomatis boleh dikosongkan.
   * Backend akan membuat ID menggunakan generateId_().
   *
   */


  const FORM_CONFIG = {

    /*
     * -------------------------------------------------------
     * SISWA
     * -------------------------------------------------------
     */

    students: {

      title:
        "Tambah Siswa",

      editTitle:
        "Edit Data Siswa",

      fields: [

        {
          key:
            "ID_SISWA",

          label:
            "ID Siswa",

          type:
            "text",

          required:
            false,

          placeholder:
            "Kosongkan untuk ID otomatis"
        },


        {
          key:
            "NAMA",

          label:
            "Nama Lengkap",

          type:
            "text",

          required:
            true,

          placeholder:
            "Nama lengkap siswa"
        },


        {
          key:
            "NIK",

          label:
            "NIK",

          type:
            "text",

          required:
            false,

          placeholder:
            "16 digit NIK"
        },


        {
          key:
            "NO_WA",

          label:
            "No. WhatsApp",

          type:
            "text",

          required:
            true,

          placeholder:
            "08xxxxxxxxxx"
        },


        {
          key:
            "NAMA_ORANG_TUA",

          label:
            "Nama Orang Tua / Wali",

          type:
            "text",

          required:
            false
        },


        {
          key:
            "NO_WA_ORANG_TUA",

          label:
            "No. WhatsApp Orang Tua / Wali",

          type:
            "text",

          required:
            false
        },


        {
          key:
            "PROGRAM",

          label:
            "Program",

          type:
            "select",

          required:
            true,

          options: [
            "MAGANG",
            "SSW (TOKUTEI GINOU)",
            "ENGINEER",
            "ENGINEERING"
          ]
        },


        {
          key:
            "ASRAMA",

          label:
            "Asrama",

          type:
            "select",

          required:
            true,

          options: [
            "YA",
            "TIDAK"
          ]
        },


        {
          key:
            "TANGGAL_MASUK",

          label:
            "Tanggal Masuk",

          type:
            "date",

          required:
            false
        },


        {
          key:
            "STATUS",

          label:
            "Status",

          type:
            "select",

          required:
            true,

          options: [
            "AKTIF",
            "NONAKTIF",
            "LULUS",
            "KELUAR"
          ]
        }

      ]

    },


    /*
     * -------------------------------------------------------
     * SENSEI
     * -------------------------------------------------------
     */

    sensei: {

      title:
        "Tambah Sensei",

      editTitle:
        "Edit Data Sensei",

      fields: [

        {
          key:
            "ID_SENSEI",

          label:
            "ID Sensei",

          type:
            "text",

          required:
            false,

          placeholder:
            "Kosongkan untuk ID otomatis"
        },


        {
          key:
            "NAMA",

          label:
            "Nama Sensei",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "NO_WA",

          label:
            "No. WhatsApp",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "EMAIL",

          label:
            "Email",

          type:
            "email",

          required:
            false
        },


        {
          key:
            "TARIF_PER_PERTEMUAN",

          label:
            "Tarif per Pertemuan",

          type:
            "number",

          required:
            false
        },


        {
          key:
            "TARIF_PER_JAM",

          label:
            "Tarif per Jam",

          type:
            "number",

          required:
            false
        },


        {
          key:
            "STATUS",

          label:
            "Status",

          type:
            "select",

          required:
            true,

          options: [
            "AKTIF",
            "NONAKTIF"
          ]

        }

      ]

    },


    /*
     * -------------------------------------------------------
     * ABSENSI
     * -------------------------------------------------------
     */

    attendance: {

      title:
        "Catat Absensi",

      editTitle:
        "Edit Absensi",

      fields: [

        {
          key:
            "ATTENDANCE_ID",

          label:
            "ID Absensi",

          type:
            "text",

          required:
            false,

          placeholder:
            "Kosongkan untuk ID otomatis"
        },


        {
          key:
            "ACTOR_ID",

          label:
            "ID Siswa / Sensei",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "ACTOR_TYPE",

          label:
            "Tipe Aktor",

          type:
            "select",

          required:
            true,

          options: [
            "SISWA",
            "SENSEI"
          ]
        },


        {
          key:
            "SESSION_ID",

          label:
            "Session ID",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "CLASS_ID",

          label:
            "Class ID",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "TANGGAL",

          label:
            "Tanggal",

          type:
            "date",

          required:
            true
        },


        {
          key:
            "JAM_MASUK",

          label:
            "Jam Masuk",

          type:
            "time",

          required:
            false
        },


        {
          key:
            "JAM_KELUAR",

          label:
            "Jam Keluar",

          type:
            "time",

          required:
            false
        },


        {
          key:
            "STATUS",

          label:
            "Status",

          type:
            "select",

          required:
            true,

          options: [
            "HADIR",
            "IZIN",
            "SAKIT",
            "ALPA",
            "TERLAMBAT"
          ]

        },


        {
          key:
            "CATATAN",

          label:
            "Catatan",

          type:
            "textarea",

          required:
            false

        }

      ]

    },


    /*
     * -------------------------------------------------------
     * TAGIHAN
     * -------------------------------------------------------
     */

    billing: {

      title:
        "Buat Tagihan",

      editTitle:
        "Edit Tagihan",

      fields: [

        {
          key:
            "BILLING_ID",

          label:
            "ID Tagihan",

          type:
            "text",

          required:
            false,

          placeholder:
            "Kosongkan untuk ID otomatis"
        },


        {
          key:
            "ID_SISWA",

          label:
            "ID Siswa",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "DESCRIPTION",

          label:
            "Deskripsi",

          type:
            "text",

          required:
            true,

          placeholder:
            "Contoh: Biaya belajar bulan Oktober"
        },


        {
          key:
            "CATEGORY",

          label:
            "Kategori",

          type:
            "select",

          required:
            true,

          options: [
            "BELAJAR",
            "JFT",
            "SSW",
            "JLPT",
            "ASRAMA",
            "LAINNYA"
          ]

        },


        {
          key:
            "AMOUNT",

          label:
            "Jumlah",

          type:
            "number",

          required:
            true
        },


        {
          key:
            "DUE_DATE",

          label:
            "Jatuh Tempo",

          type:
            "date",

          required:
            false
        },


        {
          key:
            "STATUS",

          label:
            "Status",

          type:
            "select",

          required:
            true,

          options: [
            "PENDING",
            "LUNAS",
            "JATUH_TEMPO",
            "BATAL"
          ]

        },


        {
          key:
            "NOTES",

          label:
            "Catatan",

          type:
            "textarea",

          required:
            false
        }

      ]

    },


    /*
     * -------------------------------------------------------
     * PEMBAYARAN
     * -------------------------------------------------------
     */

    payments: {

      title:
        "Input Pembayaran",

      editTitle:
        "Edit Pembayaran",

      fields: [

        {
          key:
            "PAYMENT_ID",

          label:
            "ID Pembayaran",

          type:
            "text",

          required:
            false,

          placeholder:
            "Kosongkan untuk ID otomatis"
        },


        {
          key:
            "BILLING_ID",

          label:
            "ID Tagihan",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "ID_SISWA",

          label:
            "ID Siswa",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "PAYMENT_DATE",

          label:
            "Tanggal Pembayaran",

          type:
            "date",

          required:
            true
        },


        {
          key:
            "AMOUNT",

          label:
            "Jumlah Pembayaran",

          type:
            "number",

          required:
            true
        },


        {
          key:
            "PAYMENT_METHOD",

          label:
            "Metode Pembayaran",

          type:
            "select",

          required:
            true,

          options: [
            "CASH",
            "TRANSFER",
            "QRIS",
            "LAINNYA"
          ]

        },


        {
          key:
            "REFERENCE_NO",

          label:
            "Nomor Referensi",

          type:
            "text",

          required:
            false
        },


        {
          key:
            "NOTES",

          label:
            "Catatan",

          type:
            "textarea",

          required:
            false
        }

      ]

    },


    /*
     * -------------------------------------------------------
     * PAYROLL
     * -------------------------------------------------------
     */

    salary: {

      title:
        "Rekap Payroll",

      editTitle:
        "Edit Payroll",

      fields: [

        {
          key:
            "SALARY_ID",

          label:
            "ID Payroll",

          type:
            "text",

          required:
            false,

          placeholder:
            "Kosongkan untuk ID otomatis"
        },


        {
          key:
            "ID_SENSEI",

          label:
            "ID Sensei",

          type:
            "text",

          required:
            true
        },


        {
          key:
            "PERIOD",

          label:
            "Periode",

          type:
            "month",

          required:
            true
        },


        {
          key:
            "MEETING_COUNT",

          label:
            "Jumlah Pertemuan",

          type:
            "number",

          required:
            false
        },


        {
          key:
            "HOUR_COUNT",

          label:
            "Jumlah Jam",

          type:
            "number",

          required:
            false
        },


        {
          key:
            "BASE_AMOUNT",

          label:
            "Gaji Pokok",

          type:
            "number",

          required:
            true
        },


        {
          key:
            "BONUS",

          label:
            "Bonus",

          type:
            "number",

          required:
            false
        },


        {
          key:
            "DEDUCTION",

          label:
            "Potongan",

          type:
            "number",

          required:
            false
        },


        {
          key:
            "NET_SALARY",

          label:
            "Gaji Bersih",

          type:
            "number",

          required:
            false,

          placeholder:
            "Bisa dihitung oleh backend"
        },


        {
          key:
            "PAYMENT_DATE",

          label:
            "Tanggal Pembayaran",

          type:
            "date",

          required:
            false
        },


        {
          key:
            "PAYMENT_STATUS",

          label:
            "Status Pembayaran",

          type:
            "select",

          required:
            true,

          options: [
            "PENDING",
            "DIBAYAR",
            "BATAL"
          ]

        },


        {
          key:
            "NOTES",

          label:
            "Catatan",

          type:
            "textarea",

          required:
            false
        }

      ]

    }

  };


  /*
   * =========================================================
   * BACKWARD COMPATIBILITY
   * =========================================================
   *
   * Kalau kode lama masih memanggil:
   *
   * App.form("Siswa")
   * App.form("Sensei")
   * App.form("Absensi")
   * App.form("Tagihan")
   * App.form("Pembayaran")
   * App.form("Payroll")
   *
   * semuanya tetap diarahkan ke form baru.
   *
   */


  const OLD_FORM_MAP = {

    "Siswa":
      "students",

    "Sensei":
      "sensei",

    "Absensi":
      "attendance",

    "Tagihan":
      "billing",

    "Pembayaran":
      "payments",

    "Payroll":
      "salary"

  };


  /*
   * =========================================================
   * OVERRIDE PUBLIC FORM
   * =========================================================
   */

  function publicForm(
    type,
    existing = null,
    onSaved = null
  ) {

    const normalized =
      OLD_FORM_MAP[type] ||
      type;


    if (
      !FORM_CONFIG[
        normalized
      ]
    ) {

      toast(
        "Form tidak tersedia: " +
        type
      );

      return;

    }


    openForm(
      normalized,
      existing,
      onSaved
    );

  }


  /*
   * =========================================================
   * FINAL PUBLIC API
   * =========================================================
   */

  return {

    init,

    load,

    form:
      publicForm

  };


})();
