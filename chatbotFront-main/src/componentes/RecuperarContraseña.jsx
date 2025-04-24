import React, { useState } from "react";
// import { API_USUARIO } from './constantes/Api.constante.usuario';
import axios from "axios";
import { Button } from "react-bootstrap";

function RecuperarContraseña() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // try {
    //     const response = await axios.post(API_USUARIO.RECUPERAR_CONTRASEÑA(), { email });
    //     setMessage("Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu correo.");
    // } catch (error) {
    //     setMessage(error.response.data.message || error.response.data || "Hubo un error al enviar el correo. Intenta nuevamente.");
    // } finally {
    //     setLoading(false);
    // }
  };

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
        Recuperar Contraseña
      </h2>
      <form className="form2" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            style={{
              fontSize: "1.8em",
              color: "white",
              marginBottom: "1em",
            }}
          >
            Ingrese su email
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
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>{" "}
        <br></br>
        <Button variant="dark" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar enlace de recuperación"}
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
      <br></br>
    </div>
  );
}

export default RecuperarContraseña;
