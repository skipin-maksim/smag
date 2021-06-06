import React, { useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import notification from 'toastr';

import { tabsSelectors, tabsActions } from '../../redux/tabs';
import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../redux/orders';

import CloseBtn from '../buttons/CloseBtn/CloseBtn';

import s from './HeaderComponent.module.scss';

export default function Tab({ idx, path, name, label }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;

  const isError = useSelector(ordersSelectors.getIsError);
  const tabsList = useSelector(tabsSelectors.getTabsList);
  const currentOrder = useSelector(ordersSelectors.getCurrentOrder);
  const dataOfTemporaryStorageLocation = useSelector(
    ordersSelectors.getDataOfTemporaryStorageLocation,
  );

  const onRemoveTab = useCallback(
    name => dispatch(tabsActions.removeTab(name)),
    [dispatch],
  );

  const onClearCurrentOrder = useCallback(
    () => dispatch(ordersActions.clearCurrentOrder()),
    [dispatch],
  );

  const onGetOrderById = useCallback(
    id => dispatch(ordersOperations.getOrderById(id)),
    [dispatch],
  );

  const onSaveToTemporaryStorageLocation = useCallback(
    currentOrder =>
      dispatch(tabsActions.saveToTemporaryStorageLocation(currentOrder)),
    [dispatch],
  );

  const onGetDataOfTemporaryStorageLocation = useCallback(
    currentOrderData =>
      dispatch(tabsActions.getDataOfTemporaryStorageLocation(currentOrderData)),
    [dispatch],
  );

  const handleOnCloseTab = (name, path, idxItem) => {
    /*
        Ниже, условия при закрытии Табы. Куда должен перенестись роут.
        Влево от закрываемогоб, вправо или остаться на текущей
    */
    tabsList.reduce((previous, current) => {
      if (idxItem === 0 && tabsList.length === 1) {
        history.replace('/');
        onRemoveTab(name);
        return current;
      }
      if (idxItem === 0 && tabsList[1] && pathname === path) {
        onRemoveTab(name);
        history.replace(tabsList[1].path);
        return current;
      }

      if (current.path === path && pathname === path) {
        history.replace(previous.path);

        if (Number(previous.label)) {
          onGetOrderById(previous.label);
        }
        onRemoveTab(name);
        return current;
      }

      if (current.path !== path && pathname !== path) {
        onRemoveTab(name);
        return current;
      }

      return current;
    }, tabsList[0]);
  };

  if (isError !== null) {
    if (
      isError.message.includes('Not found order id') &&
      pathname.includes(isError.message.slice(-6))
    ) {
      setTimeout(() => {
        history.replace('/orders/');
      }, 0);
    }
  }

  const hendleClickOnTab = e => {
    e.preventDefault();

    const currentId = label;

    if (currentOrder.isEdit === 'changes') {
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
}
