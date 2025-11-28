// src/App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import RegistroPage from "./pages/RegistroPage";
import Login from "./pages/Login";
import AchievementsPage from "./pages/AchievementsPage";
import SocialPage from "./pages/SocialPage";

import { calculateStats } from "./utils/gamification";
import NotificationProvider from "./components/NotificationProvider";
import StatsNotifier from "./components/StatsNotifier";
import GraficosPage from "./pages/GraficosPage";

function App() {
  // Registros guardados en localStorage
  const [registros, setRegistros] = useState(() => {
    const saved = localStorage.getItem("registros");
    return saved ? JSON.parse(saved) : [];
  });

  // Stats derivadas de los registros
  const [stats, setStats] = useState(() => calculateStats([]));

  // Cada vez que cambien los registros, se recalculan stats y se guarda en localStorage
  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
    setStats(calculateStats(registros));
  }, [registros]);

  const agregarRegistro = (nuevo) => {
    setRegistros((prev) => [...prev, nuevo]);
  };

  return (
    <Router>
      <NotificationProvider>
        <StatsNotifier stats={stats} />
        <Routes>
          {/* Pantalla inicial -> Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />

          {/* Pantalla principal (Mi registro) */}
          <Route
            path="/home"
            element={<Home registros={registros} stats={stats} />}
          />

          {/* Página para registrar avance */}
          <Route
            path="/registro"
            element={<RegistroPage onRegistrar={agregarRegistro} />}
          />

          {/* Página de logros (insignias, niveles, racha, ranking) */}
          <Route
            path="/logros"
            element={<AchievementsPage stats={stats} />}
          />

          {/* Página social (feed de avances) */}
          <Route
            path="/social"
            element={<SocialPage registros={registros} />}
          />

          <Route path="/graficos" element={<GraficosPage />} />

          {/* Cualquier otra ruta incorrecta vuelve al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </NotificationProvider>
    </Router>
  );
}

export default App;
