import React from 'react';
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import notification from 'toastr';

import { tabsSelectors, tabsActions } from '../../redux/tabs';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders';

import CloseBtn from '../buttons/CloseBtn/CloseBtn';

import s from './HeaderComponent.module.scss';

const Tab = ({
  idx,
  path,
  name,
  label,
  tabsList,
  removeTab,
  currentOrder,
  onGetOrderById,
  onClearCurrentOrder,
  dataOfTemporaryStorageLocation,
  onSaveToTemporaryStorageLocation,
  onGetDataOfTemporaryStorageLocation,
}) => {
  const history = useHistory();
  const isArror = useSelector(state => state.orders.error);

  const { pathname } = history.location;

  const handleOnCloseTab = (name, path, idxItem) => {
    /*
        Ниже, условия при закрытии Табы. Куда должен перенестись роут.
        Влево от закрываемогоб, вправо или остаться на текущей
    */
    tabsList.reduce((previous, current) => {
      if (idxItem === 0 && tabsList.length === 1) {
        history.replace('/');
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

        if (Number(previous.label)) {
          onGetOrderById(previous.label);
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

  if (isArror !== null) {
    if (
      isArror.message.includes('Not found order id') &&
      pathname.includes(isArror.message.slice(-6))
    ) {
      setTimeout(() => {
        history.replace('/orders/');
      }, 0);
    }
  }

  const hendleClickOnTab = e => {
    e.preventDefault();

    const currentId = label;

    if (currentOrder.isEdit === 'изменяется') {
      notification.warning(
        `Для продолжения, сохраните изменения`,
        `Заказ в стадии изменения!!!`,
      );
      return;
    }

    if (currentId === 'new-order') {
      onGetDataOfTemporaryStorageLocation(dataOfTemporaryStorageLocation);
      history.replace(e.target.name);
      return;
    } else if (currentId === 'text tab') {
      history.replace(e.target.name);
      return;
    } else if (Number(currentId)) {
      onClearCurrentOrder();
      onGetOrderById(currentId);

      if (!currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);

      history.replace(e.target.name);
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
        onClick={e => hendleClickOnTab(e)}
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
