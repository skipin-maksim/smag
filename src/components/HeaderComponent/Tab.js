import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import CloseBtn from '../Buttons/CloseBtn';

import { tabsSelectors, tabsActions } from '../../redux/tabs/';

import s from './HeaderComponent.module.scss';
import { ordersSelectors } from '../../redux/orders';

const Tab = ({ name, idx, history, path, tabsList, removeTab }) => {
  const handleOnCloseTab = (name, path, idxItem) => {
    console.log(name, path, idxItem);
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
  };

  return (
    <li className={s.tabLi}>
      <NavLink
        exact
        name={path}
        to={path}
        className={s.tab}
        activeClassName={s.tabActive}
        onClick={({ target }) => {
          console.log(history);
          console.log(target.name.slice(8));
        }}
      >
        {name}
      </NavLink>

      <CloseBtn onClick={handleOnCloseTab} name={name} path={path} idx={idx} />
    </li>
  );
};

const mSTP = state => ({
  tabsList: tabsSelectors.getTabsList(state),
  orderById: ordersSelectors.getOrderById(state),
});

const mDTP = {
  removeTab: tabsActions.removeTab,
};

export default connect(mSTP, mDTP)(Tab);
