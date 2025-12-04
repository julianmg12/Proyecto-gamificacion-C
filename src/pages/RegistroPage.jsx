import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function RegistroPage({ onRegistrar }) {
  const navigate = useNavigate();

  // --- ESTADOS ORIGINALES ---
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

  // --- NUEVO: estado para pantalla final ---
  const [mostrandoFinal, setMostrandoFinal] = useState(false);

  // --- NUEVO: cursos dinámicos ---
  const cursosIniciales = ["Programación I", "Bases de Datos", "IA", "Cálculo", "Nuevo curso..."];
  const [listaCursos, setListaCursos] = useState(cursosIniciales);

  // --- NUEVO: input flotante ---
  const [addingCurso, setAddingCurso] = useState(false);
  const [nuevoCursoNombre, setNuevoCursoNombre] = useState("");

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

  // --- MODIFICADO: muestra pantalla final antes de navegar ---
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

    setMostrandoFinal(true);
    setTimeout(() => navigate("/home"), 2500);
  };

  // --- ESTILOS ORIGINALES ---
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

  const sliderShake =
    dificultad > 80
      ? { rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }
      : {};

  const progress = ((step + 1) / totalSteps) * 100;

  // --- SI ESTÁ MOSTRANDO PANTALLA FINAL ---
  if (mostrandoFinal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "4rem" }}
        >
          🎉
        </motion.div>

        <h2 style={{ marginTop: "10px" }}>¡Registro completado!</h2>
        <p style={{ maxWidth: "300px", color: "#555" }}>
          Tu avance fue guardado con éxito. ¡Sigue acumulando logros!
        </p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1 }}
          style={{
            height: "4px",
            background: "#6541b5",
            borderRadius: "4px",
            marginTop: "20px",
          }}
        ></motion.div>
      </motion.div>
    );
  }

  // 🌟 UI PRINCIPAL
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

        {/* BARRA DE PROGRESO */}
        <div
          style={{
            height: "6px",
            width: "100%",
            background: "#e5d9ff",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "6px",
          }}
        >
          <motion.div
            style={{ height: "100%", background: "#6541b5" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1 ---------------------------------------------------------------- */}
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

              {/* TARJETAS DE CURSOS */}
              <label>Curso</label>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {listaCursos.map((c) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    key={c}
                    onClick={() => {
                      if (c === "Nuevo curso...") {
                        setAddingCurso(true);
                      } else {
                        setCurso(c);
                      }
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: curso === c ? "2px solid #6541b5" : "1px solid #ccc",
                      background: curso === c ? "#ece3ff" : "white",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    {c}
                  </motion.div>
                ))}

                {/* INPUT FLOTANTE PARA NUEVO CURSO */}
                <AnimatePresence>
                  {addingCurso && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex",
                        gap: "6px",
                        padding: "10px",
                        borderRadius: "10px",
                        border: "2px solid #6541b5",
                        background: "#f5efff",
                        width: "100%",
                      }}
                    >
                      <input
                        autoFocus
                        placeholder="Nombre del curso"
                        value={nuevoCursoNombre}
                        onChange={(e) => setNuevoCursoNombre(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          fontSize: "0.9rem",
                        }}
                      />

                      <button
                        onClick={() => {
                          if (!nuevoCursoNombre.trim()) return;

                          setListaCursos([
                            ...listaCursos.filter((c) => c !== "Nuevo curso..."),
                            nuevoCursoNombre,
                            "Nuevo curso...",
                          ]);

                          setCurso(nuevoCursoNombre);
                          setNuevoCursoNombre("");
                          setAddingCurso(false);
                        }}
                        style={{
                          background: "#6541b5",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "0 12px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        ✓
                      </button>

                      <button
                        onClick={() => {
                          setNuevoCursoNombre("");
                          setAddingCurso(false);
                        }}
                        style={{
                          background: "#eee",
                          color: "#333",
                          border: "none",
                          borderRadius: "6px",
                          padding: "0 10px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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

          {/* ---------------------------------------------------------------------- */}
          {/* STEP 2 */}
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
                <button onClick={handlePrev} style={backBtn}>
                  Atrás
                </button>
                <button onClick={handleNext} style={nextBtn(true)}>
                  Siguiente
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------------------------------------------------------------- */}
          {/* STEP 3 */}
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

              {/* Slider */}
              <motion.div animate={sliderShake}>
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
              </motion.div>

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
                <button onClick={handlePrev} style={backBtn}>
                  Atrás
                </button>
                <button onClick={handleSubmit} style={nextBtn(true)}>
                  Registrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
