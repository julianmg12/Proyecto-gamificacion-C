import { useNavigate } from "react-router-dom";

export default function Header({ stats }) {
  const navigate = useNavigate();

  const totalXP = stats?.totalXP ?? 0;
  const levelName = stats?.levelName ?? "Novato";

  return (
    <header
      style={{
        padding: "1rem 1.5rem",
        background: "#f6f2ff",
        borderBottom: "1px solid #e0d5ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "1.4rem", color: "#2a007f" }}>
          TuDiario
        </h1>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#5f4b8b" }}>
          Constancia y hábitos de estudio 📚
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.9rem",
        }}
      >
        <div
          style={{
            textAlign: "right",
            padding: "0.4rem 0.7rem",
            borderRadius: "999px",
            background: "#e6ddff",
          }}
        >
          <div style={{ fontWeight: 600, color: "#2a007f" }}>
            Nivel: {levelName}
          </div>
          <div style={{ color: "#4f3c7a" }}>XP: {totalXP}</div>
        </div>

        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#ece5ff",
            color: "#220077",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Salir
        </button>
      </div>
    </header>
  );
}
