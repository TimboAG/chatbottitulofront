import API_URL from "../configuracion/config.jsx";

export const API_TOKEN = {
  URL: API_URL + "/auth",

  VER_AUTH: function () {
    return `${this.URL}/ver`;
  },
};
