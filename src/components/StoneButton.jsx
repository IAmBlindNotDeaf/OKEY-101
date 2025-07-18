import React from 'react';
import './StoneButton.css';

const farben = {
  rot: '#d32f2f',
  schwarz: '#222',
  blau: '#1976d2',
  gelb: '#fbc02d',
};

function StoneButton({ wert, selected, onClick, colorType }) {
  return (
    <button
      className={`stein-button${selected ? ' selected' : ''}`}
      style={{
        borderColor: farben[colorType] || '#888',
        color: farben[colorType] || '#222',
        background: selected ? '#fffde7' : '#fff',
        fontWeight: selected ? 'bold' : 'normal',
      }}
      onClick={onClick}
    >
      {wert}
    </button>
  );
}

export default StoneButton; 