import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./reset.css"; // ✅ se importa aquí una sola vez

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

