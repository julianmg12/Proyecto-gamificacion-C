// src/pages/Login.jsx
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

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Lado izquierdo */}
        <div className="login-left">
          <div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>

          <div
            className="hero-wrapper"
            style={{
              transform: isSignIn ? "translateY(0%)" : "translateY(-50%)",
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <div className="hero-section">
              <h2>¡Bienvenido de nuevo!</h2>
              <p>Accede a tu cuenta para continuar.</p>
              <img src={signinImg} alt="Sign In" />
            </div>

            <div className="hero-section">
              <h2>¡Únete a nosotros!</h2>
              <p>Crea una cuenta y comienza ahora.</p>
              <img src={signupImg} alt="Sign Up" />
            </div>
          </div>

          <div className="nav-buttons">
            <button
              className={isSignIn ? "active" : ""}
              onClick={() => setIsSignIn(true)}
            >
              🔑 Iniciar sesión
            </button>
            <button
              className={!isSignIn ? "active" : ""}
              onClick={() => setIsSignIn(false)}
            >
              ✨ Registrarse
            </button>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-form">
            {!isSignIn && (
              <>
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </>
            )}

            <label>Email</label>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit">
              {isSignIn ? "Entrar" : "Registrarse"}
            </button>

            <p className="toggle-text">
              {isSignIn ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <a onClick={() => setIsSignIn(false)}>Regístrate aquí</a>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <a onClick={() => setIsSignIn(true)}>Inicia sesión</a>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
