import React from 'react';

import s from './Spinner.module.scss';

export default function Spinner() {
  return (
    <div className={s.loaderWrapper}>
      <div className={s.loader}>
        <p
          className={s.spinnerSmag}
          style={{ color: '#1C2B4A', fontSize: '40px' }}
        >
          <span className={s.wordS}>S</span>
          <span className={s.wordM}>M</span>
          <span className={s.wordA}>A</span>
          <span className={s.wordG}>G</span>
        </p>
      </div>
    </div>
  );
}
