
import { useState, useEffect } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function SocialPage({ registros = [] }) {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("socialComments");
    return saved ? JSON.parse(saved) : {};
  });
  const [commentInput, setCommentInput] = useState({});
  const [likedPosts, setLikedPosts] = useState({});

  const sorted = [...registros].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  // Guardar comentarios en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("socialComments", JSON.stringify(comments));
  }, [comments]);

  const handleLike = (idx) => {
    setLikes((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1,
    }));
    setLikedPosts((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleAddComment = (idx) => {
    const text = commentInput[idx]?.trim();
    if (!text) return;
    
    setComments((prev) => {
      const prevList = prev[idx] || [];
      return {
        ...prev,
        [idx]: [...prevList, { text, author: "Tú", timestamp: new Date() }],
      };
    });
    setCommentInput((prev) => ({
      ...prev,
      [idx]: "",
    }));
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "hace unos segundos";
    if (diffMins < 60) return `hace ${diffMins}m`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    if (diffDays < 7) return `hace ${diffDays}d`;
    return new Date(date).toLocaleDateString();
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty < 20) return "#90EE90";
    if (difficulty < 40) return "#FFD700";
    if (difficulty < 60) return "#FFA500";
    if (difficulty < 80) return "#FF6347";
    return "#DC143C";
  };

  const getDifficultyEmoji = (difficulty) => {
    if (difficulty < 20) return "😴";
    if (difficulty < 40) return "🙂";
    if (difficulty < 60) return "😐";
    if (difficulty < 80) return "😰";
    return "🤯";
  };

  return (
    <>
      <Header />

      <main
        style={{
          padding: "1.2rem 1rem 5rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "0.3rem",
              color: "#2a007f",
              letterSpacing: "-0.5px",
            }}
          >
            📚 Feed de Avances
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#7a6caa",
              margin: 0,
            }}
          >
            Celebra tus logros con la comunidad
          </p>
        </div>

        {sorted.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f8f6ff 0%, #ece5ff 100%)",
              border: "2px dashed #d2c7ff",
            }}
          >
            <p style={{ fontSize: "2rem", margin: "0.5rem 0" }}>📝</p>
            <p style={{ fontSize: "0.95rem", color: "#2a007f", fontWeight: 600, margin: "0.5rem 0" }}>
              Aún no hay registros
            </p>
            <p style={{ fontSize: "0.8rem", color: "#7a6caa", margin: 0 }}>
              ¡Registra tu primer avance para verlo aquí!
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sorted.map((reg, idx) => {
              const postId = idx;
              const postLikes = likes[postId] || 0;
              const postComments = comments[postId] || [];
              const isLiked = likedPosts[postId];

              return (
                <article
                  key={idx}
                  style={{
                    padding: "1rem",
                    borderRadius: "12px",
                    background: "#fff",
                    border: "1px solid #e0d5ff",
                    boxShadow: "0 2px 8px rgba(107, 65, 181, 0.08)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(107, 65, 181, 0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(107, 65, 181, 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Header con Avatar y Metadata */}
                  <div style={{ display: "flex", gap: "0.8rem", marginBottom: "0.8rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6541b5 0%, #8b5cf6 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        flexShrink: 0,
                        boxShadow: "0 2px 4px rgba(107, 65, 181, 0.2)",
                      }}
                    >
                      📚
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
                        <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#2a007f" }}>
                          {reg.proyecto || reg.titulo || "Sin título"}
                        </h3>
                      </div>
                      <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "#9987c4" }}>
                        Estudiante anónimo • {getTimeAgo(reg.fecha)}
                      </p>
                    </div>
                  </div>

                  {/* Contenido */}
                  {reg.descripcion && (
                    <p
                      style={{
                        margin: "0 0 0.8rem",
                        fontSize: "0.9rem",
                        color: "#4a3b7a",
                        lineHeight: 1.5,
                      }}
                    >
                      {reg.descripcion}
                    </p>
                  )}

                  {/* Badges y Metadata */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
                    {reg.dificultad && (
                      <span
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "6px",
                          background: `${getDifficultyColor(reg.dificultad)}20`,
                          color: getDifficultyColor(reg.dificultad),
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {getDifficultyEmoji(reg.dificultad)} Dificultad {reg.dificultad}%
                      </span>
                    )}
                    {reg.tiempo && (
                      <span
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "6px",
                          background: "#ece5ff",
                          color: "#6541b5",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        ⏱️ {reg.tiempo}h
                      </span>
                    )}
                    {reg.usoRecurso && (
                      <span
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "6px",
                          background: "#d4edda",
                          color: "#155724",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        🔗 Recurso externo
                      </span>
                    )}
                    {reg.trabajoGrupo && (
                      <span
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "6px",
                          background: "#cce5ff",
                          color: "#004085",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        👥 Trabajo en grupo
                      </span>
                    )}
                  </div>

                  {/* Acciones - Likes y Comentarios */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      paddingBottom: "0.8rem",
                      borderBottom: "1px solid #f0ebf8",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <button
                      onClick={() => handleLike(postId)}
                      style={{
                        flex: 1,
                        padding: "0.6rem 0.8rem",
                        borderRadius: "8px",
                        border: isLiked ? "2px solid #ff6b6b" : "1px solid #d2c7ff",
                        background: isLiked ? "#ffe0e0" : "#f8f6ff",
                        color: isLiked ? "#ff6b6b" : "#6541b5",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isLiked ? "#ffcccc" : "#ece5ff";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isLiked ? "#ffe0e0" : "#f8f6ff";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {isLiked ? "❤️" : "🤍"} {postLikes} {postLikes === 1 ? "me gusta" : "me gustan"}
                    </button>

                    <button
                      onClick={() => {
                        const input = document.querySelector(`[data-comment-input="${postId}"]`);
                        if (input) input.focus();
                      }}
                      style={{
                        flex: 1,
                        padding: "0.6rem 0.8rem",
                        borderRadius: "8px",
                        border: "1px solid #d2c7ff",
                        background: "#f8f6ff",
                        color: "#6541b5",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ece5ff";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f8f6ff";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      💬 {postComments.length} {postComments.length === 1 ? "comentario" : "comentarios"}
                    </button>
                  </div>

                  {/* Sección de Comentarios */}
                  {postComments.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "0.8rem" }}>
                      {postComments.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          style={{
                            display: "flex",
                            gap: "0.6rem",
                            padding: "0.7rem",
                            borderRadius: "8px",
                            background: "#f8f6ff",
                            border: "1px solid #ece5ff",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#ede5ff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#f8f6ff";
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #6541b5 0%, #8b5cf6 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {c.author?.charAt(0).toUpperCase() || "C"}
                          </div>
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#2a007f" }}>
                                {c.author || "Anónimo"}
                              </span>
                              <span style={{ fontSize: "0.7rem", color: "#9987c4" }}>
                                {getTimeAgo(c.timestamp)}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: "0.8rem", color: "#4a3b7a", lineHeight: 1.4 }}>
                              {c.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input de Comentarios */}
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    <input
                      data-comment-input={postId}
                      type="text"
                      placeholder="Escribe algo motivador..."
                      value={commentInput[postId] || ""}
                      onChange={(e) =>
                        setCommentInput((prev) => ({
                          ...prev,
                          [postId]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(postId);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: "0.6rem 0.8rem",
                        borderRadius: "8px",
                        border: "1px solid #d2c7ff",
                        background: "#f8f6ff",
                        color: "#4a3b7a",
                        fontSize: "0.85rem",
                        outline: "none",
                        transition: "all 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#6541b5";
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(107, 65, 181, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#d2c7ff";
                        e.currentTarget.style.background = "#f8f6ff";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(postId)}
                      disabled={!commentInput[postId]?.trim()}
                      style={{
                        padding: "0.6rem 1rem",
                        borderRadius: "8px",
                        border: "none",
                        background: commentInput[postId]?.trim() ? "#6541b5" : "#d2c7ff",
                        color: "#fff",
                        cursor: commentInput[postId]?.trim() ? "pointer" : "default",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (commentInput[postId]?.trim()) {
                          e.currentTarget.style.background = "#5a35a0";
                          e.currentTarget.style.transform = "scale(1.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (commentInput[postId]?.trim()) {
                          e.currentTarget.style.background = "#6541b5";
                          e.currentTarget.style.transform = "scale(1)";
                        }
                      }}
                    >
                      Enviar
                    </button>
                  </div>
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
