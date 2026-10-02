(function () {
    "use strict";

    const App = {

        user: null,
        root: null,

        async init() {
            this.root = document.getElementById("app");

            if (!this.root) return;

            this.user = this.getUser();

            if (!this.user) {
                location.href = "login.html";
                return;
            }

            this.renderShell();
            await this.showDashboard();
        },

        getUser() {
            try {
                const a = localStorage.getItem("arima_session");
                if (a) return JSON.parse(a);

                const b = localStorage.getItem("ARIMA_USER");
                if (b) return JSON.parse(b);

                return null;
            } catch (e) {
                console.error(e);
                return null;
            }
        },

        renderShell() {
            const name =
                this.user?.name ||
                this.user?.NAMA ||
                this.user?.userId ||
                "Administrator";

            this.root.innerHTML = `
                <div class="shell">

                    <aside class="sidebar">

                        <div class="side-brand">
                            <img src="assets/logo.webp">
                            <strong>
                                ARIMA<br>
                                MANAGEMENT SYSTEM
                            </strong>
                        </div>

                        <nav class="nav">

                            <a href="#" data-page="dashboard">
                                ▦ Dashboard
                            </a>

                            <a href="#" data-page="students">
                                ♙ Siswa
                            </a>

                            <a href="#" data-page="sensei">
                                ◎ Sensei
                            </a>

                            <a href="#" data-page="attendance">
                                ✓ Absensi
                            </a>

                            <a href="#" data-page="billing">
                                Rp Tagihan
                            </a>

                            <a href="#" data-page="payments">
                                ↔ Pembayaran
                            </a>

                            <a href="#" data-page="salary">
                                ¥ Payroll Sensei
                            </a>

                            <a href="#" data-page="reports">
                                ▤ Laporan
                            </a>

                            <a href="#" data-page="settings">
                                ⚙ Pengaturan
                            </a>

                        </nav>

                    </aside>

                    <main class="main">

                        <header class="topbar">

                            <strong id="topTitle">
                                Dashboard
                            </strong>

                            <div class="toolbar">
                                <span class="muted">
                                    ${this.escape(name)}
                                </span>

                                <button
                                    class="btn btn-danger"
                                    id="logoutBtn">
                                    Keluar
                                </button>
                            </div>

                        </header>

                        <section
                            class="content"
                            id="pageContent">
                        </section>

                    </main>

                </div>
            `;

            document
                .querySelectorAll(".nav a")
                .forEach(link => {

                    link.addEventListener("click", e => {
                        e.preventDefault();

                        const page =
                            link.dataset.page;

                        this.navigate(page);
                    });

                });

            document
                .getElementById("logoutBtn")
                .addEventListener(
                    "click",
                    () => this.logout()
                );
        },

        async navigate(page) {

            document
                .querySelectorAll(".nav a")
                .forEach(a => {
                    a.classList.toggle(
                        "active",
                        a.dataset.page === page
                    );
                });

            const title = {
                dashboard: "Dashboard",
                students: "Siswa",
                sensei: "Sensei",
                attendance: "Absensi",
                billing: "Tagihan",
                payments: "Pembayaran",
                salary: "Payroll Sensei",
                reports: "Laporan",
                settings: "Pengaturan"
            }[page] || "Dashboard";

            document.getElementById(
                "topTitle"
            ).textContent = title;

            if (page === "dashboard")
                return this.showDashboard();

            if (page === "students")
                return this.showStudents();

            if (page === "sensei")
                return this.showSensei();

            if (page === "attendance")
                return this.showAttendance();

            if (page === "billing")
                return this.showBilling();

            if (page === "payments")
                return this.showPayments();

            if (page === "salary")
                return this.showSalary();

            if (page === "reports")
                return this.showReports();

            if (page === "settings")
                return this.showSettings();
        },

        async showDashboard() {

            this.loading();

            try {

                const result =
                    await API.dashboard();

                if (!result || result.success === false) {
                    throw new Error(
                        result?.message ||
                        "Gagal mengambil data dashboard."
                    );
                }

                const d =
                    result.data ||
                    result;

                const students =
                    this.num(
                        d.students ??
                        d.totalStudents ??
                        d.siswa ??
                        0
                    );

                const sensei =
                    this.num(
                        d.sensei ??
                        d.totalSensei ??
                        0
                    );

                const attendance =
                    this.num(
                        d.attendance ??
                        d.attendanceRate ??
                        d.kehadiran ??
                        0
                    );

                const pendingBilling =
                    this.num(
                        d.pendingBilling ??
                        d.pending_billing ??
                        d.tagihanPending ??
                        0
                    );

                const totalStudents =
                    this.num(
                        d.totalStudents ??
                        d.studentsTotal ??
                        d.siswa ??
                        students
                    );

                const totalSensei =
                    this.num(
                        d.totalSensei ??
                        d.senseiTotal ??
                        d.sensei ??
                        sensei
                    );

                const totalAttendance =
                    this.num(
                        d.totalAttendance ??
                        d.absensi ??
                        d.attendanceTotal ??
                        0
                    );

                const totalBilling =
                    this.num(
                        d.totalBilling ??
                        d.tagihan ??
                        d.billing ??
                        0
                    );

                const totalPayments =
                    this.num(
                        d.totalPayments ??
                        d.pembayaran ??
                        d.payments ??
                        0
                    );

                const pendingAmount =
                    d.pendingAmount ??
                    d.pendingBillingAmount ??
                    d.tagihanPendingAmount ??
                    0;

                const paymentAmount =
                    d.paymentAmount ??
                    d.totalPaymentAmount ??
                    d.totalPaymentsAmount ??
                    0;

                const payroll =
                    this.num(
                        d.pendingPayroll ??
                        d.payrollPending ??
                        0
                    );

                this.root
                    .querySelector("#pageContent")
                    .innerHTML = `

                    <div class="page-title">
                        <div>
                            <h1>Dashboard</h1>
                            <p>
                                Ringkasan data ARIMA MANAGEMENT SYSTEM
                            </p>
                        </div>
                    </div>

                    <div class="cards">

                        ${this.metric(
                            "SISWA AKTIF",
                            students
                        )}

                        ${this.metric(
                            "SENSEI AKTIF",
                            sensei
                        )}

                        ${this.metric(
                            "KEHADIRAN",
                            attendance + "%"
                        )}

                        ${this.metric(
                            "TAGIHAN PENDING",
                            pendingBilling
                        )}

                    </div>

                    <div class="section">

                        <div class="section-head">
                            <h2>TOTAL DATA</h2>
                        </div>

                        <div class="cards">

                            ${this.metric(
                                "Siswa",
                                totalStudents
                            )}

                            ${this.metric(
                                "Sensei",
                                totalSensei
                            )}

                            ${this.metric(
                                "Absensi",
                                totalAttendance
                            )}

                            ${this.metric(
                                "Tagihan",
                                totalBilling
                            )}

                            ${this.metric(
                                "Pembayaran",
                                totalPayments
                            )}

                        </div>

                    </div>

                    <div class="section">

                        <div class="section-head">
                            <h2>KEUANGAN</h2>
                        </div>

                        <div class="cards">

                            ${this.metric(
                                "Tagihan pending",
                                this.rupiah(pendingAmount)
                            )}

                            ${this.metric(
                                "Total pembayaran",
                                this.rupiah(paymentAmount)
                            )}

                        </div>

                    </div>

                    <div class="section">

                        <div class="section-head">
                            <h2>PAYROLL</h2>
                        </div>

                        <div class="cards">

                            ${this.metric(
                                "Payroll pending",
                                payroll
                            )}

                        </div>

                    </div>

                `;

            } catch (error) {

                this.error(error);

            }
        },

        async showStudents() {

            await this.showTable(
                "Siswa",
                API.students,
                [
                    "ID_SISWA",
                    "NAMA",
                    "PROGRAM",
                    "STATUS",
                    "NO_WA"
                ]
            );
        },

        async showSensei() {

            await this.showTable(
                "Sensei",
                API.sensei,
                [
                    "ID_SENSEI",
                    "NAMA",
                    "STATUS",
                    "NO_WA"
                ]
            );
        },

        async showAttendance() {

            await this.showTable(
                "Absensi",
                API.attendance,
                null
            );
        },

        async showBilling() {

            await this.showTable(
                "Tagihan",
                API.billing,
                null
            );
        },

        async showPayments() {

            await this.showTable(
                "Pembayaran",
                API.payments,
                null
            );
        },

        async showSalary() {

            await this.showTable(
                "Payroll Sensei",
                API.salary,
                null
            );
        },

        async showReports() {

            await this.showTable(
                "Laporan",
                API.reports,
                null
            );
        },

        async showSettings() {

            await this.showTable(
                "Pengaturan",
                API.settings,
                null
            );
        },

        async showTable(title, apiFunction, preferredColumns) {

            this.loading();

            try {

                const result =
                    await apiFunction();

                if (
                    !result ||
                    result.success === false
                ) {
                    throw new Error(
                        result?.message ||
                        "Gagal mengambil data " +
                        title
                    );
                }

                let rows =
                    result.data || [];

                if (!Array.isArray(rows)) {

                    if (
                        rows &&
                        typeof rows === "object"
                    ) {
                        rows = [rows];
                    } else {
                        rows = [];
                    }
                }

                if (!rows.length) {

                    this.root
                        .querySelector("#pageContent")
                        .innerHTML = `

                        <div class="page-title">
                            <div>
                                <h1>${this.escape(title)}</h1>
                                <p>Data dari ARIMA Apps</p>
                            </div>
                        </div>

                        <div class="card">
                            <h2>Belum ada data</h2>
                            <p class="muted">
                                Tidak ada data yang dikembalikan
                                oleh ARIMA Apps.
                            </p>
                        </div>
                    `;

                    return;
                }

                let columns =
                    preferredColumns ||
                    Object.keys(rows[0]);

                columns =
                    columns.filter(
                        c => rows.some(
                            r =>
                                r[c] !== undefined &&
                                r[c] !== null
                        )
                    );

                if (!columns.length) {
                    columns =
                        Object.keys(rows[0]);
                }

                let html = `

                    <div class="page-title">
                        <div>
                            <h1>${this.escape(title)}</h1>
                            <p>
                                Data langsung dari ARIMA Apps
                            </p>
                        </div>

                        <div class="toolbar">

                            <span class="badge">
                                ${rows.length} data
                            </span>

                        </div>
                    </div>

                    <div class="table-wrap">

                        <table class="table">

                            <thead>
                                <tr>
                `;

                columns.forEach(col => {
                    html += `
                        <th>${this.escape(col)}</th>
                    `;
                });

                html += `
                                </tr>
                            </thead>
                            <tbody>
                `;

                rows.forEach(row => {

                    html += "<tr>";

                    columns.forEach(col => {

                        let value =
                            row[col] ?? "";

                        if (
                            typeof value === "object"
                        ) {
                            value =
                                JSON.stringify(value);
                        }

                        html += `
                            <td>
                                ${this.escape(value)}
                            </td>
                        `;
                    });

                    html += "</tr>";
                });

                html += `
                            </tbody>
                        </table>

                    </div>
                `;

                this.root
                    .querySelector("#pageContent")
                    .innerHTML = html;

            } catch (error) {

                this.error(error);

            }
        },

        metric(label, value) {

            return `
                <div class="card">

                    <div class="muted">
                        ${this.escape(label)}
                    </div>

                    <div class="metric">
                        ${this.escape(value)}
                    </div>

                </div>
            `;
        },

        loading() {

            const content =
                this.root.querySelector(
                    "#pageContent"
                );

            if (!content) return;

            content.innerHTML = `
                <div class="card">
                    <p class="muted">
                        Mengambil data dari ARIMA Apps...
                    </p>
                </div>
            `;
        },

        error(error) {

            console.error(
                "ARIMA APP ERROR:",
                error
            );

            const content =
                this.root.querySelector(
                    "#pageContent"
                );

            if (!content) return;

            content.innerHTML = `
                <div class="card">

                    <h2>
                        Gagal mengambil data
                    </h2>

                    <p class="muted">
                        ${this.escape(
                            error?.message ||
                            "Terjadi kesalahan."
                        )}
                    </p>

                    <button
                        class="btn btn-dark"
                        onclick="location.reload()">
                        Coba Lagi
                    </button>

                </div>
            `;
        },

        num(value) {

            if (
                typeof value === "number"
            ) return value;

            const n =
                Number(
                    String(value)
                        .replace(/[^\d.-]/g, "")
                );

            return Number.isFinite(n)
                ? n
                : 0;
        },

        rupiah(value) {

            if (
                value === null ||
                value === undefined ||
                value === ""
            ) {
                return "Rp 0";
            }

            if (
                typeof value === "string" &&
                value.includes("Rp")
            ) {
                return value;
            }

            return "Rp " +
                this.num(value)
                    .toLocaleString("id-ID");
        },

        escape(value) {

            return String(value ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },

        async logout() {

            try {

                if (
                    window.API &&
                    typeof API.logout === "function"
                ) {
                    await API.logout();
                }

            } catch (e) {
                console.warn(e);
            }

            localStorage.removeItem(
                "arima_session"
            );

            localStorage.removeItem(
                "ARIMA_USER"
            );

            localStorage.removeItem(
                "ARIMA_TOKEN"
            );

            sessionStorage.removeItem(
                "ARIMA_TOKEN"
            );

            location.href = "login.html";
        }
    };

    window.App = App;

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            App.init();
        }
    );

})();
