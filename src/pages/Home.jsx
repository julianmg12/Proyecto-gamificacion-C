import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import AddButton from "../components/AddButton";
import NavBar from "../components/NavBar";
import { getXPForRegistro } from "../utils/gamification";
import ProgressBar from "../components/Progress";

// Agrupa registros por día
const agruparPorDia = (registros) => {
  return registros.reduce((acc, reg) => {
    const fecha = new Date(reg.fecha).toLocaleDateString();
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(reg);
    return acc;
  }, {});
};

export default function Home({ registros = [], stats }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const registrosAgrupados = agruparPorDia(registros);

  const weeklyPercent =
    stats?.targetWeeklyXP && stats.targetWeeklyXP > 0
      ? Math.min(
          100,
          Math.round((stats.weeklyXP / stats.targetWeeklyXP) * 100)
        )
      : 0;

  return (
    <>
      <Header stats={stats} />

      <main
        style={{
          padding: "1rem 1.5rem 4rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* 🔥 Barra de progreso general del estudiante */}
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            background: "#faf6ff",
            borderRadius: "14px",
            border: "1px solid #e4d9ff",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px 0",
              fontSize: "1.2rem",
              color: "#2a007f",
              fontWeight: "700",
            }}
          >
            Progreso del Estudiante
          </h2>

          <div style={{ width: "85%", margin: "0 auto" }}>
            <ProgressBar />
          </div>
        </div>

        {/* Resumen de progreso */}
        <section
          style={{
            marginBottom: "1.2rem",
            padding: "1rem",
            borderRadius: "12px",
            background: "#f7f3ff",
            border: "1px solid #e0d5ff",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "0.6rem",
              fontSize: "1.1rem",
              color: "#2a007f",
            }}
          >
            Progreso de estudio 📈
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.8rem",
              fontSize: "0.9rem",
            }}
          >
            {/* XP semanal */}
            <div
              style={{
                flex: "1 1 120px",
                background: "#fff",
                borderRadius: "10px",
                padding: "0.6rem 0.8rem",
                border: "1px solid #eadfff",
              }}
            >
              <div style={{ color: "#6b5a9f", fontSize: "0.8rem" }}>
                XP semanal
              </div>
              <div style={{ fontWeight: 700, color: "#2a007f" }}>
                {stats?.weeklyXP ?? 0} / {stats?.targetWeeklyXP ?? 0}
              </div>
              <div
                style={{
                  marginTop: "0.4rem",
                  height: "6px",
                  borderRadius: "999px",
                  background: "#e1d6ff",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${weeklyPercent}%`,
                    height: "100%",
                    background: "#6541b5",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>

            {/* Racha */}
            <div
              style={{
                flex: "1 1 120px",
                background: "#fff",
                borderRadius: "10px",
                padding: "0.6rem 0.8rem",
                border: "1px solid #eadfff",
              }}
            >
              <div style={{ color: "#6b5a9f", fontSize: "0.8rem" }}>
                Racha actual
              </div>
              <div style={{ fontWeight: 700, color: "#2a007f" }}>
                {stats?.streakDays ?? 0} días 🔥
              </div>
            </div>

            {/* Registros totales */}
            <div
              style={{
                flex: "1 1 120px",
                background: "#fff",
                borderRadius: "10px",
                padding: "0.6rem 0.8rem",
                border: "1px solid #eadfff",
              }}
            >
              <div style={{ color: "#6b5a9f", fontSize: "0.8rem" }}>
                Registros totales
              </div>
              <div style={{ fontWeight: 700, color: "#2a007f" }}>
                {stats?.totalRegistros ?? 0}
              </div>
            </div>
          </div>
        </section>

        {/* Lista de registros */}
        <section>
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.6rem",
              color: "#2a007f",
            }}
          >
            Mi registro
          </h2>

          {!registros || registros.length === 0 ? (
            <p style={{ fontSize: "0.95rem", color: "#5f4b8b" }}>
              Aún no hay avances registrados. Usa el botón <strong>+</strong> para
              empezar tu primera racha. 💪
            </p>
          ) : (
            Object.keys(registrosAgrupados).map((fecha) => (
              <div key={fecha} style={{ marginBottom: "1rem" }}>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "0.4rem",
                    color: "#4a3b7a",
                  }}
                >
                  {fecha}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  {registrosAgrupados[fecha].map((registro, index) => {
                    const globalIndex = `${fecha}-${index}`;
                    const xp = getXPForRegistro(registro);

                    return (
                      <div
                        key={globalIndex}
                        onClick={() => toggleExpand(globalIndex)}
                        style={{
                          padding: "10px 12px",
                          backgroundColor: "#f3f3f3",
                          borderRadius: "10px",
                          border: "1px solid #ddd",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "0.95rem",
                              color: "#222",
                            }}
                          >
                            {registro.proyecto || registro.titulo || "Sin título"}
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "#6541b5",
                              fontWeight: 600,
                            }}
                          >
                            +{xp} XP
                          </div>
                        </div>

                        {expanded === globalIndex && (
                          <div
                            style={{
                              marginTop: "0.3rem",
                              fontSize: "0.85rem",
                              color: "#444",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.2rem",
                            }}
                          >
                            {registro.curso && (
                              <div>
                                <strong>Curso:</strong> {registro.curso}
                              </div>
                            )}

                            {registro.descripcion && (
                              <div>
                                <strong>Qué hice:</strong> {registro.descripcion}
                              </div>
                            )}

                            {registro.comoHice && (
                              <div>
                                <strong>Cómo lo hice:</strong> {registro.comoHice}
                              </div>
                            )}

                            {registro.recurso && (
                              <div>
                                <strong>Recurso:</strong>{" "}
                                <a
                                  href={registro.recurso}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ color: "#6541b5" }}
                                >
                                  {registro.recurso}
                                </a>
                              </div>
                            )}

                            <div>
                              <strong>Dificultad:</strong>{" "}
                              {registro.dificultad ?? 0}%
                            </div>
                            <div>
                              <strong>Tiempo invertido:</strong>{" "}
                              {registro.tiempo ?? 0} h
                            </div>
                            <div>
                              <strong>Comprensión:</strong>{" "}
                              {registro.comprension ?? 0}%
                            </div>
                            <div>
                              <strong>Recurso externo:</strong>{" "}
                              {registro.usoRecurso ? "Sí" : "No"}
                            </div>
                            <div>
                              <strong>Trabajo en grupo:</strong>{" "}
                              {registro.trabajoGrupo ? "Sí" : "No"}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </section>

        <AddButton onClick={() => navigate("/registro")} />
      </main>

      <NavBar />
    </>
  );
}


