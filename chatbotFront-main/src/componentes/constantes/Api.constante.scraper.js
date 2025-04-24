import API_URL from "../configuracion/config.jsx";

export const API_SCRAPER = {
  URL: API_URL,

  OBTENER_PAGINA_TRAMITE_TITULO: function (lu) {
    return `${this.URL}/scraper/titulo`;
  },
};
