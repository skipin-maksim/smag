import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsSelectors, tabsActions } from '../../redux/tabs/';

import s from './NavMenu.module.scss';

function NavMenuItem({ item, addTabs }) {
  const { name, path, icon } = item;

  return (
    <li className={s.navMenuItem}>
      <NavLink
        exact
        to={path}
        className={s.navItemLink}
        activeClassName={s.navItemLinkActive}
        onClick={() => addTabs({ name, path })}
        name={name}
      >
        <div className={s.iconItem}>{icon}</div>
        {name}
      </NavLink>
    </li>
  );
}

const mSTP = state => ({
  tabsList: tabsSelectors.getTabsList(state),
});

const mDTP = {
  addTabs: tabsActions.addTabs,
};

export default connect(mSTP, mDTP)(NavMenuItem);
