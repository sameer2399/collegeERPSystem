const headerConfig = () => {
  return {
    token: localStorage.getItem("token"),
    aliveToken: localStorage.getItem("aliveToken"),
    Oauth: localStorage.getItem("Oauth"),
  };
};

export { headerConfig };
