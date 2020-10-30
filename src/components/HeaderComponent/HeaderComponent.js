import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import tabsSelectors from '../../redux/tabs/tabsSelectors';
import tabsActions from '../../redux/tabs/tabsActions';

import s from './HeaderComponent.module.scss';

function HeaderComponent({ tabsList, removeTabs }) {
  return (
    <header className={s.headerLineTabs}>
      <ul className={s.lineListTabs}>
        {tabsList.map(tab => {
          return (
            <li className={s.tabLi} key={tab.name}>
              <NavLink
                exact
                to={tab.path}
                className={s.tab}
                activeClassName={s.tabActive}
              >
                {tab.name}
              </NavLink>
              <button
                onClick={() => removeTabs(tab.name)}
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
  removeTabs: tabsActions.removeTabs,
};

export default connect(mSTP, mDTP)(HeaderComponent);
