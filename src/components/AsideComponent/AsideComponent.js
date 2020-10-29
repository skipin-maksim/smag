import React from 'react';
import CompanyBlock from '../CompanyBlock/CompanyBlock';

import NavMenu from '../NavMenu/NavMenu';

export default function AsideComponent() {
  return (
    <aside className="main-aside">
      <CompanyBlock />
      <NavMenu />
    </aside>
  );
}
