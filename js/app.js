/* =========================================================
   ARIMA MANAGEMENT SYSTEM
   APP.JS
   LPKS ARIMA PERSADA
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       GLOBAL APP
       ===================================================== */

    window.App = {

        user: null,
        initialized: false,

        /* =================================================
           INIT
           ================================================= */

        init: async function () {

            if (this.initialized) {
                return;
            }

            this.initialized = true;

            try {

                /* Check login session */
                if (window.Auth && typeof Auth.require === "function") {
                    this.user = Auth.require();

                    if (!this.user) {
                        return;
                    }
                } else {
                    this.user = this.getSession();

                    if (!this.user) {
                        window.location.href = "login.html";
                        return;
                    }
                }

                /* Render application */
                this.render();

                /* Load dashboard data */
                await this.loadDashboard();

            } catch (error) {

                console.error("ARIMA APP ERROR:", error);

                this.showError(
                    "Aplikasi gagal dimuat. Silakan refresh halaman."
                );
            }
        },


        /* =================================================
           SESSION
           ================================================= */

        getSession: function () {

            try {

                var session = localStorage.getItem("arima_session");

                if (!session) {
                    return null;
                }

                return JSON.parse(session);

            } catch (error) {

                console.error("Session error:", error);

                return null;
            }
        },


        /* =================================================
           RENDER MAIN APPLICATION
           ================================================= */

        render: function () {

            var root = document.getElementById("app");

            if (!root) {
                console.error("Element #app tidak ditemukan.");
                return;
            }

            var userName =
                this.user && (
                    this.user.NAME ||
                    this.user.name ||
                    this.user.NAMA ||
                    this.user.USER_ID ||
                    this.user.userId
                );

            if (!userName) {
                userName = "Administrator";
            }

            root.innerHTML = `

                <div class="shell">

                    <!-- SIDEBAR -->
                    <aside class="sidebar">

                        <div class="side-brand">

                            <img
                                src="assets/logo.webp"
                                alt="LPKS Arima Persada"
                            >

                            <strong>
                                ARIMA<br>
                                MANAGEMENT SYSTEM
                            </strong>

                        </div>

                        <nav class="nav">

                            <a
                                href="#"
                                class="active"
                                data-page="dashboard"
                                onclick="App.navigate('dashboard'); return false;"
                            >
                                ▦ Dashboard
                            </a>

                            <a
                                href="#"
                                data-page="students"
                                onclick="App.navigate('students'); return false;"
                            >
                                ♙ Siswa
                            </a>

                            <a
                                href="#"
                                data-page="sensei"
                                onclick="App.navigate('sensei'); return false;"
                            >
                                ◎ Sensei
                            </a>

                            <a
                                href="#"
                                data-page="attendance"
                                onclick="App.navigate('attendance'); return false;"
                            >
                                ✓ Absensi
                            </a>

                            <a
                                href="#"
                                data-page="billing"
                                onclick="App.navigate('billing'); return false;"
                            >
                                Rp Tagihan
                            </a>

                            <a
                                href="#"
                                data-page="payments"
                                onclick="App.navigate('payments'); return false;"
                            >
                                ↔ Pembayaran
                            </a>

                            <a
                                href="#"
                                data-page="payroll"
                                onclick="App.navigate('payroll'); return false;"
                            >
                                ¥ Payroll Sensei
                            </a>

                            <a
                                href="#"
                                data-page="reports"
                                onclick="App.navigate('reports'); return false;"
                            >
                                ▤ Laporan
                            </a>

                            <a
                                href="#"
                                data-page="settings"
                                onclick="App.navigate('settings'); return false;"
                            >
                                ⚙ Pengaturan
                            </a>

                        </nav>

                    </aside>


                    <!-- MAIN -->
                    <main class="main">

                        <!-- TOPBAR -->
                        <header class="topbar">

                            <div>
                                <strong>Dashboard</strong>
                            </div>

                            <div class="toolbar">

                                <span class="muted">
                                    ${this.escapeHtml(userName)}
                                </span>

                                <button
                                    class="btn btn-danger"
                                    onclick="App.logout()"
                                >
                                    Keluar
                                </button>

                            </div>

                        </header>


                        <!-- CONTENT -->
                        <section
                            class="content"
                            id="pageContent"
                        >

                            <div class="page-title">

                                <div>
                                    <h1>Dashboard</h1>

                                    <p>
                                        Ringkasan ARIMA MANAGEMENT SYSTEM
                                    </p>
                                </div>

                            </div>


                            <!-- METRIC CARDS -->
                            <div class="cards">

                                <div class="card">

                                    <div class="muted">
                                        SISWA AKTIF
                                    </div>

                                    <div
                                        class="metric"
                                        id="activeStudents"
                                    >
                                        0
                                    </div>

                                </div>


                                <div class="card">

                                    <div class="muted">
                                        SENSEI AKTIF
                                    </div>

                                    <div
                                        class="metric"
                                        id="activeSensei"
                                    >
                                        0
                                    </div>

                                </div>


                                <div class="card">

                                    <div class="muted">
                                        KEHADIRAN
                                    </div>

                                    <div
                                        class="metric"
                                        id="attendanceRate"
                                    >
                                        0%
                                    </div>

                                </div>


                                <div class="card">

                                    <div class="muted">
                                        TAGIHAN PENDING
                                    </div>

                                    <div
                                        class="metric"
                                        id="pendingBilling"
                                    >
                                        0
                                    </div>

                                </div>

                            </div>


                            <!-- TOTAL DATA -->
                            <div class="section">

                                <div class="section-head">

                                    <h2>
                                        TOTAL DATA
                                    </h2>

                                </div>


                                <div class="cards">

                                    <div class="card">

                                        <div class="muted">
                                            Siswa
                                        </div>

                                        <div
                                            class="metric"
                                            id="totalStudents"
                                        >
                                            0
                                        </div>

                                    </div>


                                    <div class="card">

                                        <div class="muted">
                                            Sensei
                                        </div>

                                        <div
                                            class="metric"
                                            id="totalSensei"
                                        >
                                            0
                                        </div>

                                    </div>


                                    <div class="card">

                                        <div class="muted">
                                            Absensi
                                        </div>

                                        <div
                                            class="metric"
                                            id="totalAttendance"
                                        >
                                            0
                                        </div>

                                    </div>


                                    <div class="card">

                                        <div class="muted">
                                            Tagihan
                                        </div>

                                        <div
                                            class="metric"
                                            id="totalBilling"
                                        >
                                            0
                                        </div>

                                    </div>


                                    <div class="card">

                                        <div class="muted">
                                            Pembayaran
                                        </div>

                                        <div
                                            class="metric"
                                            id="totalPayments"
                                        >
                                            0
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <!-- KEUANGAN -->
                            <div class="section">

                                <div class="section-head">

                                    <h2>
                                        KEUANGAN
                                    </h2>

                                </div>


                                <div class="cards">

                                    <div class="card">

                                        <div class="muted">
                                            Tagihan pending
                                        </div>

                                        <div
                                            class="metric"
                                            id="pendingAmount"
                                        >
                                            Rp 0
                                        </div>

                                    </div>


                                    <div class="card">

                                        <div class="muted">
                                            Total pembayaran
                                        </div>

                                        <div
                                            class="metric"
                                            id="paymentAmount"
                                        >
                                            Rp 0
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <!-- PAYROLL -->
                            <div class="section">

                                <div class="section-head">

                                    <h2>
                                        PAYROLL
                                    </h2>

                                </div>


                                <div class="cards">

                                    <div class="card">

                                        <div class="muted">
                                            Payroll pending
                                        </div>

                                        <div
                                            class="metric"
                                            id="pendingPayroll"
                                        >
                                            0
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <!-- STATUS -->
                            <div class="section">

                                <div class="card">

                                    <strong>
                                        Sistem Online
                                    </strong>

                                    <p class="muted">
                                        ARIMA MANAGEMENT SYSTEM
                                        terhubung dengan backend
                                        ARIMA Apps.
                                    </p>

                                </div>

                            </div>

                        </section>

                    </main>

                </div>
            `;
        },


        /* =================================================
           LOAD DASHBOARD
           ================================================= */

        loadDashboard: async function () {

            try {

                var data = null;


                /*
                 * Coba menggunakan API.dashboard()
                 */

                if (
                    window.API &&
                    typeof API.dashboard === "function"
                ) {

                    data = await API.dashboard();

                }


                /*
                 * Coba menggunakan API.getDashboard()
                 */

                else if (
                    window.API &&
                    typeof API.getDashboard === "function"
                ) {

                    data = await API.getDashboard();

                }


                /*
                 * Coba menggunakan API.getStats()
                 */

                else if (
                    window.API &&
                    typeof API.getStats === "function"
                ) {

                    data = await API.getStats();

                }


                /*
                 * Kalau API belum mempunyai fungsi dashboard,
                 * gunakan data kosong supaya tampilan tetap hidup.
                 */

                if (!data) {

                    data = {
                        success: true,
                        data: {}
                    };

                }


                if (data.success === false) {

                    console.warn(
                        "Dashboard API:",
                        data.message || "Gagal mengambil data."
                    );

                    return;
                }


                var source = data.data || data;


                this.setDashboardValue(
                    "activeStudents",
                    this.pick(
                        source,
                        [
                            "activeStudents",
                            "active_students",
                            "siswaAktif",
                            "siswa_aktif"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "activeSensei",
                    this.pick(
                        source,
                        [
                            "activeSensei",
                            "active_sensei",
                            "senseiAktif",
                            "sensei_aktif"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "attendanceRate",
                    this.formatPercent(
                        this.pick(
                            source,
                            [
                                "attendanceRate",
                                "attendance_rate",
                                "kehadiran"
                            ],
                            0
                        )
                    )
                );


                this.setDashboardValue(
                    "pendingBilling",
                    this.pick(
                        source,
                        [
                            "pendingBilling",
                            "pending_billing",
                            "tagihanPending",
                            "tagihan_pending"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "totalStudents",
                    this.pick(
                        source,
                        [
                            "totalStudents",
                            "total_students",
                            "siswa"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "totalSensei",
                    this.pick(
                        source,
                        [
                            "totalSensei",
                            "total_sensei",
                            "sensei"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "totalAttendance",
                    this.pick(
                        source,
                        [
                            "totalAttendance",
                            "total_attendance",
                            "absensi"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "totalBilling",
                    this.pick(
                        source,
                        [
                            "totalBilling",
                            "total_billing",
                            "tagihan"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "totalPayments",
                    this.pick(
                        source,
                        [
                            "totalPayments",
                            "total_payments",
                            "pembayaran"
                        ],
                        0
                    )
                );


                this.setDashboardValue(
                    "pendingAmount",
                    this.formatCurrency(
                        this.pick(
                            source,
                            [
                                "pendingAmount",
                                "pending_amount",
                                "tagihanPendingAmount"
                            ],
                            0
                        )
                    )
                );


                this.setDashboardValue(
                    "paymentAmount",
                    this.formatCurrency(
                        this.pick(
                            source,
                            [
                                "paymentAmount",
                                "payment_amount",
                                "totalPaymentAmount"
                            ],
                            0
                        )
                    )
                );


                this.setDashboardValue(
                    "pendingPayroll",
                    this.pick(
                        source,
                        [
                            "pendingPayroll",
                            "pending_payroll",
                            "payrollPending"
                        ],
                        0
                    )
                );


            } catch (error) {

                console.error(
                    "Dashboard data error:",
                    error
                );

            }
        },


        /* =================================================
           PICK VALUE
           ================================================= */

        pick: function (obj, keys, fallback) {

            if (!obj) {
                return fallback;
            }

            for (var i = 0; i < keys.length; i++) {

                var key = keys[i];

                if (
                    Object.prototype.hasOwnProperty.call(
                        obj,
                        key
                    )
                ) {

                    var value = obj[key];

                    if (
                        value !== null &&
                        value !== undefined &&
                        value !== ""
                    ) {

                        return value;
                    }
                }
            }

            return fallback;
        },


        /* =================================================
           SET DASHBOARD VALUE
           ================================================= */

        setDashboardValue: function (id, value) {

            var element = document.getElementById(id);

            if (!element) {
                return;
            }

            element.textContent = value;
        },


        /* =================================================
           CURRENCY
           ================================================= */

        formatCurrency: function (value) {

            var number = Number(value);

            if (!Number.isFinite(number)) {
                number = 0;
            }

            return "Rp " + number.toLocaleString(
                "id-ID"
            );
        },


        /* =================================================
           PERCENT
           ================================================= */

        formatPercent: function (value) {

            if (
                typeof value === "string" &&
                value.indexOf("%") !== -1
            ) {

                return value;
            }

            var number = Number(value);

            if (!Number.isFinite(number)) {
                number = 0;
            }

            return number + "%";
        },


        /* =================================================
           NAVIGATION
           ================================================= */

        navigate: function (page) {

            var content =
                document.getElementById("pageContent");

            if (!content) {
                return;
            }


            /* Active menu */

            var links =
                document.querySelectorAll(".nav a");

            links.forEach(function (link) {

                link.classList.remove("active");

                if (
                    link.getAttribute("data-page") === page
                ) {

                    link.classList.add("active");
                }

            });


            /*
             * Dashboard
             */

            if (page === "dashboard") {

                location.reload();

                return;
            }


            /*
             * Halaman sementara
             */

            var titles = {

                students: "Data Siswa",

                sensei: "Data Sensei",

                attendance: "Absensi",

                billing: "Tagihan",

                payments: "Pembayaran",

                payroll: "Payroll Sensei",

                reports: "Laporan",

                settings: "Pengaturan"

            };


            var title =
                titles[page] || "ARIMA MANAGEMENT SYSTEM";


            content.innerHTML = `

                <div class="page-title">

                    <div>

                        <h1>
                            ${this.escapeHtml(title)}
                        </h1>

                        <p>
                            Modul ${this.escapeHtml(title)}
                            ARIMA MANAGEMENT SYSTEM
                        </p>

                    </div>

                </div>


                <div class="card">

                    <h2>
                        ${this.escapeHtml(title)}
                    </h2>

                    <p class="muted">
                        Modul ini siap dihubungkan
                        dengan data ARIMA Apps.
                    </p>

                    <button
                        class="btn btn-dark"
                        onclick="App.navigate('dashboard')"
                    >
                        Kembali ke Dashboard
                    </button>

                </div>

            `;
        },


        /* =================================================
           LOGOUT
           ================================================= */

        logout: function () {

            try {

                if (
                    window.Auth &&
                    typeof Auth.logout === "function"
                ) {

                    Auth.logout();

                    return;
                }

            } catch (error) {

                console.error(
                    "Auth logout error:",
                    error
                );
            }


            localStorage.removeItem(
                "arima_session"
            );

            window.location.href =
                "login.html";
        },


        /* =================================================
           ERROR
           ================================================= */

        showError: function (message) {

            var root =
                document.getElementById("app");

            if (!root) {
                return;
            }

            root.innerHTML = `

                <div style="
                    min-height:100vh;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:30px;
                    background:#f5f5f5;
                ">

                    <div class="card"
                         style="
                            max-width:600px;
                            width:100%;
                            text-align:center;
                         ">

                        <h1>
                            ARIMA MANAGEMENT SYSTEM
                        </h1>

                        <p class="muted">
                            ${this.escapeHtml(message)}
                        </p>

                        <button
                            class="btn btn-dark"
                            onclick="location.reload()"
                        >
                            Muat Ulang
                        </button>

                    </div>

                </div>

            `;
        },


        /* =================================================
           ESCAPE HTML
           ================================================= */

        escapeHtml: function (value) {

            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

    };


    /* =====================================================
       AUTO INIT
       ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            if (
                window.App &&
                typeof window.App.init === "function"
            ) {

                window.App.init();

            }

        }
    );


})();
