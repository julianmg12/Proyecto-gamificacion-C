// src/components/NavBar.jsx
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const baseStyle = {
    flex: 1,
    padding: "0.6rem 0.4rem",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "0.9rem",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
  };

  const activeStyle = {
    ...baseStyle,
    background: "#6541b5",
    color: "#fff",
    fontWeight: 600,
  };

  const inactiveStyle = {
    ...baseStyle,
    background: "#f2eefc",
    color: "#4a3b7a",
    fontWeight: 500,
  };

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "0",
        left: 0,
        right: 0,
        padding: "0.5rem 1rem 0.8rem",
        background: "#ffffffcc",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid #e0d5ff",
        display: "flex",
        gap: "0.5rem",
      }}
    >
      <NavLink
        to="/home"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Mi registro
      </NavLink>

      <NavLink
        to="/logros"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Mis logros
      </NavLink>

      <NavLink
        to="/social"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        Social
      </NavLink>
    </nav>
  );
}
