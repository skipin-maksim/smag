import React from 'react';

import s from './CloseBtn.module.scss';

export default function CloseBtn({ onClick, name, path, idx }) {
  const handleCloseBtn = () => (name ? onClick(name, path, idx) : onClick());

  return (
    <button onClick={handleCloseBtn} className={s.tabCloseBtn} type="button">
      <span className="visually-hidden">close button</span>
    </button>
  );
}
