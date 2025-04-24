import API_URL from "../configuracion/config.jsx";

export const API_ESTUDIANTE = {
  URL: API_URL,

  OBTENER_ESTUDIANTE: function (lu) {
    return `${this.URL}/estudiantes/${lu}`;
  },

  ESTUDIANTE_ESTADO_TITULO: function () {
    return `${this.URL}/estudiantes/${lu}/estado-titulo`;
  },
  ESTADO_TITULO_CON_TIPO: function (lu, tipo) {
    return `${this.URL}/estudiantes/${lu}/estado-titulo-por-tipo?tipo=${tipo}`;
  },
};
