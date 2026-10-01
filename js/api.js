window.API = (() => {

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

async function call(action, payload = {}) {
  if (ARIMA_CONFIG.API_URL) {

    const token =
      localStorage.getItem("ARIMA_TOKEN") ||
      localStorage.getItem("arima_token") ||
      sessionStorage.getItem("ARIMA_TOKEN") ||
      sessionStorage.getItem("arima_token") ||
      "";

    const res = await fetch(ARIMA_CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action,
        payload,
        token
      })
    });

    if (!res.ok) {
      throw new Error("API error " + res.status);
    }

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "API request gagal.");
    }

    return result;
  }

  return DemoAPI[action]
    ? DemoAPI[action](payload)
    : {
        success: true,
        data: []
      };
}

  /*
   * ================================
   * DEMO DATA
   * ================================
   */

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

    login: ({ userId, password }) => {

      if (
        !demoUsers[userId] ||
        password !== "admin123"
      ) {

        return {
          success: false,
          message:
            "ID atau password demo salah. Gunakan password demo: admin123"
        };

      }

      return {
        success: true,
        user: demoUsers[userId]
      };

    },

    dashboard: () => ({
      success: true,
      data: {
        students: 24,
        sensei: 6,
        attendance: 91,
        pendingBilling: 7
      }
    }),

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

    attendance: () => ({
      success: true,
      data: []
    }),

    billing: () => ({
      success: true,
      data: []
    }),

    payments: () => ({
      success: true,
      data: []
    }),

    salary: () => ({
      success: true,
      data: []
    })

  };


  const DemoAPI = new Proxy(
    demo,
    {
      get: (target, property) =>
        target[property] ||
        (() => ({
          success: true,
          data: []
        }))
    }
  );


  /*
   * ================================
   * PUBLIC API
   * ================================
   */

  return {

    login: (userId, password) =>
      call("login", {
        userId,
        password
      }),

    dashboard: () =>
      call("dashboard"),

    students: () =>
      call("students"),

    sensei: () =>
      call("sensei"),

    attendance: () =>
      call("attendance"),

    billing: () =>
      call("billing"),

    payments: () =>
      call("payments"),

    salary: () =>
      call("salary"),

    logout: async () => {

      const token = getToken();

      try {

        if (
          window.ARIMA_CONFIG &&
          window.ARIMA_CONFIG.API_URL &&
          window.ARIMA_CONFIG.DEMO_MODE === false
        ) {

          await fetch(
            window.ARIMA_CONFIG.API_URL,
            {
              method: "POST",
              headers: {
                "Content-Type": "text/plain;charset=utf-8"
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

    call

  };

})();
