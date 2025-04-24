import { useState } from "react";
import axios from "axios";
import { API_ESTUDIANTE } from "./constantes/Api.constante.estudiante";

function ConsultaTitulo() {
  const [lu, setLu] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(false);

  const consultarEstado = async () => {
    if (!lu) return;

    setLoading(true);
    setRespuesta("");

    try {
      const res = await axios.get(API_ESTUDIANTE.OBTENER_ESTADO_TITULO(lu));
      setRespuesta(res.data);
    } catch (error) {
      console.error(error);
      setRespuesta("Error al consultar. Verificá el LU.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Consultar estado de título</h2>
      <input
        type="text"
        value={lu}
        onChange={(e) => setLu(e.target.value)}
        placeholder="Ingresá tu LU"
      />
      <button onClick={consultarEstado} disabled={loading}>
        {loading ? "Consultando..." : "Consultar"}
      </button>

      {respuesta && (
        <div
          style={{ marginTop: "1rem", background: "#f0f0f0", padding: "1rem" }}
        >
          {respuesta}
        </div>
      )}
    </div>
  );
}

export default ConsultaTitulo;
