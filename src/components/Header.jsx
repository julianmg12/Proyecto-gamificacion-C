import { useNavigate, NavLink } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();


  const baseNav = {
    flex: 1,
    padding: "0.5rem 0.3rem",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#4a3b7a",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
  };

  const activeNav = {
    ...baseNav,
    color: "#2a007f",
    fontWeight: 700,
    borderBottom: "2px solid #5b36c8",
  };

  return (
    <header
      style={{
        padding: "0.8rem 1.5rem 0rem",
        background: "#f6f2ff",
        borderBottom: "1px solid #e0d5ff",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      {/* --- FILA SUPERIOR: LOGO + STATS + SALIR --- */}
      <div
        style={{
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
              borderRadius: "10px",
              background: "#e6ddff",
              minWidth: "110px",
            }}
          >
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
      </div>

      {/* --- NAVBAR INTEGRADO --- */}
      <nav
        style={{
          display: "flex",
          gap: "0.5rem",
          borderTop: "1px solid #e0d5ff",
          paddingTop: "0.4rem",
        }}
      >
        <NavLink
          to="/home"
          style={({ isActive }) => (isActive ? activeNav : baseNav)}
        >
          Mi Diario
        </NavLink>

        <NavLink
          to="/logros"
          style={({ isActive }) => (isActive ? activeNav : baseNav)}
        >
          Mis logros
        </NavLink>

        <NavLink
          to="/social"
          style={({ isActive }) => (isActive ? activeNav : baseNav)}
        >
          Social
        </NavLink>

        <NavLink
          to="/graficos"
          style={({ isActive }) => (isActive ? activeNav : baseNav)}
        >
          Rendimiento
        </NavLink>

        <NavLink
          to="/connections"
          style={({ isActive }) => (isActive ? activeNav : baseNav)}
        >
          Conexiones
        </NavLink>
      </nav>
    </header>
  );
}
