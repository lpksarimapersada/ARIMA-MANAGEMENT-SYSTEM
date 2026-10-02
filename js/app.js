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
          placeholder: "ID aktor"
        },

        {
          key: "ACTOR_TYPE",
          label: "Tipe Aktor",
          type: "select",
          required: true,
          options: [
            "STUDENT",
            "SENSEI"
          ]
        },

        {
          key: "SESSION_ID",
          label: "Session ID",
          type: "text",
          required: false,
          placeholder: "Session ID"
        },

        {
          key: "CLASS_ID",
          label: "Class ID",
          type: "text",
          required: false,
          placeholder: "Class ID"
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

      title: "Tambah Tagihan",

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
          required: true
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
            "BELAJAR",
            "ASRAMA",
            "JOB",
            "LAINNYA"
          ]
        },

        {
          key: "AMOUNT",
          label: "Jumlah",
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
            "BELUM BAYAR",
            "BELUM LUNAS",
            "LUNAS",
            "TERTUNGGAK",
            "CICILAN"
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

      title: "Tambah Pembayaran",

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
          label: "No. Referensi",
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

      title: "Payroll Sensei",

      editTitle: "Edit Payroll",

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
          required: false
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
            "DIBAYAR",
            "LUNAS"
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
   * UTILITIES
   * =========================================================
   */

  function esc(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function formatNumber(value) {

    const number = Number(value || 0);

    return new Intl.NumberFormat(
      "id-ID"
    ).format(
      Number.isFinite(number)
        ? number
        : 0
    );

  }


  function formatRupiah(value) {

    const number = Number(value || 0);

    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }
    ).format(
      Number.isFinite(number)
        ? number
        : 0
    );

  }


  function renderError(
    el,
    error
  ) {

    console.error(
      "ARIMA APP ERROR:",
      error
    );

    el.innerHTML = `

      <div class="card">

        <h3>
          Terjadi kesalahan
        </h3>

        <p class="muted">
          ${esc(
            error?.message ||
            error ||
            "Terjadi kesalahan pada aplikasi."
          )}
        </p>

      </div>

    `;

  }


  function showToast(
    message,
    type = "success"
  ) {

    let toast =
      document.getElementById(
        "arima-toast"
      );

    if (!toast) {

      toast =
        document.createElement(
          "div"
        );

      toast.id =
        "arima-toast";

      toast.style.position =
        "fixed";

      toast.style.right =
        "24px";

      toast.style.bottom =
        "24px";

      toast.style.zIndex =
        "99999";

      toast.style.padding =
        "14px 18px";

      toast.style.borderRadius =
        "10px";

      toast.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.18)";

      toast.style.background =
        "#111827";

      toast.style.color =
        "#fff";

      toast.style.fontSize =
        "14px";

      document.body.appendChild(
        toast
      );

    }

    toast.textContent =
      message;

    toast.dataset.type =
      type;

    clearTimeout(
      toast._timer
    );

    toast._timer =
      setTimeout(() => {

        toast.remove();

      }, 3000);

  }


  function qs(
    selector,
    root = document
  ) {

    return root.querySelector(
      selector
    );

  }


  function qsa(
    selector,
    root = document
  ) {

    return Array.from(
      root.querySelectorAll(
        selector
      )
    );

  }


  function getAppRoot() {

    return (
      document.getElementById(
        "app"
      ) ||
      document.getElementById(
        "app-root"
      ) ||
      document.querySelector(
        "main"
      ) ||
      document.body
    );

  }


  function getContentRoot() {

    return (
      document.getElementById(
        "page-content"
      ) ||
      document.getElementById(
        "content"
      ) ||
      document.getElementById(
        "app-content"
      ) ||
      document.querySelector(
        ".page-content"
      ) ||
      getAppRoot()
    );

  }


  /*
   * =========================================================
   * AUTH
   * =========================================================
   */

  function getStoredUser() {

    try {

      // Prefer the shared Auth module.
      if (
        window.Auth &&
        typeof window.Auth.current === "function"
      ) {

        const current =
          window.Auth.current();

        if (current) {
          return current;
        }

      }

      // Fallback for compatibility with older builds.
      const keys = [
        "arima_session",
        "ARIMA_USER",
        "ARIMA_SESSION"
      ];

      for (const key of keys) {

        const raw =
          localStorage.getItem(key);

        if (!raw) {
          continue;
        }

        const parsed =
          JSON.parse(raw);

        if (parsed && typeof parsed === "object") {
          return parsed;
        }

      }

      return null;

    } catch (error) {

      console.warn(
        "Gagal membaca user/session:",
        error
      );

      return null;

    }

  }


  function requireAuth() {

    const currentUser =
      getStoredUser();

    if (!currentUser) {

      console.warn(
        "ARIMA: session tidak ditemukan. Mengarahkan ke login."
      );

      window.location.replace(
        "login.html"
      );

      return null;

    }

    user =
      currentUser;

    // Keep both session keys synchronized so an old cached
    // page cannot accidentally log the user out.
    try {

      const value =
        JSON.stringify(
          currentUser
        );

      localStorage.setItem(
        "arima_session",
        value
      );

      localStorage.setItem(
        "ARIMA_USER",
        value
      );

    } catch (error) {

      console.warn(
        "Gagal menyinkronkan session:",
        error
      );

    }

    return currentUser;

  }


  function logout() {

    try {

      if (
        window.Auth &&
        typeof window.Auth.logout === "function"
      ) {

        window.Auth.logout();
        return;

      }

      localStorage.removeItem(
        "arima_session"
      );

      localStorage.removeItem(
        "ARIMA_USER"
      );

      localStorage.removeItem(
        "ARIMA_SESSION"
      );

      localStorage.removeItem(
        "ARIMA_TOKEN"
      );

      sessionStorage.removeItem(
        "ARIMA_TOKEN"
      );

    } catch (error) {

      console.warn(
        "Logout error:",
        error
      );

    }

    window.location.replace(
      "login.html"
    );

  }


  /*
   * =========================================================
   * LAYOUT
   * =========================================================
   */

  function renderLayout() {

    const root =
      getAppRoot();

    if (!root) {
      return;
    }

    root.innerHTML = `

      <div class="arima-layout">

        <aside
          class="sidebar"
          id="arima-sidebar"
        >

          <div class="sidebar-brand">

            <div class="brand-title">
              ARIMA
            </div>

            <div class="brand-subtitle">
              MANAGEMENT SYSTEM
            </div>

          </div>


          <nav
            class="sidebar-nav"
            id="arima-menu"
          >

            ${menus.map(
              menu => `

                <button
                  type="button"
                  class="nav-item"
                  data-page="${esc(menu[0])}"
                >

                  <span class="nav-icon">
                    ${menu[2]}
                  </span>

                  <span>
                    ${esc(menu[1])}
                  </span>

                </button>

              `
            ).join("")}

          </nav>


          <div class="sidebar-footer">

            <button
              type="button"
              id="btn-logout"
              class="nav-item logout-button"
            >

              <span class="nav-icon">
                ⇥
              </span>

              <span>
                Keluar
              </span>

            </button>

          </div>

        </aside>


        <section
          class="main-area"
        >

          <header
            class="topbar"
          >

            <div>

              <button
                type="button"
                id="btn-sidebar"
                class="icon-button"
                aria-label="Menu"
              >
                ☰
              </button>

            </div>


            <div
              class="topbar-user"
            >

              <span
                id="topbar-user-name"
              >
                ${esc(
                  user?.name ||
                  user?.NAME ||
                  ""
                )}
              </span>

            </div>

          </header>


          <main
            id="page-content"
            class="page-content"
          >

            <div class="card">
              Memuat aplikasi...
            </div>

          </main>

        </section>

      </div>

    `;


    const menu =
      qs(
        "#arima-menu"
      );

    if (menu) {

      menu.addEventListener(
        "click",
        event => {

          const button =
            event.target.closest(
              "[data-page]"
            );

          if (!button) {
            return;
          }

          const page =
            button.dataset.page;

          load(page);

        }
      );

    }


    const logoutButton =
      qs(
        "#btn-logout"
      );

    if (logoutButton) {

      logoutButton.addEventListener(
        "click",
        logout
      );

    }


    const sidebarButton =
      qs(
        "#btn-sidebar"
      );

    if (sidebarButton) {

      sidebarButton.addEventListener(
        "click",
        () => {

          const sidebar =
            qs(
              "#arima-sidebar"
            );

          if (sidebar) {

            sidebar.classList.toggle(
              "collapsed"
            );

          }

        }
      );

    }

  }


  function setActiveMenu(
    page
  ) {

    qsa(
      "[data-page]"
    ).forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.page === page
        );

      }
    );

  }


  /*
   * =========================================================
   * PAGE LOAD
   * =========================================================
   */

  async function load(
    page
  ) {

    const el =
      getContentRoot();

    if (!el) {
      return;
    }

    setActiveMenu(
      page
    );

    el.innerHTML = `

      <div class="card">

        <div class="muted">
          Memuat...
        </div>

      </div>

    `;


    try {

      switch (
        String(page || "")
          .toLowerCase()
      ) {

        case "dashboard":

          await renderDashboard(
            el
          );

          break;


        case "students":

          await renderStudents(
            el
          );

          break;


        case "sensei":

          await renderSensei(
            el
          );

          break;


        case "attendance":

          await renderAttendance(
            el
          );

          break;


        case "billing":

          await renderBilling(
            el
          );

          break;


        case "payments":

          await renderPayments(
            el
          );

          break;


        case "salary":

          await renderSalary(
            el
          );

          break;


        case "reports":

          await renderReports(
            el
          );

          break;


        case "settings":

          await renderSettings(
            el
          );

          break;


        default:

          await renderDashboard(
            el
          );

          break;

      }

    } catch (error) {

      renderError(
        el,
        error
      );

    }

  }


  /*
   * =========================================================
   * DASHBOARD
   * =========================================================
   */

  async function renderDashboard(
    el
  ) {

    try {

      const [response, studentsResponse, senseiResponse] =
        await Promise.all([
          API.dashboard(),
          API.students(),
          API.sensei()
        ]);

      const data =
        response?.data || {};
      const students =
        Array.isArray(studentsResponse?.data)
          ? studentsResponse.data
          : [];
      const sensei =
        Array.isArray(senseiResponse?.data)
          ? senseiResponse.data
          : [];


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

          <div class="card">

            <div class="muted">
              Siswa Aktif
            </div>

            <div class="metric">
              ${formatNumber(
                data.students
              )}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Sensei Aktif
            </div>

            <div class="metric">
              ${formatNumber(
                data.sensei
              )}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Kehadiran
            </div>

            <div class="metric">
              ${formatNumber(
                data.attendance
              )}%
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Tagihan Pending
            </div>

            <div class="metric">
              ${formatNumber(
                data.pendingBilling
              )}
            </div>

          </div>

        </div>


        <div class="section">

          <div class="card">

            <h2>Data Siswa (${formatNumber(students.length)})</h2>

            ${renderTable(
              students,
              [
                { key: "ID_SISWA", label: "ID" },
                { key: "NAMA", label: "Nama" },
                { key: "NIK", label: "NIK" },
                { key: "NO_WA", label: "WhatsApp" },
                { key: "PROGRAM", label: "Program" },
                { key: "ASRAMA", label: "Asrama" },
                { key: "STATUS", label: "Status" }
              ],
              { emptyText: "Belum ada data siswa." }
            )}

          </div>

        </div>


        <div class="section">

          <div class="card">

            <h2>Data Sensei (${formatNumber(sensei.length)})</h2>

            ${renderTable(
              sensei,
              [
                { key: "ID_SENSEI", label: "ID" },
                { key: "NAMA", label: "Nama" },
                { key: "NO_WA", label: "WhatsApp" },
                { key: "EMAIL", label: "Email" },
                {
                  key: "TARIF_PER_PERTEMUAN",
                  label: "Tarif / Pertemuan",
                  render: value => formatRupiah(value)
                },
                { key: "STATUS", label: "Status" }
              ],
              { emptyText: "Belum ada data sensei." }
            )}

          </div>

        </div>


        <div class="section">

          <div class="card">

            <strong>
              Selamat datang,
              ${esc(
                user?.name ||
                user?.NAME ||
                "User"
              )}
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
   * GENERIC TABLE
   * =========================================================
   */

  function renderTable(
    rows,
    columns,
    options = {}
  ) {

    const data =
      Array.isArray(rows)
        ? rows
        : [];

    const emptyText =
      options.emptyText ||
      "Belum ada data.";

    if (!data.length) {

      return `

        <div class="card">

          <div class="muted">
            ${esc(emptyText)}
          </div>

        </div>

      `;

    }


    return `

      <div class="table-wrap">

        <table class="data-table">

          <thead>

            <tr>

              ${columns.map(
                column => `

                  <th>
                    ${esc(
                      column.label ||
                      column.key
                    )}
                  </th>

                `
              ).join("")}

              ${
                options.actions
                  ? "<th>Aksi</th>"
                  : ""
              }

            </tr>

          </thead>


          <tbody>

            ${data.map(
              (row, index) => `

                <tr>

                  ${columns.map(
                    column => {

                      let value =
                        row[
                          column.key
                        ];

                      if (
                        typeof column.render ===
                        "function"
                      ) {

                        value =
                          column.render(
                            value,
                            row,
                            index
                          );

                      }

                      return `

                        <td>
                          ${
                            value === null ||
                            value === undefined
                              ? ""
                              : value
                          }
                        </td>

                      `;

                    }
                  ).join("")}


                  ${
                    options.actions
                      ? `

                        <td>

                          <div
                            class="table-actions"
                          >

                            ${
                              options.actions(
                                row,
                                index
                              )
                            }

                          </div>

                        </td>

                      `
                      : ""
                  }

                </tr>

              `
            ).join("")}

          </tbody>

        </table>

      </div>

    `;

  }


  /*
   * =========================================================
   * PAGE HEADER
   * =========================================================
   */

  function pageHeader(
    title,
    description,
    buttonText = "",
    buttonId = ""
  ) {

    return `

      <div class="page-title">

        <div>

          <h1>
            ${esc(title)}
          </h1>

          ${
            description
              ? `

                <p>
                  ${esc(description)}
                </p>

              `
              : ""
          }

        </div>


        ${
          buttonText
            ? `

              <button
                type="button"
                class="btn btn-primary"
                id="${esc(buttonId)}"
              >

                + ${esc(buttonText)}

              </button>

            `
            : ""
        }

      </div>

    `;

  }


  /*
   * =========================================================
   * STUDENTS
   * =========================================================
   */

  async function renderStudents(
    el
  ) {

    try {

      const response =
        await API.students();

      const rows =
        response?.data || [];


      el.innerHTML = `

        ${pageHeader(
          "Data Siswa",
          "Kelola data siswa LPKS Arima Persada.",
          "Tambah Siswa",
          "btn-add-student"
        )}


        <div class="card">

          ${renderTable(
            rows,
            [
              {
                key: "ID_SISWA",
                label: "ID"
              },

              {
                key: "NAMA",
                label: "Nama"
              },

              {
                key: "NIK",
                label: "NIK"
              },

              {
                key: "NO_WA",
                label: "WhatsApp"
              },

              {
                key: "PROGRAM",
                label: "Program"
              },

              {
                key: "ASRAMA",
                label: "Asrama"
              },

              {
                key: "STATUS",
                label: "Status"
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-small"
                  data-edit-student="${esc(
                    row.ID_SISWA
                  )}"
                  data-row-number="${esc(row.__ROW_NUMBER || '')}"
                >
                  Edit
                </button>

                <button
                  type="button"
                  class="btn btn-small btn-danger"
                  data-delete-student="${esc(
                    row.ID_SISWA
                  )}"
                  data-row-number="${esc(row.__ROW_NUMBER || '')}"
                >
                  Hapus
                </button>

              `
            }
          )}

        </div>

      `;


      const addButton =
        qs(
          "#btn-add-student"
        );

      if (addButton) {

        addButton.addEventListener(
          "click",
          () => {

            openFormModal(
              "students"
            );

          }
        );

      }


      qsa(
        "[data-edit-student]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const id =
                button.dataset
                  .editStudent;
              const rowNumber = button.dataset.rowNumber;

              const row =
                rows.find(
                  item => rowNumber &&
                    String(item.__ROW_NUMBER) === String(rowNumber)
                ) || rows.find(
                  item =>
                    String(
                      item.ID_SISWA
                    ) === String(id)
                );

              if (row) {

                openFormModal(
                  "students",
                  row
                );

              }

            }
          );

        }
      );


      qsa(
        "[data-delete-student]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            async () => {

              const id =
                button.dataset
                  .deleteStudent;

              if (
                !confirm(
                  "Hapus data siswa ini?"
                )
              ) {
                return;
              }

              try {

                const response = await API.delete(
                  "students",
                  {
                    ID_SISWA: id,
                    __ROW_NUMBER: button.dataset.rowNumber
                  }
                );
                if (response?.success === false) {
                  throw new Error(response.message || "Gagal menghapus data siswa.");
                }

                showToast(
                  "Data siswa berhasil dihapus."
                );

                await renderStudents(
                  el
                );

              } catch (error) {

                showToast(
                  error.message ||
                  "Gagal menghapus data.",
                  "error"
                );

              }

            }
          );

        }
      );

    } catch (error) {

      renderError(
        el,
        error
      );

    }

  }


  /*
   * =========================================================
   * SENSEI
   * =========================================================
   */

  async function renderSensei(
    el
  ) {

    try {

      const response =
        await API.sensei();

      const rows =
        response?.data || [];


      el.innerHTML = `

        ${pageHeader(
          "Data Sensei",
          "Kelola data pengajar LPKS Arima Persada.",
          "Tambah Sensei",
          "btn-add-sensei"
        )}


        <div class="card">

          ${renderTable(
            rows,
            [
              {
                key: "ID_SENSEI",
                label: "ID"
              },

              {
                key: "NAMA",
                label: "Nama"
              },

              {
                key: "NO_WA",
                label: "WhatsApp"
              },

              {
                key: "EMAIL",
                label: "Email"
              },

              {
                key: "TARIF_PER_PERTEMUAN",
                label: "Tarif / Pertemuan",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "TARIF_PER_JAM",
                label: "Tarif / Jam",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "STATUS",
                label: "Status"
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-small"
                  data-edit-sensei="${esc(
                    row.ID_SENSEI
                  )}"
                  data-row-number="${esc(row.__ROW_NUMBER || '')}"
                >
                  Edit
                </button>

                <button
                  type="button"
                  class="btn btn-small btn-danger"
                  data-delete-sensei="${esc(
                    row.ID_SENSEI
                  )}"
                  data-row-number="${esc(row.__ROW_NUMBER || '')}"
                >
                  Hapus
                </button>

              `
            }
          )}

        </div>

      `;


      const addButton =
        qs(
          "#btn-add-sensei"
        );

      if (addButton) {

        addButton.addEventListener(
          "click",
          () => {

            openFormModal(
              "sensei"
            );

          }
        );

      }


      qsa(
        "[data-edit-sensei]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const id =
                button.dataset
                  .editSensei;
              const rowNumber = button.dataset.rowNumber;

              const row =
                rows.find(
                  item => rowNumber &&
                    String(item.__ROW_NUMBER) === String(rowNumber)
                ) || rows.find(
                  item =>
                    String(
                      item.ID_SENSEI
                    ) === String(id)
                );

              if (row) {

                openFormModal(
                  "sensei",
                  row
                );

              }

            }
          );

        }
      );


      qsa(
        "[data-delete-sensei]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            async () => {

              const id =
                button.dataset
                  .deleteSensei;

              if (
                !confirm(
                  "Hapus data sensei ini?"
                )
              ) {
                return;
              }

              try {

                const response = await API.delete(
                  "sensei",
                  {
                    ID_SENSEI: id,
                    __ROW_NUMBER: button.dataset.rowNumber
                  }
                );
                if (response?.success === false) {
                  throw new Error(response.message || "Gagal menghapus data sensei.");
                }

                showToast(
                  "Data sensei berhasil dihapus."
                );

                await renderSensei(
                  el
                );

              } catch (error) {

                showToast(
                  error.message ||
                  "Gagal menghapus data.",
                  "error"
                );

              }

            }
          );

        }
      );

    } catch (error) {

      renderError(
        el,
        error
      );

    }

  }


  /*
   * =========================================================
   * ATTENDANCE
   * =========================================================
   */

  async function renderAttendance(
    el
  ) {

    try {

      const response =
        await API.attendance();

      const rows =
        response?.data || [];


      el.innerHTML = `

        ${pageHeader(
          "Absensi",
          "Kelola data kehadiran siswa dan sensei.",
          "Catat Absensi",
          "btn-add-attendance"
        )}


        <div class="card">

          ${renderTable(
            rows,
            [
              {
                key: "ATTENDANCE_ID",
                label: "ID"
              },

              {
                key: "ACTOR_ID",
                label: "ID Aktor"
              },

              {
                key: "ACTOR_TYPE",
                label: "Tipe"
              },

              {
                key: "SESSION_ID",
                label: "Session"
              },

              {
                key: "TANGGAL",
                label: "Tanggal"
              },

              {
                key: "JAM_MASUK",
                label: "Masuk"
              },

              {
                key: "JAM_KELUAR",
                label: "Keluar"
              },

              {
                key: "STATUS",
                label: "Status"
              },

              {
                key: "CATATAN",
                label: "Catatan"
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-small"
                  data-edit-attendance="${esc(
                    row.ATTENDANCE_ID
                  )}"
                >
                  Edit
                </button>

              `
            }
          )}

        </div>

      `;


      const addButton =
        qs(
          "#btn-add-attendance"
        );

      if (addButton) {

        addButton.addEventListener(
          "click",
          () => {

            openFormModal(
              "attendance"
            );

          }
        );

      }


      qsa(
        "[data-edit-attendance]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const id =
                button.dataset
                  .editAttendance;

              const row =
                rows.find(
                  item =>
                    String(
                      item.ATTENDANCE_ID
                    ) === String(id)
                );

              if (row) {

                openFormModal(
                  "attendance",
                  row
                );

              }

            }
          );

        }
      );

    } catch (error) {

      renderError(
        el,
        error
      );

    }

  }


  /*
   * =========================================================
   * BILLING
   * =========================================================
   */

  async function renderBilling(
    el
  ) {

    try {

      const response =
        await API.billing();

      const rows =
        response?.data || [];


      el.innerHTML = `

        ${pageHeader(
          "Tagihan",
          "Kelola tagihan siswa.",
          "Tambah Tagihan",
          "btn-add-billing"
        )}


        <div class="card">

          ${renderTable(
            rows,
            [
              {
                key: "BILLING_ID",
                label: "ID"
              },

              {
                key: "ID_SISWA",
                label: "ID Siswa"
              },

              {
                key: "DESCRIPTION",
                label: "Deskripsi"
              },

              {
                key: "CATEGORY",
                label: "Kategori"
              },

              {
                key: "AMOUNT",
                label: "Jumlah",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "DUE_DATE",
                label: "Jatuh Tempo"
              },

              {
                key: "STATUS",
                label: "Status"
              },

              {
                key: "NOTES",
                label: "Catatan"
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-small"
                  data-edit-billing="${esc(
                    row.BILLING_ID
                  )}"
                >
                  Edit
                </button>

              `
            }
          )}

        </div>

      `;


      const addButton =
        qs(
          "#btn-add-billing"
        );

      if (addButton) {

        addButton.addEventListener(
          "click",
          () => {

            openFormModal(
              "billing"
            );

          }
        );

      }


      qsa(
        "[data-edit-billing]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const id =
                button.dataset
                  .editBilling;

              const row =
                rows.find(
                  item =>
                    String(
                      item.BILLING_ID
                    ) === String(id)
                );

              if (row) {

                openFormModal(
                  "billing",
                  row
                );

              }

            }
          );

        }
      );

    } catch (error) {

      renderError(
        el,
        error
      );

    }

  }


  /*
   * =========================================================
   * PAYMENTS
   * =========================================================
   */

  async function renderPayments(
    el
  ) {

    try {

      const response =
        await API.payments();

      const rows =
        response?.data || [];


      el.innerHTML = `

        ${pageHeader(
          "Pembayaran",
          "Kelola pembayaran siswa.",
          "Tambah Pembayaran",
          "btn-add-payment"
        )}


        <div class="card">

          ${renderTable(
            rows,
            [
              {
                key: "PAYMENT_ID",
                label: "ID"
              },

              {
                key: "BILLING_ID",
                label: "ID Tagihan"
              },

              {
                key: "ID_SISWA",
                label: "ID Siswa"
              },

              {
                key: "PAYMENT_DATE",
                label: "Tanggal"
              },

              {
                key: "AMOUNT",
                label: "Jumlah",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "PAYMENT_METHOD",
                label: "Metode"
              },

              {
                key: "REFERENCE_NO",
                label: "Referensi"
              },

              {
                key: "NOTES",
                label: "Catatan"
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-small"
                  data-edit-payment="${esc(
                    row.PAYMENT_ID
                  )}"
                >
                  Edit
                </button>

              `
            }
          )}

        </div>

      `;


      const addButton =
        qs(
          "#btn-add-payment"
        );

      if (addButton) {

        addButton.addEventListener(
          "click",
          () => {

            openFormModal(
              "payments"
            );

          }
        );

      }


      qsa(
        "[data-edit-payment]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const id =
                button.dataset
                  .editPayment;

              const row =
                rows.find(
                  item =>
                    String(
                      item.PAYMENT_ID
                    ) === String(id)
                );

              if (row) {

                openFormModal(
                  "payments",
                  row
                );

              }

            }
          );

        }
      );

    } catch (error) {

      renderError(
        el,
        error
      );

    }

  }


  /*
   * =========================================================
   * SALARY
   * =========================================================
   */

  async function renderSalary(
    el
  ) {

    try {

      const response =
        await API.salary();

      const rows =
        response?.data || [];


      el.innerHTML = `

        ${pageHeader(
          "Payroll Sensei",
          "Kelola pembayaran honor sensei.",
          "Tambah Payroll",
          "btn-add-salary"
        )}


        <div class="card">

          ${renderTable(
            rows,
            [
              {
                key: "SALARY_ID",
                label: "ID"
              },

              {
                key: "ID_SENSEI",
                label: "ID Sensei"
              },

              {
                key: "PERIOD",
                label: "Periode"
              },

              {
                key: "MEETING_COUNT",
                label: "Pertemuan"
              },

              {
                key: "HOUR_COUNT",
                label: "Jam"
              },

              {
                key: "BASE_AMOUNT",
                label: "Gaji Pokok",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "BONUS",
                label: "Bonus",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "DEDUCTION",
                label: "Potongan",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "NET_SALARY",
                label: "Gaji Bersih",
                render: value =>
                  formatRupiah(value)
              },

              {
                key: "PAYMENT_STATUS",
                label: "Status"
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-small"
                  data-edit-salary="${esc(
                    row.SALARY_ID
                  )}"
                >
                  Edit
                </button>

              `
            }
          )}

        </div>

      `;


      const addButton =
        qs(
          "#btn-add-salary"
        );

      if (addButton) {

        addButton.addEventListener(
          "click",
          () => {

            openFormModal(
              "salary"
            );

          }
        );

      }


      qsa(
        "[data-edit-salary]"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const id =
                button.dataset
                  .editSalary;

              const row =
                rows.find(
                  item =>
                    String(
                      item.SALARY_ID
                    ) === String(id)
                );

              if (row) {

                openFormModal(
                  "salary",
                  row
                );

              }

            }
          );

        }
      );

    } catch (error) {

      renderError(
        el,
        error
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

    try {

      const response =
        await API.dashboard();

      const data =
        response?.data || {};


      el.innerHTML = `

        ${pageHeader(
          "Laporan",
          "Ringkasan data operasional."
        )}


        <div class="cards">

          <div class="card">

            <div class="muted">
              Siswa Aktif
            </div>

            <div class="metric">
              ${formatNumber(
                data.students
              )}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Sensei Aktif
            </div>

            <div class="metric">
              ${formatNumber(
                data.sensei
              )}
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Kehadiran
            </div>

            <div class="metric">
              ${formatNumber(
                data.attendance
              )}%
            </div>

          </div>


          <div class="card">

            <div class="muted">
              Tagihan Pending
            </div>

            <div class="metric">
              ${formatNumber(
                data.pendingBilling
              )}
            </div>

          </div>

        </div>


        <div class="section">

          <div class="card">

            <h3>
              Informasi
            </h3>

            <p class="muted">
              Gunakan menu data untuk melihat
              dan mengelola data secara detail.
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
   * SETTINGS
   * =========================================================
   */

  async function renderSettings(
    el
  ) {

    el.innerHTML = `

      ${pageHeader(
        "Pengaturan",
        "Informasi sistem ARIMA Management System."
      )}


      <div class="card">

        <div class="setting-row">

          <div>

            <strong>
              Nama Aplikasi
            </strong>

            <div class="muted">
              ARIMA MANAGEMENT SYSTEM
            </div>

          </div>

        </div>


        <div class="setting-row">

          <div>

            <strong>
              Perusahaan
            </strong>

            <div class="muted">
              LPKS Arima Persada
            </div>

          </div>

        </div>


        <div class="setting-row">

          <div>

            <strong>
              User Login
            </strong>

            <div class="muted">
              ${esc(
                user?.name ||
                user?.NAME ||
                "-"
              )}
            </div>

          </div>

        </div>

      </div>

    `;

  }


  /*
   * =========================================================
   * FORM MODAL
   * =========================================================
   */

  function openFormModal(
    type,
    existing = null
  ) {

    const config =
      FORM_CONFIG[type];

    if (!config) {

      showToast(
        "Form belum tersedia.",
        "error"
      );

      return;

    }


    const old =
      document.getElementById(
        "arima-form-modal"
      );

    if (old) {
      old.remove();
    }


    const isEdit =
      !!existing;


    const fields =
      config.fields.map(
        field => {

          const rawValue = existing?.[field.key] ?? "";
          const value = field.type === "date"
            ? String(rawValue || "").slice(0, 10)
            : field.type === "month"
              ? String(rawValue || "").slice(0, 7)
              : rawValue;


          if (
            field.type ===
            "select"
          ) {

            return `

              <div class="form-group">

                <label>
                  ${esc(
                    field.label
                  )}

                  ${
                    field.required
                      ? "<span>*</span>"
                      : ""
                  }

                </label>


                <select
                  name="${esc(field.key)}"
                  ${
                    field.required
                      ? "required"
                      : ""
                  }
                >

                  <option value="">
                    Pilih...
                  </option>

                  ${(
                    field.options ||
                    []
                  ).map(
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
                  ).join("")}

                </select>

              </div>

            `;

          }


          if (
            field.type ===
            "textarea"
          ) {

            return `

              <div class="form-group">

                <label>
                  ${esc(
                    field.label
                  )}

                  ${
                    field.required
                      ? "<span>*</span>"
                      : ""
                  }

                </label>


                <textarea
                  name="${esc(field.key)}"
                  placeholder="${esc(
                    field.placeholder ||
                    ""
                  )}"
                  ${
                    field.required
                      ? "required"
                      : ""
                  }
                >${esc(
                  value
                )}</textarea>

              </div>

            `;

          }


          return `

            <div class="form-group">

              <label>

                ${esc(
                  field.label
                )}

                ${
                  field.required
                    ? "<span>*</span>"
                    : ""
                }

              </label>


              <input
                type="${esc(
                  field.type ||
                  "text"
                )}"
                name="${esc(
                  field.key
                )}"
                value="${esc(
                  value
                )}"
                placeholder="${esc(
                  field.placeholder ||
                  ""
                )}"
                ${
                  field.required
                    ? "required"
                    : ""
                }
              />

            </div>

          `;

        }
      ).join("");


    const modal =
      document.createElement(
        "div"
      );

    modal.id =
      "arima-form-modal";

    modal.className =
      "modal-overlay";


    modal.innerHTML = `

      <div
        class="modal"
        role="dialog"
        aria-modal="true"
      >

        <div class="modal-header">

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
            class="modal-close"
            id="modal-close"
          >
            ×
          </button>

        </div>


        <form
          id="arima-form"
          class="form-grid"
        >

          ${fields}


          <div class="modal-footer">

            <button
              type="button"
              class="btn"
              id="modal-cancel"
            >
              Batal
            </button>


            <button
              type="submit"
              class="btn btn-primary"
              id="modal-submit"
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


    function close() {

      modal.remove();

    }


    qs(
      "#modal-close",
      modal
    )?.addEventListener(
      "click",
      close
    );


    qs(
      "#modal-cancel",
      modal
    )?.addEventListener(
      "click",
      close
    );


    modal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          modal
        ) {

          close();

        }

      }
    );


    const form =
      qs(
        "#arima-form",
        modal
      );


    form?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const submit =
          qs(
            "#modal-submit",
            modal
          );

        if (submit) {

          submit.disabled =
            true;

          submit.textContent =
            "Menyimpan...";

        }


        try {

          const formData =
            new FormData(
              form
            );

          const payload =
            {};


          config.fields.forEach(
            field => {

              payload[
                field.key
              ] =
                formData.get(
                  field.key
                ) || "";

            }
          );

          if (existing?.__ROW_NUMBER) {
            payload.__ROW_NUMBER = existing.__ROW_NUMBER;
          }


          let response;


          if (isEdit) {

            response =
              await API.update(
                type,
                payload
              );

          } else {

            response =
              await API.create(
                type,
                payload
              );

          }


          if (
            response &&
            response.success === false
          ) {

            throw new Error(
              response.message ||
              "Gagal menyimpan data."
            );

          }


          showToast(
            isEdit
              ? "Data berhasil diperbarui."
              : "Data berhasil ditambahkan."
          );


          close();


          await load(
            type
          );


        } catch (error) {

          showToast(
            error.message ||
            "Gagal menyimpan data.",
            "error"
          );


          if (submit) {

            submit.disabled =
              false;

            submit.textContent =
              isEdit
                ? "Simpan Perubahan"
                : "Simpan";

          }

        }

      }
    );

  }


  /*
   * =========================================================
   * INIT
   * =========================================================
   */

  async function init() {

    console.log(
      "ARIMA MANAGEMENT SYSTEM initializing..."
    );


    if (
      !requireAuth()
    ) {

      return;

    }


    renderLayout();


    await load(
      "dashboard"
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

    logout,

    renderDashboard,

    renderStudents,

    renderSensei,

    renderAttendance,

    renderBilling,

    renderPayments,

    renderSalary,

    renderReports,

    renderSettings

  };

})();
