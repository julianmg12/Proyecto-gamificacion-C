import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progreso, setProgreso] = useState(
    Number(localStorage.getItem("progreso")) || 0
  );

  useEffect(() => {
    localStorage.setItem("progreso", progreso);
  }, [progreso]);

  const aumentarProgreso = () => {
    if (progreso < 100) {
      setProgreso(progreso + 10);
    }
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto",
        textAlign: "center", // <-- centra todo visualmente
      }}
    >
      {/* Título más arriba */}
      <h2 style={{ marginBottom: "15px" }}>Progreso del Estudiante</h2>

      {/* Barra */}
      <div
        style={{
          width: "100%",
          background: "#ddd",
          borderRadius: "16px",
          overflow: "hidden",
          margin: "0 auto 10px auto",
        }}
      >
        <div
          style={{
            width: `${progreso}%`,
            height: "21px",
            background: "#7a4caf",
            transition: "0.3s",
          }}
        />
      </div>

      <p style={{ marginTop: "10px" }}>{progreso}% completado</p>

      {/* Botón centrado completamente */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={aumentarProgreso}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            background: "purple",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Completar actividad (test)
        </button>
      </div>
    </div>
  );
}
