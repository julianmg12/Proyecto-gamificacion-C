export default function AchievementsPage({ stats }) {
  const badges = stats?.badges ?? [];

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

      <main
        style={{
          padding: "1rem 1.5rem 4rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* 🎖️ INSIGNIAS */}
        <section style={{ marginBottom: "1.5rem" }}>
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
              Aún no tienes insignias desbloqueadas.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "0.8rem",
              }}
            >
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    padding: "0.8rem",
                    borderRadius: "10px",
                    border: "1px solid #eadfff",
                    background: badge.unlocked ? "#ffffff" : "#f0eef7",
                    opacity: badge.unlocked ? 1 : 0.6,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
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
                      marginTop: "0.5rem",
                      fontSize: "0.75rem",
                      color: badge.unlocked ? "#1b8c3b" : "#8a7bb1",
                      fontWeight: 600,
                    }}
                  >
                    {badge.unlocked ? "Desbloqueada ✅" : "Bloqueada 🔒"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🏆 RANKING SEMANAL */}
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
                    padding: "0.5rem",
                    borderBottom: "1px solid #e0d5ff",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.5rem",
                    borderBottom: "1px solid #e0d5ff",
                  }}
                >
                  Jugador
                </th>
                <th
                  style={{
                    textAlign: "right",
                    padding: "0.5rem",
                    borderBottom: "1px solid #e0d5ff",
                  }}
                >
                  XP
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
                        padding: "0.5rem",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #eee",
                        fontWeight: isYou ? 600 : 400,
                      }}
                    >
                      {player.nombre} {isYou && "(Tú)"}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
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

    </>
  );
}
