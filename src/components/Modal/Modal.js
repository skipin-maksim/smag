import React, { useEffect, useCallback } from 'react';

export default function Modal({ children, onCloseModal }) {
  const handleKeydown = useCallback(
    ({ code }) => {
      if (code === 'Escape') onCloseModal();
    },
    [onCloseModal],
  );

  const handleMouseClick = ({ target }) => {
    if (target.className === 'Overlay') onCloseModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div className="Overlay" onClick={handleMouseClick}>
      <div className="Modal">{children}</div>
    </div>
  );
}
