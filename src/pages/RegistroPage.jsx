import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function RegistroPage({ onRegistrar }) {
  const navigate = useNavigate();

  // --- ESTADOS ---
  const [curso, setCurso] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [queHice, setQueHice] = useState("");

  const [comoHice, setComoHice] = useState("");
  const [recurso, setRecurso] = useState("");

  const [dificultad, setDificultad] = useState(50);
  const [tiempo, setTiempo] = useState(1);
  const [comprension, setComprension] = useState(50);
  const [usoRecurso, setUsoRecurso] = useState(false);
  const [trabajoGrupo, setTrabajoGrupo] = useState(false);

  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const obtenerEmojiDificultad = (valor) => {
    if (valor < 20) return "😴";
    if (valor < 40) return "🙂";
    if (valor < 60) return "😐";
    if (valor < 80) return "😰";
    return "🤯";
  };

  const emojiActual = obtenerEmojiDificultad(dificultad);
  const formValido = curso && proyecto && queHice;

  const handleNext = () => step < totalSteps - 1 && setStep(step + 1);
  const handlePrev = () => step > 0 && setStep(step - 1);

  const handleSubmit = () => {
    const registroNuevo = {
      titulo: proyecto,
      curso,
      proyecto,
      descripcion: queHice,
      comoHice: comoHice || "",
      recurso: recurso || "",
      dificultad,
      emojiDificultad: obtenerEmojiDificultad(dificultad),
      tiempo,
      comprension,
      usoRecurso,
      trabajoGrupo,
      fecha: new Date().toISOString(),
    };
    onRegistrar(registroNuevo);
    navigate("/home");
  };

  // --- ESTILOS GLOBALES ---
  const containerStyle = {
    background: "#faf7ff",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e7ddff",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "1rem",
  };

  const button = {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    flex: 1,
  };

  const nextBtn = (enabled) => ({
    ...button,
    background: enabled ? "#6541b5" : "#ccc",
    color: "white",
  });

  const backBtn = {
    ...button,
    background: "#eee",
    color: "#333",
  };

  const campoVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div 
    style={{
        margin: "0 auto",
        maxWidth: "690px",
        minWidth: "400px",
        padding: "16px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >

    <main
      style={{
        margin: "0 auto",
        maxWidth: "690px",
        minWidth: "400px",
        padding: "16px",
        minHeight: "67vh",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h2 style={{ margin: "0 0 10px 0", fontSize: "1.35rem", fontWeight: "bold" }}>
        Registrar avance
      </h2>

      <AnimatePresence mode="wait">
        {/*  SECCIÓN 1 — DATOS OBLIGATORIOS */}
        {step === 0 && (
          <motion.div
            key="step1"
            variants={campoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            style={containerStyle}
          >
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Información básica</h3>

            <label>Curso</label>
            <input
              style={inputStyle}
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
            />

            <label>Tarea / Proyecto</label>
            <input
              style={inputStyle}
              type="text"
              value={proyecto}
              onChange={(e) => setProyecto(e.target.value)}
            />

            <label>¿Qué hice?</label>
            <textarea
              style={{ ...inputStyle, minHeight: "80px" }}
              value={queHice}
              onChange={(e) => setQueHice(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button disabled={!formValido} onClick={handleNext} style={nextBtn(formValido)}>
                Siguiente
              </button>
            </div>
          </motion.div>
        )}

        {/* SECCIÓN 2 — OPCIONALES */}
        {step === 1 && (
          <motion.div
            key="step2"
            variants={campoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            style={containerStyle}
          >
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Detalles opcionales</h3>

            <label>¿Cómo lo hice? (opcional)</label>
            <textarea
              style={{ ...inputStyle, minHeight: "80px" }}
              value={comoHice}
              onChange={(e) => setComoHice(e.target.value)}
            />

            <label>Recurso o enlace (opcional)</label>
            <input
              style={inputStyle}
              type="text"
              value={recurso}
              onChange={(e) => setRecurso(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button onClick={handlePrev} style={backBtn}>Atrás</button>
              <button onClick={handleNext} style={nextBtn(true)}>Siguiente</button>
            </div>

          </motion.div>
        )}

        {/* SECCIÓN 3 — SLIDERS Y CHECKS */}
        {step === 2 && (
          <motion.div
            key="step3"
            variants={campoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            style={containerStyle}
          >
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Esfuerzo y comprensión</h3>

            <label>
              Dificultad: {emojiActual} {dificultad}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={dificultad}
              onChange={(e) => setDificultad(Number(e.target.value))}
              style={{ width: "100%" }}
            />

            <label>Tiempo invertido (horas): {tiempo}</label>
            <input
              type="range"
              min="0"
              max="8"
              value={tiempo}
              onChange={(e) => setTiempo(Number(e.target.value))}
              style={{ width: "100%" }}
            />

            <label>Comprensión: {comprension}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={comprension}
              onChange={(e) => setComprension(Number(e.target.value))}
              style={{ width: "100%" }}
            />

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={usoRecurso}
                onChange={(e) => setUsoRecurso(e.target.checked)}
              />
              Usé recursos externos
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={trabajoGrupo}
                onChange={(e) => setTrabajoGrupo(e.target.checked)}
              />
              Trabajo en grupo 👥
            </label>

            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button onClick={handlePrev} style={backBtn}>Atrás</button>
              <button onClick={handleSubmit} style={nextBtn(true)}>Registrar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>

    </div>
  );
}
