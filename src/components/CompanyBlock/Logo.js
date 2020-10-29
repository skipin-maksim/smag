import React from 'react';

import logoImg from '../../assets/images/logo.jpg';

import s from './CompanyBlock.module.scss';

export default function Logo() {
  return (
    <div className={s.logoWrapper}>
      <img className={s.logo} src={logoImg} alt="logo" />
    </div>
  );
}
