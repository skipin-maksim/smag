import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { tabsActions, func } from '.';
import ordersActions from '../orders/ordersActions';

const initialStateItem = [];

const items = createReducer(initialStateItem, {
  [tabsActions.addTab]: (state, { payload }) => {
    return func.addTab(state, payload);
  },
  [tabsActions.removeTab]: (state, { payload }) => {
    return func.removeTab(state, payload);
  },
  [tabsActions.addTabOrder]: (state, { payload }) => {
    return func.addTab(state, payload);
  },
  [ordersActions.saveOrderSuccess]: (state, { payload }) => {
    const newState = state.filter(item => item.path !== `/orders/new-order`);

    return func.addTab(newState, {
      name: `Заказ №${payload.orderNum}`,
      path: `/orders/${payload.orderNum}`,
      label: payload.orderNum,
    });
  },
  [ordersActions.getOrderByIdError]: (state, { payload }) => {
    const newState = state.filter(item => item.label !== payload.id);

    return newState;
  },
  [ordersActions.removeOrdersSuccess]: (state, { payload }) => {
    const removeData = payload.tabsOrders;
    const stateTabs = state;

    const newArrTabs = stateTabs.filter(
      ({ label }) => !removeData.includes(label),
    );

    return newArrTabs;
  },
});

const positionData = createReducer(
  { width: 0, left: 0 },
  {
    [tabsActions.widthLineTabs]: (state, { payload }) => {
      return { ...state, width: payload };
    },
    [tabsActions.moveSlideLeft]: (state, { payload }) => {
      return { ...state, left: payload };
    },
  },
);

export default combineReducers({
  items,
  positionData,
});
