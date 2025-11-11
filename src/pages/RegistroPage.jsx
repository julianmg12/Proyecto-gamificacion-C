import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistroPage({ onRegistrar }) {
  const navigate = useNavigate();

  const [curso, setCurso] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [queHice, setQueHice] = useState("");
  const [comoHice, setComoHice] = useState("");
  const [recurso, setRecurso] = useState("");

  const formValido = curso && proyecto && queHice && comoHice && recurso;

  const handleSubmit = (e) => {
    e.preventDefault();

    const registroNuevo = {
      titulo: curso,
      puntos: 100,
      descripcion: queHice,
      proyecto,
      comoHice,
      recurso,
      fecha: new Date().toISOString(),
    };

    onRegistrar(registroNuevo);
    navigate("/");
  };

  return (
    <main
      style={{
        margin: "0 auto",
        maxWidth: "370px",
        padding: "16px",
        minHeight: "67vh",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2 style={{ marginBottom: "12px", fontSize: "1.3rem", fontWeight: "bold" }}>
        Registrar avance
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "500" }}>Curso</label>
          <input
            type="text"
            placeholder="Ingresa el curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "0.9rem",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "500" }}>Proyecto/Tarea</label>
          <input
            type="text"
            placeholder="Nombre del proyecto o tarea"
            value={proyecto}
            onChange={(e) => setProyecto(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "0.9rem",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "500" }}>¿Qué hice?</label>
          <textarea
            placeholder="Describe lo que hiciste"
            value={queHice}
            onChange={(e) => setQueHice(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "0.9rem",
              minHeight: "80px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "500" }}>¿Cómo lo hice?</label>
          <textarea
            placeholder="Describe el proceso"
            value={comoHice}
            onChange={(e) => setComoHice(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "0.9rem",
              minHeight: "80px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "6px", fontWeight: "500" }}>Recurso / Link</label>
          <input
            type="text"
            placeholder="Incluye un enlace"
            value={recurso}
            onChange={(e) => setRecurso(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "0.9rem",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!formValido}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            color: formValido ? "#fff" : "#666",
            backgroundColor: formValido ? "#6541b5" : "#ccc",
            cursor: formValido ? "pointer" : "not-allowed",
            transition: "0.2s",
          }}
        >
          Registrar avance
        </button>
      </form>
    </main>
  );
}
