
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function AchievementsPage({ stats }) {
  const badges = stats?.badges ?? [];

  // Ranking semanal ficticio
  const fakePlayers = [
    { nombre: "Peter Parker", xpWeekly: 180 },
    { nombre: "Alberta Ríos", xpWeekly: 160 },
    { nombre: "José Parker", xpWeekly: 140 },
  ];

  const userPlayer = {
    nombre: "Tú",
    xpWeekly: stats?.weeklyXP ?? 0,
  };

  const ranking = [...fakePlayers, userPlayer].sort(
    (a, b) => b.xpWeekly - a.xpWeekly
  );

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
        <section
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "12px",
            background: "#f7f3ff",
            border: "1px solid #e0d5ff",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "0.5rem",
              fontSize: "1.1rem",
              color: "#2a007f",
            }}
          >
            Nivel y racha 🎯
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.8rem",
              fontSize: "0.9rem",
            }}
          >
            <div
              style={{
                flex: "1 1 140px",
                background: "#fff",
                borderRadius: "10px",
                padding: "0.7rem 0.9rem",
                border: "1px solid #eadfff",
              }}
            >
              <div style={{ color: "#6b5a9f", fontSize: "0.8rem" }}>Nivel</div>
              <div style={{ fontWeight: 700, color: "#2a007f" }}>
                {stats?.levelName ?? "Novato"} (Lv.{stats?.levelNumber ?? 1})
              </div>
              <div style={{ fontSize: "0.8rem", color: "#6b5a9f" }}>
                XP para el siguiente nivel: {stats?.xpToNextLevel ?? 0}
              </div>
            </div>

            <div
              style={{
                flex: "1 1 140px",
                background: "#fff",
                borderRadius: "10px",
                padding: "0.7rem 0.9rem",
                border: "1px solid #eadfff",
              }}
            >
              <div style={{ color: "#6b5a9f", fontSize: "0.8rem" }}>
                Racha actual
              </div>
              <div style={{ fontWeight: 700, color: "#2a007f" }}>
                {stats?.streakDays ?? 0} días 🔥
              </div>
              <div style={{ fontSize: "0.8rem", color: "#6b5a9f" }}>
                Registros totales: {stats?.totalRegistros ?? 0}
              </div>
            </div>
          </div>
        </section>

        {/* Insignias */}
        <section style={{ marginBottom: "1.2rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
              color: "#2a007f",
            }}
          >
            Insignias 🏅
          </h2>

          {badges.length === 0 ? (
            <p style={{ fontSize: "0.9rem", color: "#5f4b8b" }}>
              Aún no hay insignias definidas.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "0.7rem",
              }}
            >
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    padding: "0.7rem 0.8rem",
                    borderRadius: "10px",
                    border: "1px solid #eadfff",
                    background: badge.unlocked ? "#ffffff" : "#f0eef7",
                    opacity: badge.unlocked ? 1 : 0.6,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: badge.unlocked ? "#2a007f" : "#7a6caa",
                    }}
                  >
                    {badge.nombre}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#5f4b8b",
                      marginTop: "0.3rem",
                    }}
                  >
                    {badge.descripcion}
                  </div>
                  <div
                    style={{
                      marginTop: "0.4rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: badge.unlocked ? "#1b8c3b" : "#8a7bb1",
                    }}
                  >
                    {badge.unlocked ? "Desbloqueada ✅" : "Bloqueada 🔒"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Ranking semanal */}
        <section>
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
              color: "#2a007f",
            }}
          >
            Ranking semanal 🏆
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr style={{ background: "#f2eefc", color: "#4a3b7a" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.4rem 0.5rem",
                    borderBottom: "1px solid #e0d5ff",
                  }}
                >
                  Pos.
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.4rem 0.5rem",
                    borderBottom: "1px solid #e0d5ff",
                  }}
                >
                  Jugador
                </th>
                <th
                  style={{
                    textAlign: "right",
                    padding: "0.4rem 0.5rem",
                    borderBottom: "1px solid #e0d5ff",
                  }}
                >
                  XP semanal
                </th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((player, index) => {
                const isYou = player === userPlayer;
                return (
                  <tr
                    key={player.nombre}
                    style={{
                      background: isYou ? "#f7f3ff" : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "0.35rem 0.5rem",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        padding: "0.35rem 0.5rem",
                        borderBottom: "1px solid #eee",
                        fontWeight: isYou ? 600 : 400,
                      }}
                    >
                      {player.nombre} {isYou && " (Tú)"}
                    </td>
                    <td
                      style={{
                        padding: "0.35rem 0.5rem",
                        borderBottom: "1px solid #eee",
                        textAlign: "right",
                      }}
                    >
                      {player.xpWeekly}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>

      <NavBar />
    </>
  );
}
