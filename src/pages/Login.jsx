import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../firebase/auth";
import "../reset.css";
import signinImg from "../assets/signin.svg";
import signupImg from "../assets/signup.svg";
import logo from "../assets/logo.svg";

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        await signIn(email, password);
        navigate("/home");
      } else {
        await signUp(email, password);
        navigate("/home");
      }
    } catch (err) {
      setError("⚠️ " + err.message);
    }
  };

  const heroTitle = isSignIn ? "¡Bienvenido de nuevo!" : "¡Únete a la aventura!";
  const heroText = isSignIn
    ? "Accede a tu cuenta para continuar y sumar XP."
    : "Crea tu cuenta y comienza a acumular logros.";
  const heroImage = isSignIn ? signinImg : signupImg;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(120deg, #f7f3ff, #e0d4ff)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "900px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          background: "#fff",
        }}
      >
        {/* Lado izquierdo */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #6541b5, #9575cd)",
            color: "#fff",
            padding: "40px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <img src={logo} alt="Logo" style={{ width: "80px" }} />
          </div>

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "12px", color:"#9de0e6" }}>TuDiario</h2>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{heroTitle}</h2>
            <p style={{ fontSize: "1rem", marginBottom: "20px" }}>{heroText}</p>
            <img src={heroImage} alt={isSignIn ? "Sign In" : "Sign Up"} style={{ width: "200px", marginTop: "10px" }} />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px", width: "100%" }}>
            <button
              onClick={() => setIsSignIn(true)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "12px",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
                background: isSignIn ? "#fff" : "rgba(255,255,255,0.2)",
                color: isSignIn ? "#6541b5" : "#fff",
                transition: "0.3s",
              }}
            >
              🔑 Iniciar sesión
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "12px",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
                background: !isSignIn ? "#fff" : "rgba(255,255,255,0.2)",
                color: !isSignIn ? "#6541b5" : "#fff",
                transition: "0.3s",
              }}
            >
              ✨ Registrarse
            </button>
          </div>
        </div>

        {/* Lado derecho */}
        <div style={{ flex: 1, padding: "40px 30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            {!isSignIn && (
              <>
                <label style={{ marginBottom: "6px", fontWeight: 500 }}>Nombre de usuario</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    marginBottom: "16px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    fontSize: "0.95rem",
                  }}
                />
              </>
            )}
            <label style={{ marginBottom: "6px", fontWeight: 500 }}>Email</label>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                marginBottom: "16px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "0.95rem",
              }}
            />
            <label style={{ marginBottom: "6px", fontWeight: 500 }}>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                marginBottom: "16px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "0.95rem",
              }}
            />
            {error && <p style={{ color: "#e53935", fontWeight: 600, marginBottom: "10px" }}>{error}</p>}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                background: "#6541b5",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                marginBottom: "12px",
                transition: "0.3s",
              }}
            >
              {isSignIn ? "Entrar 🚀" : "Registrarse 🎉"}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
              {isSignIn ? (
                <>¿No tienes cuenta? <a onClick={() => setIsSignIn(false)} style={{ color: "#6541b5", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>Regístrate aquí</a></>
              ) : (
                <>¿Ya tienes cuenta? <a onClick={() => setIsSignIn(true)} style={{ color: "#6541b5", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>Inicia sesión</a></>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
