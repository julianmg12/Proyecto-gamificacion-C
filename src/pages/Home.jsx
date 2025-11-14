import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import AddButton from "../components/AddButton";
import NavBar from "../components/NavBar";

// Función para agrupar registros por fecha (día)
const agruparPorDia = (registros) => {
  return registros.reduce((acc, reg) => {
    const fecha = new Date(reg.fecha).toLocaleDateString();
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(reg);
    return acc;
  }, {});
};

export default function Home({ registros }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const obtenerEmojiDificultad = (valor) => {
    if (valor < 20) return "😴";
    if (valor < 40) return "🙂";
    if (valor < 60) return "😐";
    if (valor < 80) return "😰";
    return "🤯";
  };

  const registrosAgrupados = agruparPorDia(registros || []);

  return (
    <>
      <Header />

      <main
        style={{
          margin: "0 auto",
          maxWidth: "370px",
          minHeight: "67vh",
          position: "relative",
          padding: "16px",
        }}
      >
        <h2 style={{ marginBottom: "18px" }}>Mi Registro</h2>

        {!registros || registros.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            Aún no hay avances registrados.
          </p>
        ) : (
          <div
            style={{
              position: "relative",
              marginLeft: "20px",
              paddingLeft: "20px",
              borderLeft: "2px solid #ccc",
            }}
          >
            {Object.keys(registrosAgrupados).map((fecha) => (
              <div key={fecha} style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "12px",
                    fontWeight: "600",
                  }}
                >
                  {fecha}
                </h3>

                {registrosAgrupados[fecha].map((registro, index) => {
                  const dificultad = registro.dificultad ?? 30;
                  const emoji =
                    registro.emojiDificultad ??
                    obtenerEmojiDificultad(dificultad);

                  const globalIndex = `${fecha}-${index}`;

                  return (
                    <div
                      key={globalIndex}
                      style={{ marginBottom: "20px", position: "relative" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "-11px",
                          top: "14px",
                          width: "14px",
                          height: "14px",
                          backgroundColor: "#6541b5",
                          borderRadius: "50%",
                          border: "2px solid white",
                        }}
                      />

                      <div
                        onClick={() => toggleExpand(globalIndex)}
                        style={{
                          padding: "12px",
                          backgroundColor: "#f3f3f3",
                          borderRadius: "10px",
                          border: "1px solid #ddd",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                          {registro.proyecto || registro.titulo || "Sin título"}
                        </span>
                        <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
                      </div>

                      <AnimatePresence initial={false}>
                        {expanded === globalIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            style={{
                              marginTop: "10px",
                              padding: "14px",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              border: "1px solid #ccc",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                              overflow: "hidden",
                            }}
                          >
                            {registro.curso && (
                              <p>
                                <strong>Curso:</strong> {registro.curso}
                              </p>
                            )}
                            {registro.descripcion && (
                              <p>
                                <strong>Qué hice:</strong> {registro.descripcion}
                              </p>
                            )}
                            {registro.comoHice && (
                              <p>
                                <strong>Cómo lo hice:</strong> {registro.comoHice}
                              </p>
                            )}
                            {registro.recurso && (
                              <p>
                                <strong>Recurso:</strong>{" "}
                                <a
                                  href={registro.recurso}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {registro.recurso}
                                </a>
                              </p>
                            )}
                            <p>
                              <strong>Dificultad:</strong> {dificultad}% {emoji}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        <AddButton onClick={() => navigate("/registro")} />
      </main>

      <NavBar />
    </>
  );
}
