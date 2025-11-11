import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RegistroPage from "./pages/RegistroPage";

function App() {
  const [registros, setRegistros] = useState(() => {
    const saved = localStorage.getItem("registros");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  const agregarRegistro = (nuevo) => {
    setRegistros((prev) => [...prev, nuevo]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home registros={registros} />} />
        <Route path="/registro" element={<RegistroPage onRegistrar={agregarRegistro} />} />
      </Routes>
    </Router>
  );
}

export default App;
