import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsSelectors, tabsActions } from '../../redux/tabs/';

import s from './HeaderComponent.module.scss';

function HeaderComponent({ tabsList, removeTab, match, history }) {
  function handleOnCloseTab(name, path, idxItem) {
    tabsList.reduce((previous, current) => {
      if (idxItem === 0 && tabsList[1] && history.location.pathname === path) {
        history.replace(tabsList[1].path);
        return current;
      }

      if (current.path === path && history.location.pathname === path) {
        history.replace(previous.path);
        removeTab(name);
        return current;
      }

      if (current.path !== path && history.location.pathname !== path) {
        removeTab(name);
        return current;
      }

      return current;
    }, tabsList[0]);
  }

  return (
    <header className={s.headerLineTabs}>
      <ul className={s.lineListTabs}>
        {tabsList.map(({ name, path }, idx) => {
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
              <button
                // onClick={() => removeTab({ name, tabsList })}
                onClick={() => handleOnCloseTab(name, path, idx)}
                className={s.tabCloseBtn}
                type="button"
              >
                <span className="visually-hidden">close button</span>
              </button>
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
  removeTab: tabsActions.removeTab,
};

export default withRouter(connect(mSTP, mDTP)(HeaderComponent));
