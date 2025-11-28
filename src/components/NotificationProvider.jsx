import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const NotificationContext = createContext(null);

export function useNotification() {
  return useContext(NotificationContext);
}

let idCounter = 1;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback(({ title, message, duration = 4000, icon }) => {
    const id = idCounter++;
    setToasts((t) => [...t, { id, title, message, icon }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, duration);
    }
  }, []);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ show, remove }}>
      {children}
      <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map((t) => (
          <div key={t.id} style={{ minWidth: 260, background: "#222", color: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.2)", display: "flex", gap: 10, alignItems: "center" }}>
            {t.icon && <div style={{ fontSize: 20 }}>{t.icon}</div>}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: 14 }}>{t.title}</strong>
              {t.message && <span style={{ fontSize: 13, opacity: 0.9 }}>{t.message}</span>}
            </div>
            <button onClick={() => remove(t.id)} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
