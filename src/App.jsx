// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import RegistroPage from "./pages/RegistroPage";
import Login from "./pages/Login";
import AchievementsPage from "./pages/AchievementsPage";
import SocialPage from "./pages/SocialPage";
import GraficosPage from "./pages/GraficosPage";
import ConnectionsPage from "./pages/ConnectionsPage";

import Header from "./components/Header";
import NavBar from "./components/NavBar";

import { calculateStats } from "./utils/gamification";
import NotificationProvider from "./components/NotificationProvider";
import StatsNotifier from "./components/StatsNotifier";

import { FriendsProvider } from "./contexts/FriendsContext"; // asegúrate de crear este archivo

// Layout component que decide cuándo mostrar Header/NavBar
function AppLayout({ children }) {
  const location = useLocation();
  const hideUI = location.pathname === "/login" || location.pathname === "/registro";

  return (
    <>
      {!hideUI && <Header />}
      <main style={{ paddingTop: hideUI ? 0 : 72, paddingBottom: hideUI ? 0 : 84, minHeight: "calc(100vh - 72px)" }}>
        {children}
      </main>
      {!hideUI && <NavBar />}
    </>
  );
}

export default function App() {
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
        <FriendsProvider>
          <StatsNotifier stats={stats} />
          <AppLayout>
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

              {/* Gráficos */}
              <Route path="/graficos" element={<GraficosPage />} />

              {/* Conexiones / Amigos */}
              <Route path="/connections" element={<ConnectionsPage />} />

              {/* Cualquier otra ruta incorrecta vuelve al login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AppLayout>
        </FriendsProvider>
      </NotificationProvider>
    </Router>
  );
}
