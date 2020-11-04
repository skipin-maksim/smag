import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsSelectors, tabsActions, tabsOperations } from '../../redux/tabs/';

import s from './HeaderComponent.module.scss';

function HeaderComponent({ tabsList, removeTabs, testRemove }) {
  return (
    <header className={s.headerLineTabs}>
      <ul className={s.lineListTabs}>
        {tabsList.map(({ name, path }) => {
          return (
            <li className={s.tabLi} key={name}>
              <NavLink
                exact
                to={path}
                className={s.tab}
                activeClassName={s.tabActive}
              >
                {name}
              </NavLink>
              <Link
                to="/"
                // onClick={() => removeTabs({ name, tabsList })}
                onClick={() => testRemove(name)}
                className={s.tabCloseBtn}
                type="button"
              >
                <span className="visually-hidden">close button</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}

const mSTP = state => ({
  tabsList: tabsSelectors.getTabsList(state),
});

const mDTP = {
  removeTabs: tabsActions.removeTabs,
  testRemove: tabsOperations.getTabsList,
};

export default connect(mSTP, mDTP)(HeaderComponent);
