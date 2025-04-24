import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import { API_USUARIO } from "./constantes/Api.constante.usuario";
import { Button } from "react-bootstrap";

function ReestablecerContraseña() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("No se proporcionó un token válido.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!token) {
      setMessage("Token no encontrado. Intenta nuevamente.");
      setLoading(false);
      return;
    }

    try {
      // const response = await axios.post(API_USUARIO.REESTABLECER_CONTRASEÑA(), {
      //   token,
      //   nuevaContraseña: newPassword,
      // });
      setMessage(
        "Contraseña restablecida con éxito. Ahora puedes iniciar sesión."
      );
      setTimeout(() => navigate("/login"), 3000); // Redirigir a login después de 3 segundos
    } catch (error) {
      setMessage(
        "Hubo un error al restablecer la contraseña. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setMessage("No se proporcionó un token válido.");
    }
  }, [token]);

  return (
    <div className="eventosAdmin">
      <br></br>
      <br></br>
      <h2
        style={{
          fontSize: "1.8em",
          color: "white",
          marginBottom: "1em",
        }}
      >
        Restablecer Contraseña
      </h2>
      <form className="form2" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="newPassword"
            style={{
              fontSize: "1.3em",
              color: "white",
              marginBottom: "1em",
            }}
          >
            Ingrese la nueva Contraseña
          </label>
          <br></br>
          <input
            style={{
              width: "80%",
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "80px",
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
              textAlign: "center",
            }}
            placeholder="Nueva contraseña"
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <br></br>
        <Button variant="dark" type="submit" disabled={loading}>
          {loading ? "Restableciendo..." : "Restablecer Contraseña"}
        </Button>
      </form>
      <br></br>
      <br></br>
      {message && (
        <p
          style={{
            fontSize: "1.8em",
            color: "white",
            marginBottom: "1em",
          }}
        >
          {message}
        </p>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default ReestablecerContraseña;
