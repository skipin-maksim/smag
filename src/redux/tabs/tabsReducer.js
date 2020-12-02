import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { tabsActions } from './';
import ordersActions from '../orders/ordersActions';

const initialStateItem = [{ name: 'Главная', path: '/' }];

const addTab = (state, payload) => {
  const isTabs = state.find(item => item.name === payload.name);

  if (!isTabs) return [...state, payload];

  return state;
};
const removeTab = (state, payload) => {
  if (state.length === 1) {
    return initialStateItem;
  }

  return state.filter(item => item.name !== payload);
};

const items = createReducer(initialStateItem, {
  [tabsActions.addTab]: (state, { payload }) => addTab(state, payload),
  [tabsActions.removeTab]: (state, { payload }) => removeTab(state, payload),
  [tabsActions.addTabOrder]: (state, { payload }) => addTab(state, payload),
  [ordersActions.saveOrderSuccess]: (state, { payload }) => {
    const newState = state.filter(item => item.path !== '/orders/new-order');

    return [...newState, payload.createTabForNewOrder.payload];
  },
});

export default combineReducers({
  items,
});
