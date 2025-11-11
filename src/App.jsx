import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import RegistroPage from "./pages/RegistroPage";
import Login from "./pages/Login";



function App() {
  // Estado local con registros guardados en localStorage
  const [registros, setRegistros] = useState(() => {
    const saved = localStorage.getItem("registros");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cada vez que cambia `registros`
  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  const agregarRegistro = (nuevo) => {
    setRegistros((prev) => [...prev, nuevo]);
  };

  return (
    <Router>
      <Routes>
        {/* 🔹 Login será la primera vista */}
        <Route path="/" element={<Login />} />

        {/* 🔹 Pantalla principal (se ve después de iniciar sesión) */}
        <Route path="/home" element={<Home registros={registros} />} />

        {/* 🔹 Página de registro */}
        <Route
          path="/registro"
          element={<RegistroPage onRegistrar={agregarRegistro} />}
        />

        {/* Redirección si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
