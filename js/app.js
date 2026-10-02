/* =========================================================
   ARIMA MANAGEMENT SYSTEM
   APP.JS - FRONTEND
   LPKS ARIMA PERSADA
   ========================================================= */

window.App = (() => {
  "use strict";

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
     FORM CONFIG
     ========================================================= */

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
          required: true
        },
        {
          key: "NIK",
          label: "NIK",
          type: "text",
          required: false
        },
        {
          key: "NO_WA",
          label: "No. WhatsApp",
          type: "text",
          required: true
        },
        {
          key: "NAMA_ORANG_TUA",
          label: "Nama Orang Tua / Wali",
          type: "text",
          required: true
        },
        {
          key: "NO_WA_ORANG_TUA",
          label: "No. WhatsApp Orang Tua / Wali",
          type: "text",
          required: false
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
          required: false
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
          type: "text",
          required: false
        },
        {
          key: "EMAIL",
          label: "Email",
          type: "email",
          required: false
        },
        {
          key: "TARIF_PER_PERTEMUAN",
          label: "Tarif per Pertemuan",
          type: "number",
          required: false
        },
        {
          key: "TARIF_PER_JAM",
          label: "Tarif per Jam",
          type: "number",
          required: false
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
          required: false
        },
        {
          key: "ACTOR_ID",
          label: "ID Siswa / Sensei",
          type: "text",
          required: true
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
      title: "Tambah Tagihan",
      editTitle: "Edit Tagihan",
      idField: "BILLING_ID",

      fields: [
        {
          key: "BILLING_ID",
          label: "ID Tagihan",
          type: "text",
          required: false
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
          required: true
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
          required: true
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
          required: false
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
      title: "Tambah Payroll",
      editTitle: "Edit Payroll",
      idField: "SALARY_ID",

      fields: [
        {
          key: "SALARY_ID",
          label: "ID Payroll",
          type: "text",
          required: false
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

  /* =========================================================
     UTILITIES
     ========================================================= */

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function number(value) {
    const n = Number(value || 0);
    return Number.isFinite(n) ? n : 0;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("id-ID").format(
      number(value)
    );
  }

  function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(number(value));
  }

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function getAppRoot() {
    return (
      document.getElementById("app") ||
      document.getElementById("app-root") ||
      document.body
    );
  }

  function getContentRoot() {
    return (
      document.getElementById("page-content") ||
      document.getElementById("content") ||
      document.getElementById("app-content") ||
      document.querySelector(".content") ||
      getAppRoot()
    );
  }

  function renderError(el, error) {
    console.error("ARIMA APP ERROR:", error);

    el.innerHTML = `
      <div class="card">
        <h3>Terjadi kesalahan</h3>
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

  function showToast(message, type = "success") {
    let toast = document.getElementById("arima-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "arima-toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;

    if (type === "error") {
      toast.style.background = "#8d1015";
    } else {
      toast.style.background = "#111";
    }

    clearTimeout(toast._timer);

    toast._timer = setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  /* =========================================================
     AUTH
     ========================================================= */

  function getStoredUser() {
    const keys = [
      "arima_session",
      "ARIMA_SESSION",
      "ARIMA_USER"
    ];

    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);

        if (!raw) continue;

        const parsed = JSON.parse(raw);

        if (parsed) {
          return parsed;
        }
      } catch (error) {
        console.warn(
          "Gagal membaca session:",
          key,
          error
        );
      }
    }

    return null;
  }

  function saveUserSession(currentUser) {
    if (!currentUser) return;

    user = currentUser;

    try {
      localStorage.setItem(
        "arima_session",
        JSON.stringify(currentUser)
      );

      localStorage.setItem(
        "ARIMA_SESSION",
        JSON.stringify(currentUser)
      );

      localStorage.setItem(
        "ARIMA_USER",
        JSON.stringify(currentUser)
      );
    } catch (error) {
      console.warn(
        "Gagal menyimpan session:",
        error
      );
    }
  }

  function requireAuth() {
    user = getStoredUser();

    if (!user) {
      if (
        !location.pathname.endsWith(
          "login.html"
        )
      ) {
        location.href = "login.html";
      }

      return false;
    }

    /*
      Sinkronkan session lama dengan format baru.
    */
    saveUserSession(user);

    return true;
  }

  function logout() {
    [
      "arima_session",
      "ARIMA_SESSION",
      "ARIMA_USER"
    ].forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn(error);
      }
    });

    location.href = "login.html";
  }

  /* =========================================================
     LAYOUT
     ========================================================= */

  function renderLayout() {
    const root = getAppRoot();

    if (!root) {
      console.error("Element #app tidak ditemukan.");
      return;
    }

    root.innerHTML = `
      <div class="shell">

        <aside class="sidebar" id="arima-sidebar">

          <div class="side-brand">

            <img
              src="assets/logo.webp"
              alt="LPKS Arima Persada"
            >

            <div>
              <strong>
                ARIMA
                <br>
                MANAGEMENT SYSTEM
              </strong>
            </div>

          </div>

          <nav class="nav" id="arima-menu">

            ${menus.map(menu => `
              <a
                href="#"
                data-page="${esc(menu[0])}"
              >
                <span style="display:inline-block;width:24px">
                  ${menu[2]}
                </span>
                ${esc(menu[1])}
              </a>
            `).join("")}

          </nav>

          <div style="margin-top:20px">

            <a
              href="#"
              id="btn-logout"
              class="nav"
              style="
                display:block;
                color:#c7c7ca;
                text-decoration:none;
                padding:11px 12px;
                border-radius:9px;
                font-size:14px;
              "
            >
              ⇥ &nbsp; Keluar
            </a>

          </div>

        </aside>

        <main class="main">

          <header class="topbar">

            <div>
              <strong>
                ARIMA MANAGEMENT SYSTEM
              </strong>
            </div>

            <div>
              <span class="muted">
                ${esc(
                  user?.name ||
                  user?.NAME ||
                  user?.NAMA ||
                  "User"
                )}
              </span>
            </div>

          </header>

          <section
            id="page-content"
            class="content"
          >
            <div class="card">
              Memuat aplikasi...
            </div>
          </section>

        </main>

      </div>
    `;

    const menu = qs("#arima-menu");

    if (menu) {
      menu.addEventListener(
        "click",
        event => {

          const link =
            event.target.closest(
              "[data-page]"
            );

          if (!link) return;

          event.preventDefault();

          load(
            link.dataset.page
          );
        }
      );
    }

    const logoutButton =
      qs("#btn-logout");

    if (logoutButton) {
      logoutButton.addEventListener(
        "click",
        event => {
          event.preventDefault();
          logout();
        }
      );
    }
  }

  function setActiveMenu(page) {
    qsa("[data-page]").forEach(item => {
      item.classList.toggle(
        "active",
        item.dataset.page === page
      );
    });
  }

  /* =========================================================
     PAGE HEADER
     ========================================================= */

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

  /* =========================================================
     TABLE
     ========================================================= */

  function renderTable(
    rows,
    columns,
    options = {}
  ) {
    const data =
      Array.isArray(rows)
        ? rows
        : [];

    if (!data.length) {
      return `
        <div class="card">
          <div class="muted">
            ${esc(
              options.emptyText ||
              "Belum ada data."
            )}
          </div>
        </div>
      `;
    }

    return `
      <div class="table-wrap">

        <table class="table">

          <thead>
            <tr>

              ${columns.map(column => `
                <th>
                  ${esc(
                    column.label ||
                    column.key
                  )}
                </th>
              `).join("")}

              ${
                options.actions
                  ? "<th>Aksi</th>"
                  : ""
              }

            </tr>
          </thead>

          <tbody>

            ${data.map((row, index) => `

              <tr>

                ${columns.map(column => {

                  let value =
                    row[column.key];

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
                }).join("")}

                ${
                  options.actions
                    ? `
                      <td>
                        <div class="toolbar">
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

            `).join("")}

          </tbody>

        </table>

      </div>
    `;
  }

  /* =========================================================
     LOAD PAGE
     ========================================================= */

  async function load(page) {
    const el =
      getContentRoot();

    if (!el) return;

    setActiveMenu(page);

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
          await renderDashboard(el);
          break;

        case "students":
          await renderStudents(el);
          break;

        case "sensei":
          await renderSensei(el);
          break;

        case "attendance":
          await renderAttendance(el);
          break;

        case "billing":
          await renderBilling(el);
          break;

        case "payments":
          await renderPayments(el);
          break;

        case "salary":
          await renderSalary(el);
          break;

        case "reports":
          await renderReports(el);
          break;

        case "settings":
          await renderSettings(el);
          break;

        default:
          await renderDashboard(el);
      }

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     DASHBOARD
     ========================================================= */

  async function renderDashboard(el) {

    try {

      /*
        Dashboard utama.
        API.dashboard() adalah sumber utama
        untuk statistik aktif.
      */

      const dashboardResponse =
        await API.dashboard();

      const dashboard =
        dashboardResponse?.data || {};

      /*
        Ambil data detail jika API tersedia.
        Kalau salah satu gagal, dashboard
        tetap dapat ditampilkan.
      */

      let students = [];
      let sensei = [];
      let attendance = [];
      let billing = [];
      let payments = [];
      let salary = [];

      const requests = await Promise.allSettled([
        API.students(),
        API.sensei(),
        API.attendance(),
        API.billing(),
        API.payments(),
        API.salary()
      ]);

      students =
        requests[0].status === "fulfilled"
          ? (
              requests[0].value?.data || []
            )
          : [];

      sensei =
        requests[1].status === "fulfilled"
          ? (
              requests[1].value?.data || []
            )
          : [];

      attendance =
        requests[2].status === "fulfilled"
          ? (
              requests[2].value?.data || []
            )
          : [];

      billing =
        requests[3].status === "fulfilled"
          ? (
              requests[3].value?.data || []
            )
          : [];

      payments =
        requests[4].status === "fulfilled"
          ? (
              requests[4].value?.data || []
            )
          : [];

      salary =
        requests[5].status === "fulfilled"
          ? (
              requests[5].value?.data || []
            )
          )
          : [];

      const activeStudents =
        students.length
          ? students.filter(row =>
              String(
                row.STATUS || ""
              )
                .trim()
                .toUpperCase() ===
              "AKTIF"
            ).length
          : number(
              dashboard.students
            );

      const activeSensei =
        sensei.length
          ? sensei.filter(row =>
              String(
                row.STATUS || ""
              )
                .trim()
                .toUpperCase() ===
              "AKTIF"
            ).length
          : number(
              dashboard.sensei
            );

      let attendancePercent =
        number(
          dashboard.attendance
        );

      if (attendance.length) {

        const valid =
          attendance.filter(row =>
            String(
              row.STATUS || ""
            ).trim() !== ""
          );

        if (valid.length) {

          const hadir =
            valid.filter(row =>
              [
                "HADIR",
                "H",
                "MASUK"
              ].includes(
                String(
                  row.STATUS || ""
                )
                  .trim()
                  .toUpperCase()
              )
            ).length;

          attendancePercent =
            Math.round(
              (hadir /
                valid.length) *
              100
            );
        }
      }

      const pendingStatuses = [
        "PENDING",
        "BELUM BAYAR",
        "BELUM LUNAS",
        "TERTUNGGAK",
        "CICILAN"
      ];

      const pendingBilling =
        billing.length
          ? billing.filter(row =>
              pendingStatuses.includes(
                String(
                  row.STATUS || ""
                )
                  .trim()
                  .toUpperCase()
              )
            ).length
          : number(
              dashboard.pendingBilling
            );

      const pendingBillingAmount =
        billing
          .filter(row =>
            pendingStatuses.includes(
              String(
                row.STATUS || ""
              )
                .trim()
                .toUpperCase()
            )
          )
          .reduce(
            (total, row) =>
              total +
              number(
                row.AMOUNT
              ),
            0
          );

      const totalPayments =
        payments.reduce(
          (total, row) =>
            total +
            number(
              row.AMOUNT
            ),
          0
        );

      const pendingPayroll =
        salary.filter(row =>
          [
            "PENDING",
            "BELUM BAYAR",
            "BELUM LUNAS"
          ].includes(
            String(
              row.PAYMENT_STATUS || ""
            )
              .trim()
              .toUpperCase()
          )
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


        <div class="cards">

          <div class="card">
            <div class="muted">
              Siswa Aktif
            </div>

            <div class="metric">
              ${formatNumber(
                activeStudents
              )}
            </div>
          </div>


          <div class="card">
            <div class="muted">
              Sensei Aktif
            </div>

            <div class="metric">
              ${formatNumber(
                activeSensei
              )}
            </div>
          </div>


          <div class="card">
            <div class="muted">
              Kehadiran
            </div>

            <div class="metric">
              ${formatNumber(
                attendancePercent
              )}%
            </div>
          </div>


          <div class="card">
            <div class="muted">
              Tagihan Pending
            </div>

            <div class="metric">
              ${formatNumber(
                pendingBilling
              )}
            </div>
          </div>

        </div>


        <div class="section">

          <div class="section-head">
            <h2>
              Total Data
            </h2>
          </div>

          <div class="cards">

            <div class="card">
              <div class="muted">
                Siswa
              </div>

              <div class="metric">
                ${formatNumber(
                  students.length
                )}
              </div>
            </div>


            <div class="card">
              <div class="muted">
                Sensei
              </div>

              <div class="metric">
                ${formatNumber(
                  sensei.length
                )}
              </div>
            </div>


            <div class="card">
              <div class="muted">
                Absensi
              </div>

              <div class="metric">
                ${formatNumber(
                  attendance.length
                )}
              </div>
            </div>


            <div class="card">
              <div class="muted">
                Tagihan
              </div>

              <div class="metric">
                ${formatNumber(
                  billing.length
                )}
              </div>
            </div>

          </div>

        </div>


        <div class="section">

          <div class="section-head">
            <h2>
              Keuangan
            </h2>
          </div>

          <div class="cards">

            <div class="card">

              <div class="muted">
                Tagihan Pending
              </div>

              <div class="metric">
                ${formatRupiah(
                  pendingBillingAmount
                )}
              </div>

            </div>


            <div class="card">

              <div class="muted">
                Total Pembayaran
              </div>

              <div class="metric">
                ${formatRupiah(
                  totalPayments
                )}
              </div>

            </div>

          </div>

        </div>


        <div class="section">

          <div class="section-head">
            <h2>
              Payroll
            </h2>
          </div>

          <div class="cards">

            <div class="card">

              <div class="muted">
                Payroll Pending
              </div>

              <div class="metric">
                ${formatNumber(
                  pendingPayroll
                )}
              </div>

            </div>

          </div>

        </div>


        <div class="section">

          <div class="card">

            <strong>
              Selamat datang,
              ${esc(
                user?.name ||
                user?.NAME ||
                user?.NAMA ||
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

  /* =========================================================
     STUDENTS
     ========================================================= */

  async function renderStudents(el) {

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
                  class="btn btn-light"
                  data-edit-student="${esc(
                    row.ID_SISWA
                  )}"
                >
                  Edit
                </button>

                <button
                  type="button"
                  class="btn btn-danger"
                  data-delete-student="${esc(
                    row.ID_SISWA
                  )}"
                >
                  Hapus
                </button>

              `
            }
          )}

        </div>
      `;

      qs(
        "#btn-add-student"
      )?.addEventListener(
        "click",
        () =>
          openFormModal(
            "students"
          )
      );

      qsa(
        "[data-edit-student]"
      ).forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .editStudent;

            const row =
              rows.find(item =>
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
      });

      qsa(
        "[data-delete-student]"
      ).forEach(button => {

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

              await API.delete(
                "students",
                {
                  ID_SISWA: id
                }
              );

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
      });

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     SENSEI
     ========================================================= */

  async function renderSensei(el) {

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
                  class="btn btn-light"
                  data-edit-sensei="${esc(
                    row.ID_SENSEI
                  )}"
                >
                  Edit
                </button>

                <button
                  type="button"
                  class="btn btn-danger"
                  data-delete-sensei="${esc(
                    row.ID_SENSEI
                  )}"
                >
                  Hapus
                </button>

              `
            }
          )}

        </div>
      `;

      qs(
        "#btn-add-sensei"
      )?.addEventListener(
        "click",
        () =>
          openFormModal(
            "sensei"
          )
      );

      qsa(
        "[data-edit-sensei]"
      ).forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .editSensei;

            const row =
              rows.find(item =>
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
      });

      qsa(
        "[data-delete-sensei]"
      ).forEach(button => {

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

              await API.delete(
                "sensei",
                {
                  ID_SENSEI: id
                }
              );

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
      });

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     ATTENDANCE
     ========================================================= */

  async function renderAttendance(el) {

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
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-light"
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

      qs(
        "#btn-add-attendance"
      )?.addEventListener(
        "click",
        () =>
          openFormModal(
            "attendance"
          )
      );

      qsa(
        "[data-edit-attendance]"
      ).forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .editAttendance;

            const row =
              rows.find(item =>
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
      });

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     BILLING
     ========================================================= */

  async function renderBilling(el) {

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
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-light"
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

      qs(
        "#btn-add-billing"
      )?.addEventListener(
        "click",
        () =>
          openFormModal(
            "billing"
          )
      );

      qsa(
        "[data-edit-billing]"
      ).forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .editBilling;

            const row =
              rows.find(item =>
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
      });

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     PAYMENTS
     ========================================================= */

  async function renderPayments(el) {

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
              }
            ],
            {
              actions: row => `

                <button
                  type="button"
                  class="btn btn-light"
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

      qs(
        "#btn-add-payment"
      )?.addEventListener(
        "click",
        () =>
          openFormModal(
            "payments"
          )
      );

      qsa(
        "[data-edit-payment]"
      ).forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .editPayment;

            const row =
              rows.find(item =>
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
      });

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     SALARY
     ========================================================= */

  async function renderSalary(el) {

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
                  class="btn btn-light"
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

      qs(
        "#btn-add-salary"
      )?.addEventListener(
        "click",
        () =>
          openFormModal(
            "salary"
          )
      );

      qsa(
        "[data-edit-salary]"
      ).forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset
                .editSalary;

            const row =
              rows.find(item =>
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
      });

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     REPORTS
     ========================================================= */

  async function renderReports(el) {

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

      `;

    } catch (error) {
      renderError(el, error);
    }
  }

  /* =========================================================
     SETTINGS
     ========================================================= */

  async function renderSettings(el) {

    el.innerHTML = `

      ${pageHeader(
        "Pengaturan",
        "Informasi sistem ARIMA Management System."
      )}

      <div class="card">

        <div class="section">

          <strong>
            Nama Aplikasi
          </strong>

          <p class="muted">
            ARIMA MANAGEMENT SYSTEM
          </p>

        </div>

        <div class="section">

          <strong>
            Perusahaan
          </strong>

          <p class="muted">
            LPKS Arima Persada
          </p>

        </div>

        <div class="section">

          <strong>
            User Login
          </strong>

          <p class="muted">
            ${esc(
              user?.name ||
              user?.NAME ||
              user?.NAMA ||
              "-"
            )}
          </p>

        </div>

      </div>

    `;
  }

  /* =========================================================
     FORM MODAL
     ========================================================= */

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
      Boolean(existing);

    const fields =
      config.fields.map(
        field => {

          const value =
            existing?.[field.key] ??
            "";

          const required =
            field.required
              ? "required"
              : "";

          if (
            field.type ===
            "select"
          ) {

            return `
              <div class="field">

                <label>
                  ${esc(field.label)}
                  ${
                    field.required
                      ? " *"
                      : ""
                  }
                </label>

                <select
                  name="${esc(
                    field.key
                  )}"
                  ${required}
                >

                  <option value="">
                    Pilih...
                  </option>

                  ${(field.options || [])
                    .map(option => `
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
                    `)
                    .join("")}

                </select>

              </div>
            `;
          }

          if (
            field.type ===
            "textarea"
          ) {

            return `
              <div class="field full">

                <label>
                  ${esc(field.label)}
                  ${
                    field.required
                      ? " *"
                      : ""
                  }
                </label>

                <textarea
                  name="${esc(
                    field.key
                  )}"
                  ${required}
                >${esc(value)}</textarea>

              </div>
            `;
          }

          return `
            <div class="field">

              <label>
                ${esc(field.label)}
                ${
                  field.required
                    ? " *"
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
                value="${esc(value)}"
                ${
                  field.placeholder
                    ? `placeholder="${esc(
                        field.placeholder
                      )}"`
                    : ""
                }
                ${required}
              >

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
      "modal-backdrop";

    modal.innerHTML = `

      <div class="modal">

        <div class="section-head">

          <h2>
            ${esc(
              isEdit
                ? config.editTitle
                : config.title
            )}
          </h2>

          <button
            type="button"
            class="btn btn-light"
            id="modal-close"
          >
            ×
          </button>

        </div>

        <form id="arima-form">

          <div class="form-grid">

            ${fields}

          </div>

          <div class="modal-actions">

            <button
              type="button"
              class="btn btn-light"
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

    const close = () => {
      modal.remove();
    };

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
          submit.disabled = true;
          submit.textContent =
            "Menyimpan...";
        }

        try {

          const formData =
            new FormData(
              form
            );

          const payload = {};

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

          await load(type);

        } catch (error) {

          console.error(error);

          showToast(
            error.message ||
            "Gagal menyimpan data.",
            "error"
          );

          if (submit) {
            submit.disabled = false;

            submit.textContent =
              isEdit
                ? "Simpan Perubahan"
                : "Simpan";
          }
        }
      }
    );
  }

  /* =========================================================
     INIT
     ========================================================= */

  async function init() {

    console.log(
      "ARIMA MANAGEMENT SYSTEM initializing..."
    );

    /*
      PENTING:
      Login sekarang menggunakan arima_session.
      requireAuth() menerima arima_session,
      ARIMA_SESSION, maupun ARIMA_USER.
    */

    if (!requireAuth()) {
      return;
    }

    renderLayout();

    await load(
      "dashboard"
    );
  }

  /* =========================================================
     PUBLIC API
     ========================================================= */

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
