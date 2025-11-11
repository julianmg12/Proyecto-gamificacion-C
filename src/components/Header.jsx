import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <span className="header-title">TuDiario</span>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span className="header-user">
          Usuario 0335
          <span role="img" aria-label="león" style={{ marginLeft: "8px" }}>
            🦁
          </span>
        </span>

        <button
          className="nav-btn"
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
          Login
        </button>
      </div>
    </header>
  );
}
