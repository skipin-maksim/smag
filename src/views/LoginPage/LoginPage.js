import React from 'react';
import { Link } from 'react-router-dom';

import s from './LoginPage.module.scss';

export default function RootViews() {
  return (
    <div className={s.rootWrapper}>
      <div className={s.rootInner}>
        <input className={s.input} type={'text'} />
        <input className={s.input} type={'password'} />
        <Link className={s.login} to={'/'}>
          Перейти к приложению
        </Link>
      </div>
    </div>
  );
}
