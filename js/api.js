window.API = (() => {

  /* =========================================================
   * TOKEN / SESSION
   * ========================================================= */

  const getToken = () => {
    return (
      localStorage.getItem("ARIMA_TOKEN") ||
      sessionStorage.getItem("ARIMA_TOKEN") ||
      ""
    );
  };

  const saveToken = (token) => {
    if (token) {
      localStorage.setItem("ARIMA_TOKEN", token);
    }
  };

  const clearToken = () => {
    localStorage.removeItem("ARIMA_TOKEN");
    sessionStorage.removeItem("ARIMA_TOKEN");
  };


  /* =========================================================
   * API REQUEST
   * ========================================================= */

  async function call(action, payload = {}) {

    const apiUrl =
      window.ARIMA_CONFIG &&
      window.ARIMA_CONFIG.API_URL
        ? window.ARIMA_CONFIG.API_URL
        : "";

    const demoMode =
      window.ARIMA_CONFIG &&
      window.ARIMA_CONFIG.DEMO_MODE === false;


    /* -------------------------------------------------------
     * DEMO MODE
     * ------------------------------------------------------- */

    if (!apiUrl || demoMode) {

      if (DemoAPI[action]) {
        return DemoAPI[action](payload);
      }

      return {
        success: true,
        data: []
      };
    }


    /* -------------------------------------------------------
     * REAL API
     * ------------------------------------------------------- */

    const token = getToken();

    const response = await fetch(apiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify({
        action: action,
        payload: payload,
        token: token
      })
    });


    if (!response.ok) {
      throw new Error(
        "API error HTTP " + response.status
      );
    }


    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {

      console.error(
        "Response API bukan JSON:",
        text
      );

      throw new Error(
        "Server mengembalikan response yang tidak valid."
      );
    }


    /* -------------------------------------------------------
     * SESSION EXPIRED
     * ------------------------------------------------------- */

    if (
      result &&
      result.code === "AUTH_REQUIRED"
    ) {

      clearToken();

      throw new Error(
        result.message ||
        "Session tidak valid. Silakan login kembali."
      );
    }


    /* -------------------------------------------------------
     * API ERROR
     * ------------------------------------------------------- */

    if (
      result &&
      result.success === false
    ) {

      throw new Error(
        result.message ||
        "API request gagal."
      );
    }


    return result;
  }


  /* =========================================================
   * DEMO DATA
   * ========================================================= */

  const demoUsers = {

    ADMIN001: {
      userId: "ADMIN001",
      name: "Administrator",
      role: "ADMIN",
      status: "AKTIF"
    },

    SENSEI001: {
      userId: "SENSEI001",
      name: "Sensei Demo",
      role: "SENSEI",
      status: "AKTIF"
    },

    SISWA001: {
      userId: "SISWA001",
      name: "Siswa Demo",
      role: "SISWA",
      status: "AKTIF"
    }

  };


  const demo = {

    /* -------------------------------------------------------
     * LOGIN
     * ------------------------------------------------------- */

    login: ({ userId, password }) => {

      if (
        !demoUsers[userId] ||
        password !== "admin123"
      ) {

        return {
          success: false,
          message:
            "ID atau password demo salah."
        };
      }

      const token =
        "DEMO-" +
        Date.now();

      saveToken(token);

      return {
        success: true,
        token: token,
        user: demoUsers[userId]
      };
    },


    /* -------------------------------------------------------
     * DASHBOARD
     * ------------------------------------------------------- */

    dashboard: () => ({
      success: true,

      data: {
        students: 24,
        sensei: 6,
        attendance: 91,
        pendingBilling: 7
      }
    }),


    /* -------------------------------------------------------
     * STUDENTS
     * ------------------------------------------------------- */

    students: () => ({
      success: true,

      data: [
        {
          ID_SISWA: "SISWA001",
          NAMA: "Siswa Demo",
          PROGRAM: "SSW / TOKUTEI GINOU",
          STATUS: "AKTIF",
          NO_WA: ""
        },

        {
          ID_SISWA: "SISWA002",
          NAMA: "Contoh Siswa",
          PROGRAM: "MAGANG",
          STATUS: "AKTIF",
          NO_WA: ""
        }
      ]
    }),


    studentSave: (payload) => ({
      success: true,
      id:
        payload.ID_SISWA ||
        "SISWA-DEMO-" + Date.now(),

      message:
        "Data siswa berhasil disimpan (DEMO MODE)."
    }),


    studentDelete: () => ({
      success: true,
      message:
        "Data siswa berhasil dihapus (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * SENSEI
     * ------------------------------------------------------- */

    sensei: () => ({
      success: true,

      data: [
        {
          ID_SENSEI: "SENSEI001",
          NAMA: "Sensei Demo",
          STATUS: "AKTIF",
          NO_WA: ""
        }
      ]
    }),


    senseiSave: () => ({
      success: true,
      message:
        "Data sensei berhasil disimpan (DEMO MODE)."
    }),


    senseiDelete: () => ({
      success: true,
      message:
        "Data sensei berhasil dihapus (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * CLASSES
     * ------------------------------------------------------- */

    classes: () => ({
      success: true,
      data: []
    }),


    classSave: () => ({
      success: true,
      message:
        "Data kelas berhasil disimpan (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * SCHEDULES
     * ------------------------------------------------------- */

    schedules: () => ({
      success: true,
      data: []
    }),


    scheduleSave: () => ({
      success: true,
      message:
        "Jadwal berhasil disimpan (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * ATTENDANCE
     * ------------------------------------------------------- */

    attendance: () => ({
      success: true,
      data: []
    }),


    attendanceSave: () => ({
      success: true,
      message:
        "Absensi berhasil disimpan (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * BILLING
     * ------------------------------------------------------- */

    billing: () => ({
      success: true,
      data: []
    }),


    billingSave: () => ({
      success: true,
      message:
        "Tagihan berhasil disimpan (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * PAYMENTS
     * ------------------------------------------------------- */

    payments: () => ({
      success: true,
      data: []
    }),


    paymentSave: () => ({
      success: true,
      message:
        "Pembayaran berhasil disimpan (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * SALARY
     * ------------------------------------------------------- */

    salary: () => ({
      success: true,
      data: []
    }),


    salarySave: () => ({
      success: true,
      message:
        "Payroll berhasil disimpan (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * SETTINGS
     * ------------------------------------------------------- */

    settings: () => ({
      success: true,
      data: []
    }),


    settingSave: () => ({
      success: true,
      message:
        "Pengaturan berhasil disimpan (DEMO MODE)."
    }),


    /* -------------------------------------------------------
     * REPORTS
     * ------------------------------------------------------- */

    reports: () => ({
      success: true,
      data: {}
    }),


    /* -------------------------------------------------------
     * LOGOUT
     * ------------------------------------------------------- */

    logout: () => {

      clearToken();

      return {
        success: true
      };
    }

  };


  /* =========================================================
   * DEMO API PROXY
   * ========================================================= */

  const DemoAPI = new Proxy(
    demo,
    {
      get: (target, property) => {

        if (
          typeof target[property] ===
          "function"
        ) {
          return target[property];
        }

        return () => ({
          success: true,
          data: []
        });
      }
    }
  );


  /* =========================================================
   * PUBLIC API
   * ========================================================= */

  return {

    /* ================= LOGIN ================= */

    login: async (userId, password) => {

      const result =
        await call(
          "login",
          {
            userId: userId,
            password: password
          }
        );

      if (
        result &&
        result.success &&
        result.token
      ) {
        saveToken(result.token);
      }

      return result;
    },


    /* ================= DASHBOARD ================= */

    dashboard: () =>
      call("dashboard"),


    /* ================= STUDENTS ================= */

    students: () =>
      call("students"),

    studentSave: (payload) =>
      call(
        "studentSave",
        payload
      ),

    studentDelete: (id) =>
      call(
        "studentDelete",
        {
          id: id
        }
      ),


    /* ================= SENSEI ================= */

    sensei: () =>
      call("sensei"),

    senseiSave: (payload) =>
      call(
        "senseiSave",
        payload
      ),

    senseiDelete: (id) =>
      call(
        "senseiDelete",
        {
          id: id
        }
      ),


    /* ================= CLASSES ================= */

    classes: () =>
      call("classes"),

    classSave: (payload) =>
      call(
        "classSave",
        payload
      ),


    /* ================= SCHEDULES ================= */

    schedules: () =>
      call("schedules"),

    scheduleSave: (payload) =>
      call(
        "scheduleSave",
        payload
      ),


    /* ================= ATTENDANCE ================= */

    attendance: () =>
      call("attendance"),

    attendanceSave: (payload) =>
      call(
        "attendanceSave",
        payload
      ),


    /* ================= BILLING ================= */

    billing: () =>
      call("billing"),

    billingSave: (payload) =>
      call(
        "billingSave",
        payload
      ),


    /* ================= PAYMENTS ================= */

    payments: () =>
      call("payments"),

    paymentSave: (payload) =>
      call(
        "paymentSave",
        payload
      ),


    /* ================= SALARY ================= */

    salary: () =>
      call("salary"),

    salarySave: (payload) =>
      call(
        "salarySave",
        payload
      ),


    /* ================= SETTINGS ================= */

    settings: () =>
      call("settings"),

    settingSave: (payload) =>
      call(
        "settingSave",
        payload
      ),


    /* ================= REPORTS ================= */

    reports: () =>
      call("reports"),


    /* ================= LOGOUT ================= */

    logout: async () => {

      const token =
        getToken();

      try {

        const apiUrl =
          window.ARIMA_CONFIG &&
          window.ARIMA_CONFIG.API_URL
            ? window.ARIMA_CONFIG.API_URL
            : "";

        const demoMode =
          window.ARIMA_CONFIG &&
          window.ARIMA_CONFIG.DEMO_MODE === true;


        if (
          apiUrl &&
          !demoMode
        ) {

          await fetch(
            apiUrl,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },

              body: JSON.stringify({
                action: "logout",
                payload: {},
                token: token
              })
            }
          );

        }

      } catch (error) {

        console.warn(
          "Logout API warning:",
          error
        );

      }

      clearToken();

      return {
        success: true
      };
    },


    /* ================= RAW CALL ================= */

    call

  };

})();
