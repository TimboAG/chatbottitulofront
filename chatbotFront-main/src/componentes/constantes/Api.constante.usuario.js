import API_URL from "../configuracion/config";

export const API_USUARIO = {
  URL: API_URL + "/usuario",

  LISTA_USUARIO: function (terminoBusqueda) {
    return `${this.URL}/lista?termino=${terminoBusqueda || ""}`;
  },

  USUARIO_ID: function (id) {
    return `${this.URL}/${id}/usuario`;
  },

  ALTA_BAJA: function (id) {
    return `${this.URL}/${id}/actualizarEstado`;
  },
  MODIFICAR_PERFIL: function () {
    return `${this.URL}/perfil`;
  },

  OBTENER_PERFIL: function () {
    return `${this.URL}/perfil`;
  },

  RECUPERAR_CONTRASEÑA: function () {
    return `${this.URL}/recuperarContraseña`;
  },
  REESTABLECER_CONTRASEÑA: function () {
    return `${this.URL}/restablecer-contraseña`;
  },
};
