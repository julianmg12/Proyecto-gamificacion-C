// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_OKdjYCWAgDW1mxfX6hSZ65bGAICkPdU",
  authDomain: "proyecto-gamificacion-grupoc.firebaseapp.com",
  projectId: "proyecto-gamificacion-grupoc",
  storageBucket: "proyecto-gamificacion-grupoc.appspot.com", // ✅ corregido
  messagingSenderId: "310146150837",
  appId: "1:310146150837:web:5ba70430115e42edb129fc",
  measurementId: "G-NJQC2V3TR5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
