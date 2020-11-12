import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { ordersActions } from './';

const initNumOrder = { valueNum: 0, valueStr: '0' };
const initAllProducts = [
  {
    id: 1,
    art: '',
    color: '',
    quantity: '',
    price: '',
    discount: '',
    sum: '',
    note: '',
  },
  {
    id: 2,
    art: '',
    color: '',
    quantity: '',
    price: '',
    discount: '',
    sum: '',
    note: '',
  },
];

const addOrder = state => {
  const editCustomNumber = value => ('00000' + (value + 1)).substr(-5);

  return {
    valueNum: state.valueNum + 1,
    valueStr: editCustomNumber(state.valueNum),
  };
};
const getAllOrdersSuccess = (state, payload) => [...state, ...payload];
const changeLineProductInput = (state, payload) =>
  state.map(item => {
    return item.id === payload.id
      ? { ...item, [payload.name]: payload.value }
      : item;
  });

const numOrder = createReducer(initNumOrder, {
  [ordersActions.addOrder]: (state, _) => addOrder(state),
  [ordersActions.numOrderSuccess]: (_, { payload }) => payload,
  [ordersActions.saveOrder]: () => {},
});

const allOrders = createReducer([], {
  [ordersActions.getAllOrdersSuccess]: (state, { payload }) =>
    getAllOrdersSuccess(state, payload),
});

const allProducts = createReducer(initAllProducts, {
  [ordersActions.createLineProduct]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [ordersActions.changeLineProductInput]: (state, { payload }) =>
    changeLineProductInput(state, payload),
  [ordersActions.getPriceByArtSuccess]: (state, { payload }) =>
    state.map(item => {
      return item.art === payload.art
        ? { ...item, price: payload.prices.wholesale }
        : item;
    }),
});

export default combineReducers({
  allOrders,
  allProducts,
  numOrder,
});
