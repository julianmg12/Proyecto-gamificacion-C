import { useState } from "react";

export default function AddButton({ onClick }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      {/* Tooltip */}
      {isHover && (
        <div
          style={{
            position: "fixed",
            bottom: "150px",
            right: "24px",
            background: "rgba(50, 0, 120, 0.9)",
            color: "white",
            padding: "0.45rem 0.8rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
            zIndex: 10000,
            transition: "opacity 0.2s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          Añadir registro
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#6541b5",
          color: "white",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: isHover
            ? "0 6px 18px rgba(0,0,0,0.25)"
            : "0 4px 12px rgba(0,0,0,0.2)",
          transform: isHover ? "scale(1.1)" : "scale(1)",
          transition: "all 0.18s ease",
        }}
      >
        +
      </button>
    </>
  );
}
