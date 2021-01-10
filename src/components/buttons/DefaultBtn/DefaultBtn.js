import React from 'react';

import s from './DefaultBtn.module.scss';

export default function DefaultBtn({
  type = 'button',
  handleOnClick,
  text,
  customClassName,
}) {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={`${s.defaultBtn} ${s[customClassName]}`}
    >
      {text}
    </button>
  );
}
