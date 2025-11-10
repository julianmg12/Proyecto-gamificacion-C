import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <span className="header-title">TuDiario</span>
      <span className="header-user">
        Usuario 0335
        <span role="img" aria-label="león" style={{ marginLeft: '8px' }}>🦁</span>
      </span>
    </header>
  );
}
