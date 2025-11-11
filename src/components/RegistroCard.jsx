import React from 'react';

export default function RegistroCard({ registro }) {
  if (!registro)
    return (
      <div className="registro-empty">
        <span className="registro-icon">📚</span>
        <p>Aún no tienes registros.</p>
        <span>Usa el botón para registrar tu primer progreso.</span>
      </div>
    );

  return (
    <div className="registro-card">
      <div className="registro-header">
        <span>Usuario 0335</span>
        <span className="registro-points">⭐ {registro.puntos} Puntos</span>
      </div>
      <div className="registro-content">
        <strong>🧩 {registro.titulo}</strong>
        <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#444' }}>
          {registro.descripcion}
        </div>
      </div>
      <div className="registro-comment-area">
        <span style={{ color: '#3498db', cursor: 'pointer' }}>Ver recursos</span>
        <span style={{ marginLeft: '16px' }}>0 Comentarios</span>
      </div>
    </div>
  );
}
