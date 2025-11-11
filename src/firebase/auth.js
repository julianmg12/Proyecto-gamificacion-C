// src/firebase/auth.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

// 👉 Iniciar sesión
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Login exitoso:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error.message);
    throw error;
  }
};

// 👉 Crear usuario
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Registro exitoso:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Error al registrar:", error.message);
    throw error;
  }
};

