import React from 'react';

export default function AddButton({ onClick }) {
  return (
    <button className="add-btn" onClick={onClick}>
      +
    </button>
  );
}
