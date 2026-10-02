window.API = (() => {
  "use strict";

  function getToken() {
    return (
      localStorage.getItem("ARIMA_TOKEN") ||
      sessionStorage.getItem("ARIMA_TOKEN") ||
      ""
    );
  }

  function saveToken(token) {
    if (token) {
      localStorage.setItem("ARIMA_TOKEN", token);
    }
  }

  function clearToken() {
    localStorage.removeItem("ARIMA_TOKEN");
    sessionStorage.removeItem("ARIMA_TOKEN");
  }

  async function call(action, payload = {}) {

    const config = window.ARIMA_CONFIG;

    if (!config || !config.API_URL) {
      throw new Error(
        "API_URL ARIMA Apps belum dikonfigurasi."
      );
    }

    const response = await fetch(
      config.API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body: JSON.stringify({
          action: action,
          payload: payload,
          token: getToken()
        })
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {

      console.error(
        "Response ARIMA Apps:",
        text
      );

      throw new Error(
        "ARIMA Apps mengembalikan response yang bukan JSON."
      );
    }

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

    return result;
  }

  async function login(userId, password) {

    const result = await call(
      "login",
      {
        userId: String(userId || "").trim(),
        password: String(password || "")
      }
    );

    if (
      result &&
      result.success === true &&
      result.token
    ) {
      saveToken(result.token);
    }

    return result;
  }

  async function logout() {

    try {
      await call("logout", {});
    } catch (error) {
      console.warn(
        "Logout API:",
        error
      );
    }

    clearToken();
    localStorage.removeItem(
      "arima_session"
    );
  }

  async function health() {
    return call("health", {});
  }

  async function dashboard() {
    return call("dashboard", {});
  }

  async function students(payload = {}) {
    return call("students", payload);
  }

  async function sensei(payload = {}) {
    return call("sensei", payload);
  }

  async function attendance(payload = {}) {
    return call("attendance", payload);
  }

  async function billing(payload = {}) {
    return call("billing", payload);
  }

  async function payments(payload = {}) {
    return call("payments", payload);
  }

  async function salary(payload = {}) {
    return call("salary", payload);
  }

  async function reports(payload = {}) {
    return call("reports", payload);
  }

  async function studentSave(payload) {
    return call("studentSave", payload);
  }

  async function studentDelete(payload) {
    return call("studentDelete", payload);
  }

  async function senseiSave(payload) {
    return call("senseiSave", payload);
  }

  async function senseiDelete(payload) {
    return call("senseiDelete", payload);
  }

  async function attendanceSave(payload) {
    return call("attendanceSave", payload);
  }

  async function billingSave(payload) {
    return call("billingSave", payload);
  }

  async function paymentSave(payload) {
    return call("paymentSave", payload);
  }

  async function salarySave(payload) {
    return call("salarySave", payload);
  }

  return {

    call,

    login,

    logout,

    health,

    dashboard,

    students,

    sensei,

    attendance,

    billing,

    payments,

    salary,

    reports,

    studentSave,

    studentDelete,

    senseiSave,

    senseiDelete,

    attendanceSave,

    billingSave,

    paymentSave,

    salarySave,

    getToken,

    saveToken,

    clearToken

  };

})();
