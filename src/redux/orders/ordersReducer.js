import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { ordersActions } from './';

const initNumOrder = { valueNum: 0, valueStr: '0' };
const initAllProducts = [
  {
    id: uuidv4(),
    checkProduct: false,
    vendorCode: '',
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
const getAllOrdersSuccess = (state, payload) => {
  return [...state, ...payload];
};
const changeLineProductInput = (state, payload) => {
  return state.map(item => {
    if (payload.choiceOption === 'checkAllProducts') {
      return { ...item, [payload.name]: payload.value };
    }

    return item.id === payload.id
      ? { ...item, [payload.name]: payload.value }
      : item;
  });
};
const getPriceByArtSuccess = (state, payload) => {
  return state.map(item => {
    return item.vendorCode === payload.vendorCode
      ? { ...item, price: payload.prices.wholesale }
      : item;
  });
};
const changeLineProductInputQuantity = (state, payload) => {
  return state.map(item => {
    return item.id === payload.id
      ? { ...item, [payload.name]: payload.value }
      : item;
  });
};
const deleteLineSelectedProduct = state => {
  return state.filter(product => !product.checkProduct);
};
const calculateSum = (state, payload) => {
  return state.map(item => {
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
};
const createLineProduct = state => {
  return [
    ...state,
    {
      id: uuidv4(),
      checkProduct: false,
      vendorCode: '',
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
  [ordersActions.createLineProduct]: (state, _) => createLineProduct(state),
  [ordersActions.changeLineProductInput]: (state, { payload }) =>
    changeLineProductInput(state, payload),
  [ordersActions.getPriceByArtSuccess]: (state, { payload }) =>
    getPriceByArtSuccess(state, payload),
  [ordersActions.changeLineProductInputQuantity]: (state, { payload }) =>
    changeLineProductInputQuantity(state, payload),
  [ordersActions.deleteLineSelectedProduct]: (state, _) =>
    deleteLineSelectedProduct(state),
  [ordersActions.calculateSum]: (state, { payload }) =>
    calculateSum(state, payload),
});

export default combineReducers({
  allOrders,
  allProducts,
  numOrder,
});
