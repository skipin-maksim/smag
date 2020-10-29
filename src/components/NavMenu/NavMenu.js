import React from 'react';

import NavMenuItem from './NavMenuItem';

import menuList from '../../data/menuList';

import s from './NavMenu.module.scss';

export default function NavMenu() {
  return (
    <nav className={s.asideNav}>
      <ul className={s.navMenuList}>
        {menuList.map(item => {
          return <NavMenuItem key={item.name} item={item} />;
        })}
      </ul>
    </nav>
  );
}
