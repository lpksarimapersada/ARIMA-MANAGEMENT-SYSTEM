window.Auth = {
  current(){
    try{return JSON.parse(localStorage.getItem("arima_session")||"null")}catch{return null}
  },
  require(){
    const u=this.current(); if(!u){location.href="login.html";return null} return u;
  },
  logout(){localStorage.removeItem("arima_session");location.href="login.html";}
};