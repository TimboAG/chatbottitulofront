import { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_LOGIN_LOGOUT } from "../constantes/Api.constante.Login";
import { AuthContext } from "./Auth";

const useTokenExpirado = () => {
  const { user, setUser } = useContext(AuthContext);
  const [expirationDate, setExpirationDate] = useState(null);
  const [logoutTimeout, setLogoutTimeout] = useState(null);

  const handleTokenExpired = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const response = await axios.post(
        API_LOGIN_LOGOUT.USUARIO_CERRAR_SESSION()
      );
      setUser(null);
      console.error("TOKEN EXPIRADO ");
      return response.data;
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      console.error("Respuesta del error: ", error.response);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (user && user.token) {
        const decodedToken = jwtDecode(user.token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        setExpirationDate(expirationDate);

        if (expirationDate > new Date()) {
          const expirationTime =
            expirationDate.getTime() - new Date().getTime();
          const timeout = setTimeout(() => {
            handleTokenExpired();
          }, expirationTime);

          setLogoutTimeout(timeout);
        }
      }
    };

    checkTokenExpiration();

    return () => {
      if (logoutTimeout) {
        clearTimeout(logoutTimeout);
      }
    };
  }, [user]);

  const guardarToken = (token) => {
    localStorage.setItem("token", token);
  };

  return {
    expirationDate,
    handleTokenExpired,
    guardarToken,
  };
};

export default useTokenExpirado;
