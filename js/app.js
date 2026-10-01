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
      action: "studentSave",
      deleteAction: "studentDelete",
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
      editTitle: "Edit Sensei",
      action: "senseiSave",
      deleteAction: "senseiDelete",
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
          required: true
        },

        {
          key: "NO_WA",
          label: "No. WhatsApp",
          type: "text"
        },

        {
          key: "EMAIL",
          label: "Email",
          type: "email"
        },

        {
          key: "TARIF_PER_PERTEMUAN",
          label: "Tarif per Pertemuan",
          type: "number"
        },

        {
          key: "TARIF_PER_JAM",
          label: "Tarif per Jam",
          type: "number"
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
      editTitle: "Edit Absensi",
      action: "attendanceSave",
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
          required: true
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
          label: "ID Sesi",
          type: "text"
        },

        {
          key: "CLASS_ID",
          label: "ID Kelas",
          type: "text"
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
          type: "time"
        },

        {
          key: "JAM_KELUAR",
          label: "Jam Keluar",
          type: "time"
        },

        {
          key: "STATUS",
          label: "Status Kehadiran",
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
          type: "textarea"
        }
      ]
    },

    billing: {
      title: "Buat Tagihan",
      editTitle: "Edit Tagihan",
      action: "billingSave",
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
          required: true
        },

        {
          key: "DESCRIPTION",
          label: "Keterangan",
          type: "text",
          required: true
        },

        {
          key: "CATEGORY",
          label: "Kategori",
          type: "select",
          options: [
            "BIAYA BELAJAR",
            "JFT",
            "SSW",
            "JLPT",
            "KEGIATAN",
            "LAINNYA"
          ]
        },

        {
          key: "AMOUNT",
          label: "Jumlah Tagihan",
          type: "number",
          required: true
        },

        {
          key: "DUE_DATE",
          label: "Jatuh Tempo",
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
        },

        {
          key: "NOTES",
          label: "Catatan",
          type: "textarea"
        }
      ]
    },

    payments: {
      title: "Input Pembayaran",
      editTitle: "Edit Pembayaran",
      action: "paymentSave",
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
          type: "text"
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
          label: "Metode",
          type: "select",
          options: [
            "CASH",
            "TRANSFER",
            "QRIS",
            "LAINNYA"
          ]
        },

        {
          key: "REFERENCE_NO",
          label: "No. Referensi",
          type: "text"
        },

        {
          key: "NOTES",
          label: "Catatan",
          type: "textarea"
        }
      ]
    },

    salary: {
      title: "Rekap Payroll Sensei",
      editTitle: "Edit Payroll",
      action: "salarySave",
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
          type: "text",
          required: true,
          placeholder: "Contoh: 2026-10"
        },

        {
          key: "MEETING_COUNT",
          label: "Jumlah Pertemuan",
          type: "number"
        },

        {
          key: "HOUR_COUNT",
          label: "Jumlah Jam",
          type: "number"
        },

        {
          key: "BASE_AMOUNT",
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
          key: "PAYMENT_DATE",
          label: "Tanggal Pembayaran",
          type: "date"
        },

        {
          key: "PAYMENT_STATUS",
          label: "Status Pembayaran",
          type: "select",
          options: [
            "PENDING",
            "DIBAYAR"
          ]
        },

        {
          key: "NOTES",
          label: "Catatan",
          type: "textarea"
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
        () =>
          renderReports(el),

      settings:
        () =>
          renderSettings(el)

    };


    try {

      const renderer =
        map[page] ||
        map.dashboard;

      await renderer();

    } catch (error) {

      console.error(
        "LOAD ERROR:",
        error
      );

      el.innerHTML = `
        <div class="card">

          <div
            style="
              color:#b00020;
              font-weight:700;
              margin-bottom:8px
            "
          >
            Terjadi kesalahan
          </div>

          <div class="muted">
            ${esc(
              error.message ||
              "Gagal memuat data."
            )}
          </div>

        </div>
      `;

    }

  }


  /*
   * =========================================================
   * DASHBOARD
   * =========================================================
   */

  async function renderDashboard() {

    const el =
      document.getElementById("page");

    const result =
      await API.dashboard();

    const d =
      result.data || {};


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


  /*
   * =========================================================
   * CRUD PAGE
   * =========================================================
   */

  async function renderCrudPage(
    el,
    type
  ) {

    const cfg =
      TABLE_CONFIG[type];

    if (!cfg) {

      throw new Error(
        "Konfigurasi halaman tidak ditemukan: " +
        type
      );

    }


    const result =
      await API[cfg.api]();

    const rows =
      Array.isArray(result.data)
        ? result.data
        : [];


    const role =
      String(
        user.role || ""
      ).toUpperCase();


    const canEdit =
      role === "ADMIN" ||
      role === "ADMIN_FINANCE";


    el.innerHTML = `

      <div class="page-title">

        <div>

          <h1>
            ${esc(cfg.title)}
          </h1>

          <p>
            ${esc(cfg.description)}
          </p>

        </div>


        <button
          class="btn btn-primary"
          id="addBtn"
        >
          ${esc(cfg.addLabel)}
        </button>

      </div>


      <div
        class="card"
        style="margin-bottom:16px"
      >

        <div
          style="
            display:flex;
            gap:10px;
            align-items:center;
            flex-wrap:wrap
          "
        >

          <input
            id="tableSearch"
            type="search"
            placeholder="Cari data..."
            style="
              min-width:280px;
              flex:1
            "
          >

          <span
            class="muted"
            id="rowCount"
          >
            ${rows.length} data
          </span>

        </div>

      </div>


      <div id="tableContainer"></div>

    `;


    document
      .getElementById("addBtn")
      .onclick = () => {

        form(type);

      };


    const searchInput =
      document.getElementById(
        "tableSearch"
      );


    function renderFiltered() {

      const q =
        String(
          searchInput.value || ""
        )
          .trim()
          .toLowerCase();


      const filtered =
        !q
          ? rows
          : rows.filter(row =>
              cfg.search.some(
                key =>
                  String(
                    row[key] ?? ""
                  )
                    .toLowerCase()
                    .includes(q)
              )
            );


      document
        .getElementById("rowCount")
        .textContent =
        `${filtered.length} data`;


      document
        .getElementById("tableContainer")
        .innerHTML =
        buildTable(
          filtered,
          cfg.columns,
          type,
          canEdit
        );


      bindTableActions(
        type,
        filtered
      );

    }


    searchInput.addEventListener(
      "input",
      renderFiltered
    );


    renderFiltered();

  }


  /*
   * =========================================================
   * TABLE BUILDER
   * =========================================================
   */

  function buildTable(
    rows,
    columns,
    type,
    canEdit
  ) {

    const showActions =
      canEdit &&
      (
        type === "students" ||
        type === "sensei"
      );


    return `

      <div class="table-wrap">

        <table class="table">

          <thead>

            <tr>

              ${columns
                .map(
                  column =>
                    `<th>${esc(column)}</th>`
                )
                .join("")}

              ${
                showActions
                  ? `
                    <th
                      style="
                        min-width:150px
                      "
                    >
                      AKSI
                    </th>
                  `
                  : ""
              }

            </tr>

          </thead>


          <tbody>

            ${
              rows.length
                ? rows
                    .map(
                      (row, index) => `

                        <tr>

                          ${columns
                            .map(
                              column =>
                                `
                                  <td>
                                    ${formatCell(
                                      column,
                                      row[column]
                                    )}
                                  </td>
                                `
                            )
                            .join("")}


                          ${
                            showActions
                              ? `

                                <td>

                                  <button
                                    type="button"
                                    class="btn btn-light btn-edit"
                                    data-index="${index}"
                                    data-type="${esc(type)}"
                                  >
                                    Edit
                                  </button>


                                  <button
                                    type="button"
                                    class="btn btn-light btn-delete"
                                    data-index="${index}"
                                    data-type="${esc(type)}"
                                  >
                                    Hapus
                                  </button>

                                </td>

                              `
                              : ""
                          }

                        </tr>

                      `
                    )
                    .join("")

                : `

                  <tr>

                    <td
                      colspan="${
                        columns.length +
                        (
                          showActions
                            ? 1
                            : 0
                        )
                      }"
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

  /*
   * =========================================================
   * TABLE ACTIONS
   * =========================================================
   */

  function bindTableActions(type, rows) {

    document
      .querySelectorAll(".btn-edit")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const index =
              Number(
                button.dataset.index
              );

            const row =
              rows[index];

            if (!row) {
              toast(
                "Data tidak ditemukan."
              );
              return;
            }

            form(
              type,
              row
            );

          }
        );

      });


    document
      .querySelectorAll(".btn-delete")
      .forEach(button => {

        button.addEventListener(
          "click",
          async () => {

            const index =
              Number(
                button.dataset.index
              );

            const row =
              rows[index];

            if (!row) {
              toast(
                "Data tidak ditemukan."
              );
              return;
            }


            const cfg =
              TABLE_CONFIG[type];


            const id =
              row[cfg.form
                ? FORM_CONFIG[
                    cfg.form
                  ].idField
                : "ID"];


            if (!id) {

              toast(
                "ID data tidak ditemukan."
              );

              return;

            }


            const confirmed =
              window.confirm(
                `Yakin ingin menghapus data ${id}?`
              );


            if (!confirmed) {
              return;
            }


            try {

              showLoading(
                "Menghapus data..."
              );


              let result;


              if (type === "students") {

                result =
                  await API.call(
                    "studentDelete",
                    {
                      id: id
                    }
                  );

              } else if (
                type === "sensei"
              ) {

                result =
                  await API.call(
                    "senseiDelete",
                    {
                      id: id
                    }
                  );

              } else {

                toast(
                  "Hapus data untuk menu ini belum diaktifkan."
                );

                hideLoading();

                return;

              }


              hideLoading();


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


              await load(
                type
              );


            } catch (error) {

              hideLoading();

              console.error(
                "DELETE ERROR:",
                error
              );


              toast(
                error.message ||
                "Gagal menghapus data."
              );

            }

          }
        );

      });

  }


  /*
   * =========================================================
   * DYNAMIC FORM
   * =========================================================
   */

  function form(
    type,
    existingData = null
  ) {

    /*
     * Support nama lama:
     *
     * App.form("Siswa")
     * App.form("Sensei")
     * App.form("Absensi")
     *
     * sekaligus:
     *
     * App.form("students")
     */

    const aliases = {

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


    type =
      aliases[type] ||
      type;


    const cfg =
      FORM_CONFIG[type];


    if (!cfg) {

      toast(
        "Form tidak ditemukan: " +
        type
      );

      return;

    }


    const modal =
      document.createElement(
        "div"
      );


    modal.className =
      "modal-backdrop";


    const isEdit =
      Boolean(existingData);


    const title =
      isEdit
        ? cfg.editTitle
        : cfg.title;


    modal.innerHTML = `

      <div
        class="modal"
        style="
          max-width:900px;
          width:calc(100% - 30px);
          max-height:90vh;
          overflow:auto;
        "
      >

        <div
          class="section-head"
        >

          <div>

            <h2>
              ${esc(title)}
            </h2>

            <div
              class="muted"
              style="font-size:13px"
            >
              ${
                isEdit
                  ? "Perbarui data."
                  : "Isi data kemudian simpan ke database."
              }
            </div>

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
          id="dynamicForm"
        >

          <div
            class="form-grid"
          >

            ${cfg.fields
              .map(
                field =>
                  renderField(
                    field,
                    existingData
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
              id="cancelModal"
            >
              Batal
            </button>

            <button
              type="submit"
              class="btn btn-primary"
              id="saveModal"
            >
              ${
                isEdit
                  ? "Simpan Perubahan"
                  : "Simpan"
              }
            </button>

          </div>

        </form>

      </div>

    `;


    document.body.appendChild(
      modal
    );


    const close =
      () => modal.remove();


    modal
      .querySelector(
        "#closeModal"
      )
      .onclick = close;


    modal
      .querySelector(
        "#cancelModal"
      )
      .onclick = close;


    const formElement =
      modal.querySelector(
        "#dynamicForm"
      );


    formElement.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const saveButton =
          modal.querySelector(
            "#saveModal"
          );


        try {

          saveButton.disabled =
            true;

          saveButton.textContent =
            "Menyimpan...";


          const payload =
            collectFormData(
              formElement,
              cfg.fields
            );


          validateForm(
            payload,
            cfg.fields
          );


          /*
           * Hitung otomatis payroll
           */

          if (
            type === "salary"
          ) {

            const base =
              numberValue(
                payload.BASE_AMOUNT
              );

            const bonus =
              numberValue(
                payload.BONUS
              );

            const deduction =
              numberValue(
                payload.DEDUCTION
              );


            payload.NET_SALARY =
              base +
              bonus -
              deduction;


            const netInput =
              formElement.querySelector(
                '[name="NET_SALARY"]'
              );


            if (netInput) {

              netInput.value =
                payload.NET_SALARY;

            }

          }


          let result;


          /*
           * Endpoint backend
           */

          if (
            type === "students"
          ) {

            result =
              await API.call(
                "studentSave",
                payload
              );

          } else if (
            type === "sensei"
          ) {

            result =
              await API.call(
                "senseiSave",
                payload
              );

          } else if (
            type === "attendance"
          ) {

            result =
              await API.call(
                "attendanceSave",
                payload
              );

          } else if (
            type === "billing"
          ) {

            result =
              await API.call(
                "billingSave",
                payload
              );

          } else if (
            type === "payments"
          ) {

            result =
              await API.call(
                "paymentSave",
                payload
              );

          } else if (
            type === "salary"
          ) {

            result =
              await API.call(
                "salarySave",
                payload
              );

          } else {

            throw new Error(
              "Endpoint tidak tersedia."
            );

          }


          if (
            !result ||
            result.success !== true
          ) {

            throw new Error(
              result?.message ||
              "Data gagal disimpan."
            );

          }


          close();


          toast(
            result.message ||
            "Data berhasil disimpan."
          );


          /*
           * Refresh halaman
           */

          const pageMap = {

            students:
              "students",

            sensei:
              "sensei",

            attendance:
              "attendance",

            billing:
              "billing",

            payments:
              "payments",

            salary:
              "salary"

          };


          await load(
            pageMap[type]
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


          saveButton.disabled =
            false;

          saveButton.textContent =
            isEdit
              ? "Simpan Perubahan"
              : "Simpan";

        }

      });

  }


  /*
   * =========================================================
   * FIELD RENDERER
   * =========================================================
   */

  function renderField(
    field,
    existingData
  ) {

    const value =
      existingData
        ? existingData[field.key] ?? ""
        : "";


    const required =
      field.required
        ? "required"
        : "";


    const placeholder =
      field.placeholder
        ? `placeholder="${esc(
            field.placeholder
          )}"`
        : "";


    const full =
      field.type === "textarea"
        ? "full"
        : "";


    let input = "";


    if (
      field.type === "select"
    ) {

      input = `

        <select
          name="${esc(field.key)}"
          ${required}
        >

          <option value="">
            -- Pilih --
          </option>

          ${(
            field.options || []
          )
            .map(
              option => `

                <option
                  value="${esc(option)}"
                  ${
                    String(value)
                      .toUpperCase() ===
                    String(option)
                      .toUpperCase()
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
      field.type === "textarea"
    ) {

      input = `

        <textarea
          name="${esc(field.key)}"
          rows="4"
          ${required}
          ${placeholder}
        >${esc(value)}</textarea>

      `;

    } else {

      input = `

        <input
          type="${esc(
            field.type || "text"
          )}"
          name="${esc(field.key)}"
          value="${esc(value)}"
          ${required}
          ${placeholder}
        >

      `;

    }


    return `

      <div
        class="field ${full}"
      >

        <label>

          ${esc(field.label)}

          ${
            field.required
              ? `<span
                  style="
                    color:#b00020
                  "
                >
                  *
                </span>`
              : ""
          }

        </label>

        ${input}

      </div>

    `;

  }


  /*
   * =========================================================
   * COLLECT FORM DATA
   * =========================================================
   */

  function collectFormData(
    formElement,
    fields
  ) {

    const payload = {};


    fields.forEach(
      field => {

        const input =
          formElement.querySelector(
            `[name="${CSS.escape(
              field.key
            )}"]`
          );


        if (!input) {
          return;
        }


        let value =
          input.value;


        /*
         * Number
         */

        if (
          field.type === "number"
        ) {

          value =
            value === ""
              ? ""
              : Number(value);

        }


        payload[field.key] =
          value;

      }
    );


    return payload;

  }


  /*
   * =========================================================
   * FORM VALIDATION
   * =========================================================
   */

  function validateForm(
    payload,
    fields
  ) {

    const missing =
      fields
        .filter(
          field =>
            field.required &&
            (
              payload[field.key] ===
                undefined ||
              payload[field.key] ===
                null ||
              String(
                payload[field.key]
              ).trim() === ""
            )
        )
        .map(
          field =>
            field.label
        );


    if (
      missing.length
    ) {

      throw new Error(
        "Field wajib belum diisi: " +
        missing.join(", ")
      );

    }

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
            data-report="attendance"
          >
            Buka
          </button>

        </div>


        <div class="card">

          <strong>
            Laporan Tagihan
          </strong>

          <p class="muted">
            Rekap tagihan dan pembayaran.
          </p>

          <button
            class="btn btn-dark"
            data-report="billing"
          >
            Buka
          </button>

        </div>


        <div class="card">

          <strong>
            Laporan Payroll
          </strong>

          <p class="muted">
            Rekap payroll sensei.
          </p>

          <button
            class="btn btn-dark"
            data-report="salary"
          >
            Buka
          </button>

        </div>

      </div>

    `;


    el
      .querySelectorAll(
        "[data-report]"
      )
      .forEach(
        button => {

          button.onclick =
            () => {

              const report =
                button.dataset.report;


              toast(
                "Laporan " +
                report +
                " akan dikembangkan pada modul laporan."
              );

            };

        }
      );

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


        <div
          class="field"
          style="margin-top:15px"
        >

          <label>
            Apps Script API
          </label>

          <input
            value="${esc(
              ARIMA_CONFIG.API_URL ||
              ""
            )}"
            readonly
          >

        </div>


        <p
          class="muted"
          style="margin-top:15px"
        >
          Database menggunakan Google Spreadsheet
          dan backend Google Apps Script.
        </p>

      </div>

    `;

  }


  /*
   * =========================================================
   * FORMAT CELL
   * =========================================================
   */

  function formatCell(
    key,
    value
  ) {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {

      return `
        <span class="muted">
          —
        </span>
      `;

    }


    /*
     * Format nominal
     */

    const moneyFields = [

      "AMOUNT",
      "BASE_AMOUNT",
      "BONUS",
      "DEDUCTION",
      "NET_SALARY",
      "TARIF_PER_PERTEMUAN",
      "TARIF_PER_JAM"

    ];


    if (
      moneyFields.includes(
        key
      )
    ) {

      const number =
        Number(value);


      if (
        Number.isFinite(
          number
        )
      ) {

        return esc(
          formatRupiah(
            number
          )
        );

      }

    }


    /*
     * Status
     */

    if (
      key === "STATUS" ||
      key === "PAYMENT_STATUS"
    ) {

      return `
        <span
          style="
            font-weight:600
          "
        >
          ${esc(value)}
        </span>
      `;

    }


    return esc(value);

  }


  /*
   * =========================================================
   * UTILITIES
   * =========================================================
   */

  function esc(value) {

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

      })[character]
    );

  }


  function numberValue(
    value
  ) {

    const number =
      Number(value);


    return Number.isFinite(
      number
    )
      ? number
      : 0;

  }


  function formatRupiah(
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
      Number(value) || 0
    );

  }


  function showLoading(
    message = "Memproses..."
  ) {

    let overlay =
      document.getElementById(
        "arima-loading"
      );


    if (!overlay) {

      overlay =
        document.createElement(
          "div"
        );

      overlay.id =
        "arima-loading";

      overlay.style.cssText = `
        position:fixed;
        inset:0;
        z-index:99999;
        background:rgba(0,0,0,.45);
        display:flex;
        align-items:center;
        justify-content:center;
      `;


      overlay.innerHTML = `

        <div
          style="
            background:#fff;
            padding:22px 28px;
            border-radius:12px;
            box-shadow:0 10px 40px rgba(0,0,0,.2);
            font-weight:600;
          "
        >
          <span
            id="arima-loading-text"
          >
            ${esc(message)}
          </span>
        </div>

      `;


      document.body.appendChild(
        overlay
      );

    }


    const text =
      document.getElementById(
        "arima-loading-text"
      );


    if (text) {
      text.textContent =
        message;
    }

  }


  function hideLoading() {

    const overlay =
      document.getElementById(
        "arima-loading"
      );


    if (overlay) {
      overlay.remove();
    }

  }


  function toast(
    message
  ) {

    let container =
      document.getElementById(
        "arima-toast-container"
      );


    if (!container) {

      container =
        document.createElement(
          "div"
        );

      container.id =
        "arima-toast-container";

      container.style.cssText = `
        position:fixed;
        right:20px;
        bottom:20px;
        z-index:100000;
        display:flex;
        flex-direction:column;
        gap:10px;
      `;

      document.body.appendChild(
        container
      );

    }


    const item =
      document.createElement(
        "div"
      );


    item.style.cssText = `
      background:#111;
      color:#fff;
      padding:12px 16px;
      border-radius:9px;
      box-shadow:0 8px 30px rgba(0,0,0,.2);
      max-width:360px;
      font-size:14px;
    `;


    item.textContent =
      message;


    container.appendChild(
      item
    );


    setTimeout(
      () => {

        item.remove();

      },
      3000
    );

  }


  /*
   * =========================================================
   * PUBLIC API
   * =========================================================
   */

  return {

    init,

    load,

    form,

    toast

  };

})();
              
