import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { ordersActions } from './';

const initNumOrder = { valueNum: 0, valueStr: '0' };
const initAllProducts = [
  {
    id: 1,
    checkProduct: false,
    art: '',
    color: '',
    quantity: '1',
    price: '0',
    discount: '0',
    sum: '0',
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
const changeLineProductInputQuantity = (state, payload) =>
  state.map(item => {
    return item.id === payload.id
      ? { ...item, [payload.name]: payload.value }
      : item;
  });
const calculateSum = (state, payload) =>
  state.map(item => {
    return item.id === payload.id
      ? {
          ...item,
          sum:
            Number(item.quantity) * Number(item.price) -
            (Number(item.quantity) *
              Number(item.price) *
              Number(item.discount)) /
              100,
        }
      : item;
  });
const createLineProduct = state => {
  const newId = state.length + 1;

  return [
    ...state,
    {
      id: newId,
      checkProduct: false,
      art: '',
      color: '',
      quantity: '1',
      price: '0',
      discount: '0',
      sum: '0',
      note: '',
    },
  ];
};

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
  [ordersActions.createLineProduct]: state => createLineProduct(state),
  [ordersActions.changeLineProductInput]: (state, { payload }) =>
    changeLineProductInput(state, payload),
  [ordersActions.getPriceByArtSuccess]: (state, { payload }) =>
    state.map(item => {
      return item.art === payload.art
        ? { ...item, price: payload.prices.wholesale }
        : item;
    }),
  [ordersActions.changeLineProductInputQuantity]: (state, { payload }) =>
    changeLineProductInputQuantity(state, payload),
  [ordersActions.calculateSum]: (state, { payload }) =>
    calculateSum(state, payload),
});

export default combineReducers({
  allOrders,
  allProducts,
  numOrder,
});
