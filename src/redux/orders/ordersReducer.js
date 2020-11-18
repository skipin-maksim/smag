import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { ordersActions } from './';

const initNumOrder = { valueNum: 0, valueStr: '0' };
const initAllProducts = {
  items: [
    {
      id: uuidv4(),
      checkProduct: false,
      vendorCode: '',
      color: '',
      quantity: '0',
      price: '0',
      discount: '0',
      sum: '0',
      note: '',
    },
  ],
  calculatedTotals: [
    { positions: 1, quantity: 0, averagePrice: 0, sum: 0, prepayment: 0 },
  ],
};
const initCurrentContractorInfo = {
  id: '00001',
  numOrder: '00001',
  isSave: true,
  orderInfo: {
    positions: 10,
    totalQuantity: 100,
    sum: 1000,
    prepayment: 100,
    checkOrder: false,
  },
  contactInfo: {
    name: 'Григоренко Алексей Романович',
    city: 'Город',
    post: 'Новая почта №1',
    tel: '0509596984',
    debt: 0,
  },
  products: [],
  date: '',
};

const saveOrder = state => {
  // const editCustomNumber = value => ('00000' + (value + 1)).substr(-5);
  // return {
  //   valueNum: state.valueNum + 1,
  //   valueStr: editCustomNumber(state.valueNum),
  // };
  console.log('hi is in save');
};
const getAllOrdersSuccess = (state, payload) => {
  return [...state, ...payload];
};
const changeLineProductInput = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      // if (payload.choiceOption === 'checkAllProducts') {
      //   return { ...item, [payload.name]: payload.value };
      // }

      return item.id === payload.id
        ? { ...item, [payload.name]: payload.value }
        : item;
    }),
  };
};
const changeMainCheckbox = (state, payload) => {};
const getPriceByArtSuccess = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return item.vendorCode === payload.vendorCode
        ? { ...item, price: payload.prices.wholesale }
        : item;
    }),
  };
};
const changeLineProductInputQuantity = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return item.id === payload.id
        ? { ...item, [payload.name]: payload.value }
        : item;
    }),
  };
};
const deleteLineSelectedProduct = state => {
  return {
    ...state,
    items: state.items.filter(product => !product.checkProduct),
  };
};
const calculateSum = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
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
    }),
  };
};
const calculateTotalQuantity = state => {
  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      quantity: state.items.reduce((prev, cur) => {
        return Number(prev) + Number(cur.quantity);
      }, 0),
    },
  };
};
const calculateTotalSum = state => {
  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      sum: state.items.reduce((prev, cur) => {
        return Number(prev) + Number(cur.sum);
      }, 0),
    },
  };
};
const calculateAveragePrice = state => {
  const calcAveragePrice = state => {
    const totalPriceSum = state.items.reduce((prev, cur) => {
      return Number(prev) + Number(cur.price);
    }, 0);
    return totalPriceSum / state.items.length;
  };

  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      averagePrice: calcAveragePrice(state),
    },
  };
};
const createLineProduct = state => {
  return {
    ...state,
    items: [
      ...state.items,
      {
        id: uuidv4(),
        checkProduct: false,
        vendorCode: '',
        color: '',
        quantity: '0',
        price: '0',
        discount: '0',
        sum: '0',
        note: '',
      },
    ],
  };
};

const calculateTotalPositions = state => {
  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      positions: state.items.length,
    },
  };
};

const numOrder = createReducer(initNumOrder, {
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
  [ordersActions.changeMainCheckbox]: (state, { payload }) =>
    changeMainCheckbox(state, payload),
  [ordersActions.getPriceByArtSuccess]: (state, { payload }) =>
    getPriceByArtSuccess(state, payload),
  [ordersActions.changeLineProductInputQuantity]: (state, { payload }) =>
    changeLineProductInputQuantity(state, payload),
  [ordersActions.deleteLineSelectedProduct]: (state, _) =>
    deleteLineSelectedProduct(state),
  [ordersActions.calculateSum]: (state, { payload }) =>
    calculateSum(state, payload),
  [ordersActions.calculateTotalQuantity]: (state, _) =>
    calculateTotalQuantity(state),
  [ordersActions.calculateTotalSum]: (state, _) => calculateTotalSum(state),
  [ordersActions.calculateAveragePrice]: (state, _) =>
    calculateAveragePrice(state),
  [ordersActions.calculateTotalPositions]: (state, _) =>
    calculateTotalPositions(state),
});

const savedOrders = createReducer([], {
  [ordersActions.saveOrder]: (state, _) => saveOrder(state),
});

const currentContractorInfo = createReducer(initCurrentContractorInfo, {
  [ordersActions.saveOrder]: (state, { payload }) => '',
});

export default combineReducers({
  allOrders,
  allProducts,
  numOrder,
  savedOrders,
  currentContractorInfo,
});
