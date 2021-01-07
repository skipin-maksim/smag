import React from 'react';

import s from './DefaultBtn.module.scss';

export default function DefaultBtn({ handleOnClick, text, customClassName }) {
  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={`${s.defaultBtn} ${s[customClassName]}`}
    >
      {text}
    </button>
  );
}
