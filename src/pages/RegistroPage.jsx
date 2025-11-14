import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function RegistroPage({ onRegistrar }) {
  const navigate = useNavigate();

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

  const totalSteps = 7;

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

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    flex: 1,
    transition: "0.2s",
  };

  const nextButtonStyle = (enabled) => ({
    ...buttonStyle,
    backgroundColor: enabled ? "#6541b5" : "#ccc",
    color: "#fff",
  });

  const prevButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#eee",
    color: "#333",
  };


  const campoVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <main style={{ margin: "0 auto", maxWidth: "370px", padding: "16px", minHeight: "67vh", display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2 style={{ marginBottom: "12px", fontSize: "1.3rem", fontWeight: "bold" }}>Registrar avance</h2>

      <AnimatePresence exitBeforeEnter>
        {step === 0 && (
          <motion.div key={0} variants={campoVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <label style={{ fontWeight: 500 }}>Curso</label>
            <input type="text" placeholder="Ingresa el curso" value={curso} onChange={(e) => setCurso(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <button disabled={!curso} onClick={handleNext} style={nextButtonStyle(!!curso)}>Siguiente</button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key={1} variants={campoVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <label style={{ fontWeight: 500 }}>Proyecto/Tarea</label>
            <input type="text" placeholder="Nombre del proyecto o tarea" value={proyecto} onChange={(e) => setProyecto(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <button onClick={handlePrev} style={prevButtonStyle}>Atrás</button>
              <button disabled={!proyecto} onClick={handleNext} style={nextButtonStyle(!!proyecto)}>Siguiente</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key={2} variants={campoVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <label style={{ fontWeight: 500 }}>¿Qué hice?</label>
            <textarea placeholder="Describe lo que hiciste" value={queHice} onChange={(e) => setQueHice(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "80px" }} />
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <button onClick={handlePrev} style={prevButtonStyle}>Atrás</button>
              <button disabled={!queHice} onClick={handleNext} style={nextButtonStyle(!!queHice)}>Siguiente</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key={3} variants={campoVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <label style={{ fontWeight: 500 }}>¿Cómo lo hice? (Opcional)</label>
            <textarea placeholder="Describe el proceso" value={comoHice} onChange={(e) => setComoHice(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "80px" }} />
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <button onClick={handlePrev} style={prevButtonStyle}>Atrás</button>
              <button onClick={handleNext} style={nextButtonStyle(true)}>Siguiente</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key={4} variants={campoVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <label style={{ fontWeight: 500 }}>Recurso / Link (Opcional)</label>
            <input type="text" placeholder="Incluye un enlace" value={recurso} onChange={(e) => setRecurso(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <button onClick={handlePrev} style={prevButtonStyle}>Atrás</button>
              <button onClick={handleNext} style={nextButtonStyle(true)}>Siguiente</button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key={5} variants={campoVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <label style={{ fontWeight: 500 }}>Dificultad del proyecto: {emojiActual} {dificultad}%</label>
            <input type="range" min="0" max="100" value={dificultad} onChange={(e) => setDificultad(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <button onClick={handlePrev} style={prevButtonStyle}>Atrás</button>
              <button onClick={handleNext} style={nextButtonStyle(true)}>Siguiente</button>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div key={6} variants={campoVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <label style={{ fontWeight: 500 }}>Tiempo invertido (horas): {tiempo}</label>
            <input type="range" min="0" max="8" value={tiempo} onChange={(e) => setTiempo(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />
            <label style={{ fontWeight: 500, marginTop: "12px" }}>Nivel de comprensión: {comprension}%</label>
            <input type="range" min="0" max="100" value={comprension} onChange={(e) => setComprension(Number(e.target.value))} style={{ width: "100%", cursor: "pointer" }} />

            <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={handlePrev} style={prevButtonStyle}>Atrás</button>
                <button disabled={!formValido} onClick={handleSubmit} style={nextButtonStyle(!!formValido)}>Registrar avance</button>
              </div>

              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={usoRecurso} onChange={(e) => setUsoRecurso(e.target.checked)} style={{ width: "18px", height: "18px" }} />
                  Usé recurso externo
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={trabajoGrupo} onChange={(e) => setTrabajoGrupo(e.target.checked)} style={{ width: "18px", height: "18px" }} />
                  Trabajo en grupo 👥
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
