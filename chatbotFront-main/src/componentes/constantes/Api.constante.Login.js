import API_URL  from '../configuracion/config.jsx';

export const API_LOGIN_LOGOUT = {

    URL: API_URL,

    USUARIO_INICIAR_SESSION: function () {
      return `${this.URL}/login`;
    },
    
    USUARIO_CERRAR_SESSION: function () {
      return `${this.URL}/logout`;
    },
  };
  