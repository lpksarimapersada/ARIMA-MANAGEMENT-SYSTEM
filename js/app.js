window.App = (() => {
  const menus = [
    ["dashboard","Dashboard","▦"],
    ["students","Siswa","♙"],
    ["sensei","Sensei","◎"],
    ["attendance","Absensi","✓"],
    ["billing","Tagihan","Rp"],
    ["payments","Pembayaran","↔"],
    ["salary","Payroll Sensei","¥"],
    ["reports","Laporan","▤"],
    ["settings","Pengaturan","⚙"]
  ];
  let user;
  async function init(){
    user=Auth.require(); if(!user)return;
    renderShell(); await load("dashboard");
  }
  function renderShell(){
    document.getElementById("app").innerHTML=`
      <div class="shell">
        <aside class="sidebar">
          <div class="side-brand"><img src="assets/logo.webp"><strong>ARIMA<br>MANAGEMENT</strong></div>
          <nav class="nav">${menus.map(m=>`<a href="#" data-page="${m[0]}">${m[2]} &nbsp; ${m[1]}</a>`).join("")}<a href="#" id="logout">↪ &nbsp; Keluar</a></nav>
        </aside>
        <main class="main">
          <header class="topbar"><div><strong>${ARIMA_CONFIG.COMPANY_NAME}</strong></div><div class="muted">${user.name} · ${user.role}</div></header>
          <section class="content" id="page"></section>
        </main>
      </div>`;
    document.querySelectorAll("[data-page]").forEach(a=>a.onclick=e=>{e.preventDefault();load(a.dataset.page)});
    document.getElementById("logout").onclick=e=>{e.preventDefault();Auth.logout()};
  }
  async function load(page){
    document.querySelectorAll("[data-page]").forEach(a=>a.classList.toggle("active",a.dataset.page===page));
    const el=document.getElementById("page");
    el.innerHTML=`<div class="card">Memuat...</div>`;
    const map={dashboard:renderDashboard,students:renderStudents,sensei:renderSensei,attendance:renderAttendance,billing:renderBilling,payments:renderPayments,salary:renderSalary,reports:renderReports,settings:renderSettings};
    await (map[page]||renderDashboard)(el);
  }
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const table=(rows,cols)=>`<div class="table-wrap"><table class="table"><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${cols.length}" class="muted">Belum ada data.</td></tr>`}</tbody></table></div>`;
  async function renderDashboard(el){
    const r=await API.dashboard();const d=r.data||{};
    el.innerHTML=`<div class="page-title"><div><h1>Dashboard</h1><p>Ringkasan operasional LPKS Arima Persada.</p></div></div>
    <div class="cards">${[
      ["Siswa Aktif",d.students??0],["Sensei",d.sensei??0],["Kehadiran",`${d.attendance??0}%`],["Tagihan Pending",d.pendingBilling??0]
    ].map(x=>`<div class="card"><div class="muted">${x[0]}</div><div class="metric">${x[1]}</div></div>`).join("")}</div>
    <div class="section"><div class="card"><strong>Selamat datang, ${esc(user.name)}</strong><p class="muted">Gunakan menu di sebelah kiri untuk mengelola sistem.</p></div></div>`;
  }
  async function renderStudents(el){const r=await API.students();const rows=r.data||[];el.innerHTML=`<div class="page-title"><div><h1>Data Siswa</h1><p>Kelola identitas dan program siswa.</p></div><button class="btn btn-primary" onclick="App.form('Siswa')">+ Tambah Siswa</button></div>${table(rows,["ID_SISWA","NAMA","PROGRAM","STATUS","NO_WA"])}`;}
  async function renderSensei(el){const r=await API.sensei();const rows=r.data||[];el.innerHTML=`<div class="page-title"><div><h1>Data Sensei</h1><p>Kelola data pengajar.</p></div><button class="btn btn-primary" onclick="App.form('Sensei')">+ Tambah Sensei</button></div>${table(rows,["ID_SENSEI","NAMA","STATUS","NO_WA"])}`;}
  async function renderAttendance(el){const r=await API.attendance();el.innerHTML=`<div class="page-title"><div><h1>Absensi</h1><p>Pencatatan kehadiran berdasarkan ID.</p></div><button class="btn btn-primary" onclick="App.form('Absensi')">+ Catat Absensi</button></div>${table(r.data||[],["ID_SISWA","DATE","STATUS","CLASS_ID","SESSION_ID"])}`;}
  async function renderBilling(el){const r=await API.billing();el.innerHTML=`<div class="page-title"><div><h1>Tagihan</h1><p>Biaya belajar dan kegiatan seperti JFT, SSW, dan JLPT.</p></div><button class="btn btn-primary" onclick="App.form('Tagihan')">+ Buat Tagihan</button></div>${table(r.data||[],["BILLING_ID","ID_SISWA","DESCRIPTION","AMOUNT","DUE_DATE","STATUS"])}`;}
  async function renderPayments(el){const r=await API.payments();el.innerHTML=`<div class="page-title"><div><h1>Pembayaran</h1><p>Riwayat pembayaran dan kwitansi.</p></div><button class="btn btn-primary" onclick="App.form('Pembayaran')">+ Input Pembayaran</button></div>${table(r.data||[],["PAYMENT_ID","BILLING_ID","PAYMENT_DATE","AMOUNT","PAYMENT_METHOD"])}`;}
  async function renderSalary(el){const r=await API.salary();el.innerHTML=`<div class="page-title"><div><h1>Payroll Sensei</h1><p>Rekap gaji, jam/pertemuan, bonus, potongan, dan pembayaran.</p></div><button class="btn btn-primary" onclick="App.form('Payroll')">+ Rekap Payroll</button></div>${table(r.data||[],["SALARY_ID","ID_SENSEI","PERIOD","BASE_SALARY","BONUS","DEDUCTION","NET_SALARY","PAYMENT_STATUS"])}`;}
  async function renderReports(el){el.innerHTML=`<div class="page-title"><div><h1>Laporan</h1><p>Ringkasan operasional dan keuangan.</p></div></div><div class="cards"><div class="card">Laporan absensi<br><button class="btn btn-dark" style="margin-top:10px">Buka</button></div><div class="card">Laporan tagihan<br><button class="btn btn-dark" style="margin-top:10px">Buka</button></div><div class="card">Laporan payroll<br><button class="btn btn-dark" style="margin-top:10px">Buka</button></div></div>`;}
  async function renderSettings(el){el.innerHTML=`<div class="page-title"><div><h1>Pengaturan</h1><p>Konfigurasi aplikasi dan integrasi database.</p></div></div><div class="card"><div class="field"><label>Google Spreadsheet ID</label><input value="${ARIMA_CONFIG.SPREADSHEET_ID}" readonly></div><p class="muted">API_URL diatur pada js/config.js setelah backend Apps Script dideploy.</p></div>`;}
  function form(title){
    const modal=document.createElement("div");modal.className="modal-backdrop";modal.innerHTML=`<div class="modal"><div class="section-head"><h2>${title}</h2><button class="btn btn-light" id="close">Tutup</button></div><div class="form-grid"><div class="field"><label>ID</label><input></div><div class="field"><label>Nama / Keterangan</label><input></div><div class="field full"><label>Catatan</label><textarea rows="4"></textarea></div></div><div class="modal-actions"><button class="btn btn-primary" id="save">Simpan</button></div></div>`;document.body.appendChild(modal);modal.querySelector("#close").onclick=()=>modal.remove();modal.querySelector("#save").onclick=()=>{toast("Form demo tersimpan secara lokal.");modal.remove()};
  }
  function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}
  return {init,form};
})();