import React from 'react';

import s from './CloseBtn.module.scss';

export default function CloseBtn({
  onClick,
  name,
  path,
  idx,
  additionalClassName,
}) {
  return (
    <button
      onClick={() => onClick(name, path, idx)}
      className={
        additionalClassName
          ? `${s.tabCloseBtn} ${additionalClassName}`
          : s.tabCloseBtn
      }
      type="button"
    >
      <span className="visually-hidden">close button</span>
    </button>
  );
}
