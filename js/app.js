window.App = (() => {
  "use strict";

  /* =========================================================
   * MENU
   * ========================================================= */

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
   * FORM CONFIG
   * Sesuai SCHEMA Spreadsheet
   * ========================================================= */

  const FORM_CONFIG = {

    students: {
      title: "Tambah Siswa",
      editTitle: "Edit Data Siswa",
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
          label: "Nama Lengkap",
          type: "text",
          required: true,
          placeholder: "Nama lengkap siswa"
        },
        {
          key: "NIK",
          label: "NIK",
          type: "text",
          required: false,
          placeholder: "16 digit NIK"
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
          required: false,
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
            "SSW (TOKUTEI GINOU)",
            "ENGINEER",
            "ENGINEERING"
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
      editTitle: "Edit Data Sensei",
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
          placeholder: "Contoh: Biaya belajar Oktober"
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
          required: false,
          placeholder: "Bisa dihitung oleh backend"
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
            "DIBAYAR",
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
    }

  };


  /* =========================================================
   * TABLE CONFIG
   * ========================================================= */

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
        "NO_WA",
        "PROGRAM",
        "STATUS"
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
        "EMAIL",
        "STATUS"
      ]
    },


    attendance: {
      api: "attendance",
      title: "Absensi",
      description: "Pencatatan kehadiran siswa dan sensei.",
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
        "SESSION_ID",
        "CLASS_ID",
        "STATUS"
      ]
    },


    billing: {
      api: "billing",
      title: "Tagihan",
      description: "Kelola tagihan siswa.",
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
      description: "Kelola pembayaran siswa.",
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
        "REFERENCE_NO",
        "PAYMENT_METHOD"
      ]
    },


    salary: {
      api: "salary",
      title: "Payroll Sensei",
      description: "Kelola payroll dan pembayaran sensei.",
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
        "PAYMENT_STATUS",
        "NOTES"
      ],

      search: [
        "SALARY_ID",
        "ID_SENSEI",
        "PERIOD",
        "PAYMENT_STATUS"
      ]
    }

  };


  /* =========================================================
   * INITIALIZATION
   * ========================================================= */

  async function init() {

    try {

      user = Auth.require();

      if (!user) {
        return;
      }

      renderShell();

      await load("dashboard");

    } catch (error) {

      console.error(
        "App initialization error:",
        error
      );

      const app =
        document.getElementById("app");

      if (app) {
        renderError(
          app,
          error
        );
      }

    }

  }


  /* =========================================================
   * SHELL
   * ========================================================= */

  function renderShell() {

    const app =
      document.getElementById("app");

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

            ${menus.map(menu => `

              <a
                href="#"
                data-page="${esc(menu[0])}"
              >

                ${menu[2]}
                &nbsp;
                ${esc(menu[1])}

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

              ${esc(user?.name || "")}
              ·
              ${esc(user?.role || "")}

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
      .forEach(link => {

        link.addEventListener(
          "click",
          event => {

            event.preventDefault();

            load(
              link.dataset.page
            );

          }
        );

      });


    const logout =
      document.getElementById("logout");

    if (logout) {

      logout.addEventListener(
        "click",
        async event => {

          event.preventDefault();

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


  /* =========================================================
   * LOAD PAGE
   * ========================================================= */

  async function load(page) {

    const pageElement =
      document.getElementById("page");

    if (!pageElement) {
      return;
    }


    document
      .querySelectorAll("[data-page]")
      .forEach(link => {

        link.classList.toggle(
          "active",
          link.dataset.page === page
        );

      });


    pageElement.innerHTML = `

      <div class="card">
        Memuat...
      </div>

    `;


    const renderers = {

      dashboard:
        renderDashboard,

      students:
        () =>
          renderCrudPage(
            pageElement,
            "students"
          ),

      sensei:
        () =>
          renderCrudPage(
            pageElement,
            "sensei"
          ),

      attendance:
        () =>
          renderCrudPage(
            pageElement,
            "attendance"
          ),

      billing:
        () =>
          renderCrudPage(
            pageElement,
            "billing"
          ),

      payments:
        () =>
          renderCrudPage(
            pageElement,
            "payments"
          ),

      salary:
        () =>
          renderCrudPage(
            pageElement,
            "salary"
          ),

      reports:
        renderReports,

      settings:
        renderSettings

    };


    const renderer =
      renderers[page] ||
      renderDashboard;


    try {

      await renderer(
        pageElement
      );

    } catch (error) {

      console.error(
        "Page load error:",
        error
      );

      renderError(
        pageElement,
        error
      );

    }

  }


  /* =========================================================
   * DASHBOARD
   * ========================================================= */

  async function renderDashboard(el) {

    try {

      const results =
        await Promise.allSettled([

          API.dashboard(),

          API.students(),

          API.sensei(),

          API.attendance(),

          API.billing(),

          API.payments(),

          API.salary()

        ]);


      const dashboard =
        getResultData(
          results[0]
        );

      const students =
        getResultArray(
          results[1]
        );

      const sensei =
        getResultArray(
          results[2]
        );

      const attendance =
        getResultArray(
          results[3]
        );

      const billing =
        getResultArray(
          results[4]
        );

      const payments =
        getResultArray(
          results[5]
        );

      const salary =
        getResultArray(
          results[6]
        );


      const activeStudents =
        dashboard.students ??
        students.filter(
          row =>
            String(
              row.STATUS || ""
            ).toUpperCase() === "AKTIF"
        ).length;


      const activeSensei =
        dashboard.sensei ??
        sensei.filter(
          row =>
            String(
              row.STATUS || ""
            ).toUpperCase() === "AKTIF"
        ).length;


      const attendancePercent =
        dashboard.attendance ?? 0;


      const pendingBilling =
        dashboard.pendingBilling ??
        billing.filter(
          row =>
            [
              "PENDING",
              "BELUM BAYAR",
              "BELUM LUNAS",
              "TERTUNGGAK",
              "CICILAN",
              "SEBAGIAN",
              "TERLAMBAT"
            ].includes(
              String(
                row.STATUS || ""
              ).toUpperCase()
            )
        ).length;


      const totalStudents =
        students.length;


      const totalSensei =
        sensei.length;


      const totalAttendance =
        attendance.length;


      const totalBilling =
        billing.length;


      const totalPayments =
        payments.length;


      const pendingBillingAmount =
        billing
          .filter(row =>
            [
              "PENDING",
              "BELUM BAYAR",
              "BELUM LUNAS",
              "TERTUNGGAK",
              "CICILAN",
              "SEBAGIAN",
              "TERLAMBAT"
            ].includes(
              String(
                row.STATUS || ""
              ).toUpperCase()
            )
          )
          .reduce(
            (
              total,
              row
            ) =>
              total +
              numberValue(
                row.AMOUNT
              ),
            0
          );


      const totalPaymentAmount =
        payments.reduce(
          (
            total,
            row
          ) =>
            total +
            numberValue(
              row.AMOUNT
            ),
          0
        );


      const pendingSalary =
        salary.filter(
          row =>
            String(
              row.PAYMENT_STATUS ||
              ""
            ).toUpperCase() ===
            "PENDING"
        ).length;


      el.innerHTML = `

        <div class="page-title">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Ringkasan operasional
              LPKS Arima Persada.
            </p>

          </div>

        </div>


        <!-- STATISTIK UTAMA -->

        <div class="cards">

          <div class="card">

            <div class="muted">
              SISWA AKTIF
            </div>

            <div class="metric">
              ${formatNumber(
                activeStudents
              )}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              SENSEI AKTIF
            </div>

            <div class="metric">
              ${formatNumber(
                activeSensei
              )}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              KEHADIRAN
            </div>

            <div class="metric">
              ${formatNumber(
                attendancePercent
              )}%
            </div>

          </div>


          <div class="card">

            <div class="muted">
              TAGIHAN PENDING
            </div>

            <div class="metric">
              ${formatNumber(
                pendingBilling
              )}
            </div>

          </div>

        </div>


        <!-- TOTAL DATA -->

        <div class="section">

          <div class="page-title">

            <div>

              <h2>
                TOTAL DATA
              </h2>

              <p class="muted">
                Rekap seluruh data sistem.
              </p>

            </div>

          </div>


          <div class="cards">

            <div class="card">

              <div class="muted">
                Siswa
              </div>

              <div class="metric">
                ${formatNumber(
                  totalStudents
                )}
              </div>

            </div>


            <div class="card">

              <div class="muted">
                Sensei
              </div>

              <div class="metric">
                ${formatNumber(
                  totalSensei
                )}
              </div>

            </div>


            <div class="card">

              <div class="muted">
                Absensi
              </div>

              <div class="metric">
                ${formatNumber(
                  totalAttendance
                )}
              </div>

            </div>


            <div class="card">

              <div class="muted">
                Tagihan
              </div>

              <div class="metric">
                ${formatNumber(
                  totalBilling
                )}
              </div>

            </div>


            <div class="card">

              <div class="muted">
                Pembayaran
              </div>

              <div class="metric">
                ${formatNumber(
                  totalPayments
                )}
              </div>

            </div>

          </div>

        </div>


        <!-- KEUANGAN -->

        <div class="section">

          <div class="page-title">

            <div>

              <h2>
                KEUANGAN
              </h2>

              <p class="muted">
                Ringkasan transaksi keuangan.
              </p>

            </div>

          </div>


          <div class="cards">

            <div class="card">

              <div class="muted">
                Tagihan pending
              </div>

              <div class="metric">
                ${formatCurrency(
                  pendingBillingAmount
                )}
              </div>

            </div>


            <div class="card">

              <div class="muted">
                Total pembayaran
              </div>

              <div class="metric">
                ${formatCurrency(
                  totalPaymentAmount
                )}
              </div>

            </div>

          </div>

        </div>


        <!-- PAYROLL -->

        <div class="section">

          <div class="page-title">

            <div>

              <h2>
                PAYROLL
              </h2>

              <p class="muted">
                Ringkasan status payroll Sensei.
              </p>

            </div>

          </div>


          <div class="cards">

            <div class="card">

              <div class="muted">
                Payroll pending
              </div>

              <div class="metric">
                ${formatNumber(
                  pendingSalary
                )}
              </div>

            </div>

          </div>

        </div>


        <!-- WELCOME -->

        <div class="section">

          <div class="card">

            <strong>
              Selamat datang,
              ${esc(
                user?.name || ""
              )}
            </strong>

            <p class="muted">
              Gunakan menu di sebelah kiri
              untuk mengelola sistem
              ARIMA Management.
            </p>

          </div>

        </div>

      `;

    } catch (error) {

      console.error(
        "Dashboard error:",
        error
      );

      renderError(
        el,
        error
      );

    }

  }


  /* =========================================================
   * CRUD PAGE
   * ========================================================= */

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
          response?.data
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

        <div class="field">

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


      <div id="crudTable">

        ${renderTable(
          filteredRows,
          config.columns,
          {
            editable: true
          }
        )}

      </div>

    `;


    const addButton =
      document.getElementById(
        "addRecord"
      );


    if (addButton) {

      addButton.addEventListener(
        "click",
        () => {

          openForm(
            config.form,
            null,
            async () => {

              await refresh();

            }
          );

        }
      );

    }


    const search =
      document.getElementById(
        "tableSearch"
      );


    if (search) {

      search.addEventListener(
        "input",
        () => {

          const query =
            search.value
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
                        row?.[key] ??
                        ""
                      )
                        .toLowerCase()
                        .includes(
                          query
                        )
                  )
              );

          }


          updateTable();

        }
      );

    }


    bindTableActions();


    function updateTable() {

      const tableElement =
        document.getElementById(
          "crudTable"
        );


      if (!tableElement) {
        return;
      }


      tableElement.innerHTML =
        renderTable(
          filteredRows,
          config.columns,
          {
            editable: true
          }
        );


      bindTableActions();

    }


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

                    await refresh();

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


    async function refresh() {

      try {

        const response =
          await API[config.api]();


        rows =
          Array.isArray(
            response?.data
          )
            ? response.data
            : [];


        filteredRows =
          [...rows];


        if (search) {
          search.value = "";
        }


        updateTable();

      } catch (error) {

        toast(
          error.message ||
          "Gagal memuat data."
        );

      }

    }

  }


  /* =========================================================
   * TABLE
   * ========================================================= */

  function renderTable(
    rows,
    columns,
    options = {}
  ) {

    const editable =
      options.editable === true;


    const safeRows =
      Array.isArray(rows)
        ? rows
        : [];


    let html = `

      <div class="table-wrap">

        <table class="table">

          <thead>

            <tr>

              ${columns.map(
                column => `
                  <th>
                    ${esc(
                      fieldLabel(
                        column
                      )
                    )}
                  </th>
                `
              ).join("")}


              ${
                editable
                  ? "<th>Aksi</th>"
                  : ""
              }

            </tr>

          </thead>


          <tbody>

    `;


    if (!safeRows.length) {

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

              ${columns.map(
                column => {

                  let value =
                    row?.[column] ??
                    "";


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
                    ) ||
                    column.includes(
                      "BASE_AMOUNT"
                    ) ||
                    column.includes(
                      "NET_SALARY"
                    )
                  ) {

                    if (
                      value !== ""
                    ) {

                      value =
                        formatCurrency(
                          value
                        );

                    }

                  }


                  return `

                    <td>
                      ${esc(
                        value
                      )}
                    </td>

                  `;

                }
              ).join("")}


              ${
                editable
                  ? `

                    <td>

                      <div
                        class="table-actions"
                      >

                        <button
                          type="button"
                          class="btn btn-light btn-edit"
                          data-index="${index}"
                        >
                          Edit
                        </button>

                        ${
                          canDelete(
                            columns
                          )
                            ? `

                              <button
                                type="button"
                                class="btn btn-danger btn-delete"
                                data-index="${index}"
                              >
                                Hapus
                              </button>

                            `
                            : ""
                        }

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


  function canDelete(columns) {

    const id =
      columns?.[0];


    return (
      id === "ID_SISWA" ||
      id === "ID_SENSEI"
    );

  }


  /* =========================================================
   * FIELD LABEL
   * ========================================================= */

  function fieldLabel(key) {

    const labels = {

      ID_SISWA:
        "ID Siswa",

      NAMA:
        "Nama",

      NIK:
        "NIK",

      NO_WA:
        "No. WhatsApp",

      NAMA_ORANG_TUA:
        "Nama Orang Tua / Wali",

      NO_WA_ORANG_TUA:
        "No. WA Orang Tua",

      PROGRAM:
        "Program",

      ASRAMA:
        "Asrama",

      TANGGAL_MASUK:
        "Tanggal Masuk",

      STATUS:
        "Status",

      ID_SENSEI:
        "ID Sensei",

      EMAIL:
        "Email",

      TARIF_PER_PERTEMUAN:
        "Tarif / Pertemuan",

      TARIF_PER_JAM:
        "Tarif / Jam",

      ATTENDANCE_ID:
        "ID Absensi",

      ACTOR_ID:
        "Actor ID",

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
        "No. Referensi",

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
      String(key)
        .replaceAll(
          "_",
          " "
        )
    );

  }


  /* =========================================================
   * FORM
   * ========================================================= */

  function openForm(
    formType,
    existing = null,
    onSaved = null
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

      <div class="modal">

        <div class="section-head">

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


        <form id="recordForm">

          <div class="form-grid">

            ${config.fields.map(
              field =>
                renderField(
                  field,
                  existing
                )
            ).join("")}

          </div>


          <div class="modal-actions">

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


    const close = () => {
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


          const original =
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
              original;

          }

        }
      );

  }


  function renderField(
    field,
    existing
  ) {

    const value =
      existing?.[field.key] ??
      "";


    const required =
      field.required
        ? "required"
        : "";


    const id =
      "field_" +
      field.key;


    const full =
      field.type ===
      "textarea"
        ? "full"
        : "";


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
                    String(value) ===
                    String(option)
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
            normalizeInputValue(
              field,
              value
            )
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
            field.key
          )}

          ${
            field.required
              ? `<span style="color:red">*</span>`
              : ""
          }

        </label>

        ${control}

      </div>

    `;

  }


  function normalizeInputValue(
    field,
    value
  ) {

    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }


    if (
      field.type ===
      "date"
    ) {

      return normalizeDate(
        value
      );

    }


    return String(value);

  }


  function normalizeDate(
    value
  ) {

    if (!value) {
      return "";
    }


    const text =
      String(value);


    if (
      /^\d{4}-\d{2}-\d{2}$/.test(
        text
      )
    ) {

      return text;

    }


    const date =
      new Date(value);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return "";

    }


    return [
      date.getFullYear(),
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        "0"
      ),
      String(
        date.getDate()
      ).padStart(
        2,
        "0"
      )
    ].join("-");

  }


  function collectFormData(
    modal,
    config
  ) {

    const form =
      modal.querySelector(
        "#recordForm"
      );


    const data = {};


    config.fields.forEach(
      field => {

        const element =
          form.elements[
            field.key
          ];


        if (!element) {
          return;
        }


        let value =
          element.value;


        if (
          field.type ===
          "number"
        ) {

          value =
            value === ""
              ? ""
              : Number(value);

        }


        data[field.key] =
          value;

      }
    );


    return data;

  }


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


  /* =========================================================
   * SAVE
   * ========================================================= */

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
        "Action penyimpanan tidak ditemukan: " +
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


  /* =========================================================
   * DELETE
   * ========================================================= */

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
      record?.[idField];


    if (!id) {

      toast(
        "ID data tidak ditemukan."
      );

      return;

    }


    if (
      !window.confirm(
        "Yakin ingin menghapus data " +
        id +
        "?"
      )
    ) {

      return;

    }


    try {

      const result =
        await API.call(
          action,
          {
            id: id
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


      const active =
        document.querySelector(
          "[data-page].active"
        );


      await load(
        active?.dataset?.page ||
        "dashboard"
      );


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


  /* =========================================================
   * REPORTS
   * ========================================================= */

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
            onclick="App.load('attendance')"
          >
            Buka
          </button>

        </div>


        <div class="card">

          <strong>
            Laporan Tagihan
          </strong>

          <p class="muted">
            Rekap tagihan dan
            status pembayaran.
          </p>

          <button
            class="btn btn-dark"
            style="margin-top:10px"
            onclick="App.load('billing')"
          >
            Buka
          </button>

        </div>


        <div class="card">

          <strong>
            Laporan Payroll
          </strong>

          <p class="muted">
            Rekap payroll Sensei.
          </p>

          <button
            class="btn btn-dark"
            style="margin-top:10px"
            onclick="App.load('salary')"
          >
            Buka
          </button>

        </div>

      </div>

    `;

  }


  /* =========================================================
   * SETTINGS
   * ========================================================= */

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


        <div class="field">

          <label>
            API URL
          </label>

          <input
            value="${esc(
              ARIMA_CONFIG.API_URL ||
              ""
            )}"
            readonly
          >

        </div>


        <p class="muted">
          Backend aplikasi menggunakan
          Google Apps Script.
        </p>

      </div>

    `;

  }


  /* =========================================================
   * HELPERS
   * ========================================================= */

  function getResultData(
    result
  ) {

    if (
      result?.status ===
      "fulfilled"
    ) {

      return result.value?.data ||
        {};

    }

    return {};

  }


  function getResultArray(
    result
  ) {

    if (
      result?.status ===
      "fulfilled"
    ) {

      return Array.isArray(
        result.value?.data
      )
        ? result.value.data
        : [];

    }

    return [];

  }


  function numberValue(
    value
  ) {

    if (
      typeof value ===
      "number"
    ) {

      return Number.isFinite(
        value
      )
        ? value
        : 0;

    }


    let text =
      String(
        value ?? ""
      ).trim();


    if (!text) {
      return 0;
    }


    text =
      text.replace(
        /[^\d,.-]/g,
        ""
      );


    if (
      text.includes(",") &&
      text.includes(".")
    ) {

      text =
        text.replace(
          /\./g,
          ""
        ).replace(
          ",",
          "."
        );

    } else if (
      text.includes(".")
    ) {

      const parts =
        text.split(".");


      if (
        parts.length > 2
      ) {

        text =
          text.replace(
            /\./g,
            ""
          );

      }

    } else if (
      text.includes(",")
    ) {

      const parts =
        text.split(",");


      if (
        parts.length === 2 &&
        parts[1].length <= 2
      ) {

        text =
          text.replace(
            ",",
            "."
          );

      } else {

        text =
          text.replace(
            /,/g,
            ""
          );

      }

    }


    const number =
      Number(text);


    return Number.isFinite(
      number
    )
      ? number
      : 0;

  }


  function formatNumber(
    value
  ) {

    return new Intl.NumberFormat(
      "id-ID"
    ).format(
      Number(value) || 0
    );

  }


  function formatCurrency(
    value
  ) {

    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }
    ).format(
      numberValue(value)
    );

  }


  function esc(
    value
  ) {

    return String(
      value ?? ""
    ).replace(
      /[&<>"']/g,
      character => ({
        "&":
          "&amp;",
        "<":
          "&lt;",
        ">":
          "&gt;",
        '"':
          "&quot;",
        "'":
          "&#39;"
      }[character])
    );

  }


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

        <p class="muted">
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


          load(
            active?.dataset?.page ||
            "dashboard"
          );

        }
      );

    }

  }


  function toast(
    message
  ) {

    document
      .querySelectorAll(
        ".toast"
      )
      .forEach(
        element =>
          element.remove()
      );


    const element =
      document.createElement(
        "div"
      );


    element.className =
      "toast";


    element.textContent =
      message;


    document.body.appendChild(
      element
    );


    setTimeout(
      () => {
        element.remove();
      },
      2600
    );

  }


  /* =========================================================
   * PUBLIC API
   * ========================================================= */

  return {

    init,

    load,

    form: (
      type,
      existing = null,
      onSaved = null
    ) => {

      const map = {

        Siswa:
          "students",

        Sensei:
          "sensei",

        Absensi:
          "attendance",

        Tagihan:
          "billing",

        Pembayaran:
          "payments",

        Payroll:
          "salary"

      };


      const normalized =
        map[type] ||
        type;


      openForm(
        normalized,
        existing,
        onSaved
      );

    }

  };

})();
