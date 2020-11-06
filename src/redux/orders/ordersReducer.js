import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { ordersActions } from './';

const initNumOrder = { valueNum: 0, valueStr: '0' };

const addOrder = state => {
  const editCustomNumber = value => ('00000' + (value + 1)).substr(-5);

  return {
    valueNum: state.valueNum + 1,
    valueStr: editCustomNumber(state.valueNum),
  };
};
const getAllOrdersSuccess = (state, payload) => [...state, ...payload];

const numOrder = createReducer(initNumOrder, {
  [ordersActions.addOrder]: (state, _) => addOrder(state),
  [ordersActions.numOrderSuccess]: (_, { payload }) => payload,
  [ordersActions.saveOrder]: () => {},
  // [tabsActions.removeTab]: (state, { payload }) => {
  //   if (state.length === 1) return;
  //   return state.filter(item => item.name !== payload);
  // },
});

const allOrders = createReducer([], {
  // [ordersActions.addOrder]: (state, { payload }) => {},
  [ordersActions.getAllOrdersSuccess]: (state, { payload }) =>
    getAllOrdersSuccess(state, payload),
});

export default combineReducers({
  allOrders,
  numOrder,
});
