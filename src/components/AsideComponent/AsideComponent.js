import React from 'react';
import CompanyBlock from '../CompanyBlock/CompanyBlock';

import NavMenu from '../NavMenu/NavMenu';
import s from './AsideComponent.module.scss';

export default function AsideComponent() {
  return (
    <aside className={s.mainAside}>
      <CompanyBlock />
      <NavMenu />
    </aside>
  );
}
