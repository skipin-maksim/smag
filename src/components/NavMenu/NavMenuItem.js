import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { tabsActions } from '../../redux/tabs/';

import s from './NavMenu.module.scss';

const NavMenuItem = ({ item }) => {
  const { name, path, icon } = item;
  const dispatch = useDispatch();

  const addTab = useCallback(
    tabData => {
      dispatch(tabsActions.addTab(tabData));
    },
    [dispatch],
  );

  return (
    <li className={s.navMenuItem}>
      <NavLink
        exact
        to={path}
        className={s.navItemLink}
        activeClassName={s.navItemLinkActive}
        onClick={() => addTab({ name, path, label: 'text tab' })}
        name={name}
      >
        <div className={s.iconItem}>{icon}</div>
        {name}
      </NavLink>
    </li>
  );
};

export default NavMenuItem;
