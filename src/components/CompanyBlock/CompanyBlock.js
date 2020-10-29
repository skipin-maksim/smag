import React from 'react';

import Logo from '../CompanyBlock/Logo';

import s from './CompanyBlock.module.scss';

export default function CompanyBlock() {
  return (
    <div className={s.companyBlock}>
      <Logo />
      <h2 className={s.companyName}>Emanuela Ferretti</h2>
    </div>
  );
}
