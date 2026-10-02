window.Auth = {

  current() {

    try {

      const session =
        localStorage.getItem(
          "arima_session"
        );

      if (!session) {
        return null;
      }

      return JSON.parse(session);

    } catch (error) {

      console.error(
        "Auth.current() error:",
        error
      );

      localStorage.removeItem(
        "arima_session"
      );

      return null;
    }
  },


  setSession(user) {

    if (!user) {
      return false;
    }

    try {

      localStorage.setItem(
        "arima_session",
        JSON.stringify(user)
      );

      return true;

    } catch (error) {

      console.error(
        "Auth.setSession() error:",
        error
      );

      return false;
    }
  },


  require() {

    const user =
      this.current();

    if (!user) {

      window.location.href =
        "login.html";

      return null;
    }

    return user;
  },


  isLoggedIn() {

    return !!this.current();

  },


  logout() {

    localStorage.removeItem(
      "arima_session"
    );

    localStorage.removeItem(
      "ARIMA_USER"
    );

    localStorage.removeItem(
      "ARIMA_TOKEN"
    );

    window.location.href =
      "login.html";
  }

};
