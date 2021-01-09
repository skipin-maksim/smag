import React, { useEffect } from 'react';

export default function Modal({ children, onCloseModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  const handleKeydown = ({ code }) => {
    if (code === 'Escape') onCloseModal();
  };

  const handleMouseClick = ({ target }) => {
    if (target.className === 'Overlay') onCloseModal();
  };

  return (
    <div className="Overlay" onClick={handleMouseClick}>
      <div className="Modal">{children}</div>
    </div>
  );
}
