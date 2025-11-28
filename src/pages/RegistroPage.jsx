// src/pages/RegistroPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BRAND = {
  primary: "#6541b5",
  lightPrimary: "#f2eefc",
  cardBg: "#fff",
  pageBg: "#faf8ff",
};

function computeXP({ tiempo = 0, dificultad = 50, comprension = 50, trabajoGrupo = false }) {
  const base = 10;
  const timeFactor = Math.max(0, Number(tiempo)) * 5;
  const diffFactor = (Number(dificultad) || 0) * 0.4;
  const compFactor = (Number(comprension) || 0) * 0.2;
  const groupBonus = trabajoGrupo ? 12 : 0;
  const total = Math.round(base + timeFactor + diffFactor + compFactor + groupBonus);
  return total;
}

export default function RegistroPage({ onRegistrar } = {}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    proyecto: "",
    curso: "",
    descripcion: "",
    comoHice: "",
    recurso: "",
    dificultad: 50,
    tiempo: 1,
    comprension: 50,
    usoRecurso: false,
    trabajoGrupo: false,
    fecha: new Date().toISOString().slice(0, 10),
  });

  const [xp, setXp] = useState(() => computeXP(form));
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    setXp(computeXP(form));
  }, [form]);

  const onChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const guardarRegistro = () => {
    if (!form.titulo.trim() && !form.descripcion.trim()) {
      setSavedMsg("Añade un título o una descripción para guardar el avance.");
      return;
    }

    const nuevo = {
      ...form,
      xpGained: xp,
      fecha: form.fecha || new Date().toISOString().slice(0, 10),
      id: Date.now(),
    };

    // guarda en localStorage (compatibilidad con el resto)
    const existentes = JSON.parse(localStorage.getItem("registros") || "[]");
    existentes.unshift(nuevo);
    localStorage.setItem("registros", JSON.stringify(existentes));

    // NOTA IMPORTANTE: llama onRegistrar si fue pasada por props
    if (typeof onRegistrar === "function") {
      try {
        onRegistrar(nuevo);
      } catch (e) {
        // no bloquear si falla
        console.warn("onRegistrar callback failed", e);
      }
    }

    setSavedMsg("Registro guardado ✅");
    setTimeout(() => {
      setSavedMsg("");
      navigate("/home");
    }, 700);
  };

  const resetForm = () =>
    setForm({
      titulo: "",
      proyecto: "",
      curso: "",
      descripcion: "",
      comoHice: "",
      recurso: "",
      dificultad: 50,
      tiempo: 1,
      comprension: 50,
      usoRecurso: false,
      trabajoGrupo: false,
      fecha: new Date().toISOString().slice(0, 10),
    });

  return (
    <div style={{ background: BRAND.pageBg, minHeight: "100vh", paddingBottom: 120 }}>
      <div style={{ maxWidth: 980, margin: "18px auto", padding: 20 }}>
        <h2 style={{ color: "#2a007f" }}>Registrar actividad</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div style={{ background: "#fff", padding: 16, borderRadius: 12 }}>
            <h3>Datos básicos</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input placeholder="Título" value={form.titulo} onChange={(e) => onChange("titulo", e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
              <input placeholder="Proyecto/etiqueta" value={form.proyecto} onChange={(e) => onChange("proyecto", e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
              <input placeholder="Curso (opcional)" value={form.curso} onChange={(e) => onChange("curso", e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
              <input type="date" value={form.fecha} onChange={(e) => onChange("fecha", e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
            </div>

            <h3 style={{ marginTop: 12 }}>Qué hice / Cómo lo hice</h3>
            <textarea rows={3} placeholder="Qué hiciste..." value={form.descripcion} onChange={(e) => onChange("descripcion", e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
            <textarea rows={2} placeholder="Cómo lo hiciste..." value={form.comoHice} onChange={(e) => onChange("comoHice", e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee", marginTop: 8 }} />

            <h3 style={{ marginTop: 12 }}>Recursos</h3>
            <input placeholder="URL recurso (opcional)" value={form.recurso} onChange={(e) => onChange("recurso", e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={form.usoRecurso} onChange={(e) => onChange("usoRecurso", e.target.checked)} />
                Usé recurso externo
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={form.trabajoGrupo} onChange={(e) => onChange("trabajoGrupo", e.target.checked)} />
                Trabajo en grupo
              </label>
            </div>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", padding: 16, borderRadius: 12 }}>
              <h3>Tiempo & dificultad</h3>
              <div style={{ marginBottom: 10 }}>
                <label>Tiempo (horas)</label>
                <input type="number" min="0" step="0.25" value={form.tiempo} onChange={(e) => onChange("tiempo", e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #eee" }} />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Dificultad: {form.dificultad}%</label>
                <input type="range" min="0" max="100" value={form.dificultad} onChange={(e) => onChange("dificultad", e.target.value)} style={{ width: "100%" }} />
              </div>
              <div>
                <label>Comprensión: {form.comprension}%</label>
                <input type="range" min="0" max="100" value={form.comprension} onChange={(e) => onChange("comprension", e.target.value)} style={{ width: "100%" }} />
              </div>
            </div>

            <div style={{ background: "#fff", padding: 16, borderRadius: 12 }}>
              <h3>XP estimada</h3>
              <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.primary }}>{xp} XP</div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button onClick={guardarRegistro} style={{ flex: 1, background: BRAND.primary, color: "#fff", padding: 10, borderRadius: 8, border: "none", fontWeight: 700 }}>Guardar</button>
                <button onClick={resetForm} style={{ padding: 10, borderRadius: 8, border: "1px solid #eee", background: "#fff" }}>Limpiar</button>
              </div>

              {savedMsg && <div style={{ marginTop: 12, padding: 8, borderRadius: 8, background: "#e9f8ed", color: "#1f6a36", fontWeight: 600 }}>{savedMsg}</div>}
            </div>

            <div style={{ background: "#fff", padding: 12, borderRadius: 12 }}>
              <strong>Consejos</strong>
              <ul style={{ marginTop: 8 }}>
                <li>Registra la fecha real.</li>
                <li>Incluye cómo lo hiciste para mejorar la retroalimentación.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
