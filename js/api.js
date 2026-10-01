window.API = (() => {
  async function call(action, payload={}) {
    if (ARIMA_CONFIG.API_URL) {
      const res = await fetch(ARIMA_CONFIG.API_URL, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({action,payload})
      });
      if (!res.ok) throw new Error("API error " + res.status);
      return await res.json();
    }
    return DemoAPI[action] ? DemoAPI[action](payload) : {success:true,data:[]};
  }
  const demoUsers = {
    ADMIN001:{userId:"ADMIN001",name:"Administrator",role:"ADMIN",status:"AKTIF"},
    SENSEI001:{userId:"SENSEI001",name:"Sensei Demo",role:"SENSEI",status:"AKTIF"},
    SISWA001:{userId:"SISWA001",name:"Siswa Demo",role:"SISWA",status:"AKTIF"}
  };
  const demo = {
    login: ({userId,password}) => {
      if (!demoUsers[userId] || password !== "admin123") return {success:false,message:"ID atau password demo salah. Gunakan password demo: admin123"};
      return {success:true,user:demoUsers[userId]};
    },
    dashboard: () => ({success:true,data:{students:24,sensei:6,attendance:91,pendingBilling:7}}),
    students: () => ({success:true,data:[
      {ID_SISWA:"SISWA001",NAMA:"Siswa Demo",PROGRAM:"SSW / TOKUTEI GINOU",STATUS:"AKTIF",NO_WA:""},
      {ID_SISWA:"SISWA002",NAMA:"Contoh Siswa",PROGRAM:"MAGANG",STATUS:"AKTIF",NO_WA:""}
    ]}),
    sensei: () => ({success:true,data:[
      {ID_SENSEI:"SENSEI001",NAMA:"Sensei Demo",STATUS:"AKTIF",NO_WA:""}
    ]}),
    attendance: () => ({success:true,data:[]}),
    billing: () => ({success:true,data:[]}),
    payments: () => ({success:true,data:[]}),
    salary: () => ({success:true,data:[]})
  };
  const DemoAPI = new Proxy(demo,{get:(t,p)=>t[p] || (()=>({success:true,data:[]}))});
  return {
    login:(userId,password)=>call("login",{userId,password}),
    dashboard:()=>call("dashboard"),
    students:()=>call("students"),
    sensei:()=>call("sensei"),
    attendance:()=>call("attendance"),
    billing:()=>call("billing"),
    payments:()=>call("payments"),
    salary:()=>call("salary"),
    call
  };
})();