
import { useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function SocialPage({ registros = [] }) {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const sorted = [...registros].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  const handleLike = (idx) => {
    setLikes((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1,
    }));
  };

  const handleAddComment = (idx) => {
    const text = prompt("Escribe un comentario motivador ✨");
    if (!text) return;
    setComments((prev) => {
      const prevList = prev[idx] || [];
      return {
        ...prev,
        [idx]: [...prevList, text],
      };
    });
  };

  return (
    <>
      <Header />

      <main
        style={{
          padding: "1rem 1.5rem 4rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.1rem",
            marginBottom: "0.5rem",
            color: "#2a007f",
          }}
        >
          Feed social 💬
        </h2>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#5f4b8b",
            marginBottom: "0.8rem",
          }}
        >
          Aquí se visualizan los avances como si fueran publicaciones.
          Futuramente se puede conectar con un backend real o grupos de estudio.
        </p>

        {sorted.length === 0 ? (
          <p style={{ fontSize: "0.9rem", color: "#5f4b8b" }}>
            Aún no hay registros para mostrar en el feed.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {sorted.map((reg, idx) => {
              const fecha = new Date(reg.fecha).toLocaleString();
              const postId = idx;
              const postLikes = likes[postId] || 0;
              const postComments = comments[postId] || [];

              return (
                <article
                  key={idx}
                  style={{
                    padding: "0.8rem 0.9rem",
                    borderRadius: "10px",
                    border: "1px solid #e0d5ff",
                    background: "#f8f6ff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.3rem",
                      fontSize: "0.8rem",
                      color: "#7a6caa",
                    }}
                  >
                    <span>Estudiante anónimo</span>
                    <span>{fecha}</span>
                  </div>

                  <h3
                    style={{
                      margin: "0.2rem 0 0.3rem",
                      fontSize: "0.95rem",
                      color: "#2a007f",
                    }}
                  >
                    {reg.proyecto || reg.titulo || "Sin título"}
                  </h3>

                  {reg.descripcion && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        color: "#4a3b7a",
                      }}
                    >
                      {reg.descripcion}
                    </p>
                  )}

                  <div
                    style={{
                      marginTop: "0.5rem",
                      display: "flex",
                      gap: "0.5rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    <button
                      onClick={() => handleLike(postId)}
                      style={{
                        borderRadius: "999px",
                        border: "none",
                        padding: "0.25rem 0.7rem",
                        background: "#ece5ff",
                        color: "#2a007f",
                        cursor: "pointer",
                      }}
                    >
                      ❤️ {postLikes}
                    </button>

                    <button
                      onClick={() => handleAddComment(postId)}
                      style={{
                        borderRadius: "999px",
                        border: "none",
                        padding: "0.25rem 0.7rem",
                        background: "#ece5ff",
                        color: "#2a007f",
                        cursor: "pointer",
                      }}
                    >
                      💬 Comentar
                    </button>
                  </div>

                  {postComments.length > 0 && (
                    <div
                      style={{
                        marginTop: "0.6rem",
                        paddingTop: "0.4rem",
                        borderTop: "1px dashed #d2c7ff",
                      }}
                    >
                      {postComments.map((c, cIdx) => (
                        <p
                          key={cIdx}
                          style={{
                            margin: "0.15rem 0",
                            fontSize: "0.8rem",
                            color: "#4a3b7a",
                          }}
                        >
                          💭 {c}
                        </p>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>

      <NavBar />
    </>
  );
}
