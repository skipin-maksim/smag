import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { ordersActions } from './';

const editCustomNumber = value => ('00000' + (value + 1)).substr(-5);

const numOrder = createReducer(
  { valueNum: 0, valueStr: '0' },
  {
    [ordersActions.addOrder]: (state, { payload }) => {
      const customNumber = editCustomNumber(state.valueNum);

      return { valueNum: state.valueNum + 1, valueStr: customNumber };
    },
    [ordersActions.numOrderSuccess]: (state, { payload }) => payload,
    // [tabsActions.removeTab]: (state, { payload }) => {
    //   if (state.length === 1) return;
    //   return state.filter(item => item.name !== payload);
    // },
  },
);

const allOrders = createReducer([], {
  // [ordersActions.addOrder]: (state, { payload }) => {},
  [ordersActions.getAllOrdersSuccess]: (state, { payload }) => [
    ...state,
    ...payload,
  ],
});

export default combineReducers({
  allOrders,
  numOrder,
});
