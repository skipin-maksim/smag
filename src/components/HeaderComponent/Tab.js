import React from 'react';
import { NavLink, withRouter, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsSelectors, tabsActions } from '../../redux/tabs/';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders';

import CloseBtn from '../Buttons/CloseBtn';

import routes from '../../routes';

import s from './HeaderComponent.module.scss';

const Tab = ({
  idx,
  path,
  name,
  history,
  tabsList,
  removeTab,
  currentOrder,
  onGetOrderById,
  onClearCurrentOrder,
  dataOfTemporaryStorageLocation,
  onSaveToTemporaryStorageLocation,
  onGetDataOfTemporaryStorageLocation,
}) => {
  const match = useRouteMatch();

  const handleOnCloseTab = (name, path, idxItem) => {
    const { pathname } = history.location;
    /*
        Ниже, условия при закрытии Табы. Куда должен перенестись роут.
        Влево от закрываемогоб, вправо или остаться на текущей
    */
    tabsList.reduce((previous, current) => {
      if (idxItem === 0 && tabsList.length === 1) {
        history.replace(routes.HomePage);
        removeTab(name);
        return current;
      }
      if (idxItem === 0 && tabsList[1] && pathname === path) {
        removeTab(name);
        history.replace(tabsList[1].path);
        return current;
      }

      if (current.path === path && pathname === path) {
        history.replace(previous.path);

        if (Number(previous.path.slice(12))) {
          onGetOrderById(previous.path.slice(12));
        }
        removeTab(name);
        return current;
      }

      if (current.path !== path && pathname !== path) {
        removeTab(name);
        return current;
      }

      return current;
    }, tabsList[0]);
  };

  const getDataOrderById = tabId => {
    console.log(match);
    const currentId = tabId.slice(12);

    if (currentId === 'new-order') {
      onGetDataOfTemporaryStorageLocation(dataOfTemporaryStorageLocation);

      return;
    } else if (currentId === '') {
      return;
    } else {
      onClearCurrentOrder();
      onGetOrderById(currentId);

      if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);
    }
  };

  return (
    <li className={s.tabLi}>
      <NavLink
        exact
        name={path}
        to={path}
        className={s.tab}
        activeClassName={s.tabActive}
        onClick={({ target }) => getDataOrderById(target.name)}
      >
        {name}
      </NavLink>

      <CloseBtn onClick={handleOnCloseTab} name={name} path={path} idx={idx} />
    </li>
  );
};

const mSTP = (state, ownProps) => ({
  tabsList: tabsSelectors.getTabsList(state),
  currentOrder: ordersSelectors.getCurrentOrder(state),
  dataOfTemporaryStorageLocation: ordersSelectors.getDataOfTemporaryStorageLocation(
    state,
  ),
});

const mDTP = {
  removeTab: tabsActions.removeTab,
  onClearCurrentOrder: ordersActions.clearCurrentOrder,
  onGetOrderById: ordersOperations.getOrderById,

  onSaveToTemporaryStorageLocation: tabsActions.saveToTemporaryStorageLocation,
  onGetDataOfTemporaryStorageLocation:
    tabsActions.getDataOfTemporaryStorageLocation,
};

export default withRouter(connect(mSTP, mDTP)(Tab));
