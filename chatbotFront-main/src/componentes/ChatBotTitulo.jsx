import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_ESTUDIANTE } from "../componentes/constantes/Api.constante.estudiante";
import { API_SCRAPER } from "./constantes/Api.constante.scraper";
import "../assets/estilos.css";

const ChatBotTitulo = () => {
  const [conversacion, setConversacion] = useState([]);
  const [input, setInput] = useState("");
  const [etapa, setEtapa] = useState("inicio");
  const [tipoTitulo, setTipoTitulo] = useState(null);
  const chatRef = useRef(null);
  const ultimoMensajeRef = useRef(null);
  const yaSaludo = useRef(false);

  useEffect(() => {
    if (!yaSaludo.current) {
      mostrarMenuInicial("¡Hola! Soy el chatbot de títulos UNNE 🎓");
      yaSaludo.current = true;
    }
  }, []);

  useEffect(() => {
    if (ultimoMensajeRef.current) {
      ultimoMensajeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversacion]);

  const agregarMensaje = (mensaje, tipo = "bot") => {
    setConversacion((prev) => [...prev, { mensaje, tipo }]);
  };

  const mostrarMenuInicial = (saludoExtra = "") => {
    agregarMensaje(
      `${saludoExtra}\n¿Qué querés consultar hoy?\n1️⃣ Consultar título de Grado\n2️⃣ Consultar título de Pregrado\n3️⃣ Ver trámite para título`
    );
    setEtapa("esperando_opcion");
    setTipoTitulo(null);
  };

  const manejarInput = async () => {
    if (!input.trim()) return;
    agregarMensaje(input, "user");

    if (etapa === "esperando_opcion") {
      if (input === "1") {
        setTipoTitulo("grado");
        agregarMensaje("Elegiste consultar título de Grado. Ingresá tu LU:");
        setEtapa("esperando_lu");
      } else if (input === "2") {
        setTipoTitulo("pregrado");
        agregarMensaje("Elegiste consultar título de Pregrado. Ingresá tu LU:");
        setEtapa("esperando_lu");
      } else if (input === "3") {
        try {
          const res = await axios.get(
            API_SCRAPER.OBTENER_PAGINA_TRAMITE_TITULO()
          );
          agregarMensaje(
            "🔎 Estos son los pasos para tramitar tu título:\n" + res.data
          );
        } catch (error) {
          agregarMensaje("⚠️ No pude obtener la información del trámite.");
        }
        mostrarMenuInicial("¿Querés hacer otra consulta?");
      } else {
        agregarMensaje("Opción inválida. Por favor respondé con 1, 2 o 3.");
      }
    } else if (etapa === "esperando_lu") {
      agregarMensaje("Consultando con la LU ingresada...");
      try {
        const res = await axios.get(
          API_ESTUDIANTE.ESTADO_TITULO_CON_TIPO(input, tipoTitulo)
        );
        agregarMensaje("¡Ya tengo la información! 📄\n" + res.data);
      } catch (error) {
        agregarMensaje("⚠️ No se encontró el estudiante o hubo un error.");
      }
      mostrarMenuInicial("¿Querés hacer otra consulta?");
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">
      <h2>🎓 Chatbot UNNE - Títulos</h2>

      {/* Área de mensajes */}
      <div className="chatbot-mensajes" ref={chatRef}>
        {conversacion.map((msg, i) => {
          const esUltimo = i === conversacion.length - 1;
          return (
            <div
              key={i}
              ref={esUltimo ? ultimoMensajeRef : null}
              className={`mensaje ${msg.tipo}`}
            >
              {msg.mensaje.split("\n").map((linea, idx) => (
                <p key={idx}>{linea}</p>
              ))}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && manejarInput()}
          placeholder="Escribí tu respuesta..."
        />
        <button onClick={manejarInput}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBotTitulo;
