import { createContext, useContext, useState, useEffect } from "react";
import { desencriptarUsuario, encriptarUsuario } from "../configuracion/Cripto";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  return { user, setUser };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const decryptedUser = desencriptarUsuario(storedUser);
      setUser(decryptedUser);
    }
  }, []);

  const updateUser = (newUser) => {
    if (newUser) {
      const encryptedUser = encriptarUsuario(newUser);
      localStorage.setItem("user", encryptedUser);
      setUser(newUser);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
