import { createAction } from '@reduxjs/toolkit';

const getAllOrdersRequest = createAction('order/getAllOrderRequest');
const getAllOrdersSuccess = createAction('order/getAllOrderSuccess');
const getAllOrdersError = createAction('order/getAllOrderError');

const getPriceByArtRequest = createAction('order/getPriceByArtRequest');
const getPriceByArtSuccess = createAction('order/getPriceByArtSuccess');
const getPriceByArtError = createAction('order/getPriceByArtError');

const removeOrder = createAction('order/removeOrder');
const editOrder = createAction('order/editOrder');
const saveOrder = createAction('order/saveOrder');

const createLineProduct = createAction('order/createLineProduct');
const deleteLineSelectedProduct = createAction(
  'order/deleteLineSelectedProduct',
);
const changeLineProductInput = createAction('order/changeLineProductInput');
const changeLineProductInputQuantity = createAction(
  'order/changeLineProductInputQuantity',
);
const calculateSum = createAction('orders/calculateSum');
const calculateTotalPositions = createAction('orders/calculateTotalPositions');
const calculateTotalQuantity = createAction('orders/calculateTotalQuantity');
const calculateTotalSum = createAction('orders/calculateTotalSum');
const calculateAveragePrice = createAction('orders/calculateAveragePrice');

const numOrderRequest = createAction('order/numOrderRequest');
const numOrderSuccess = createAction('order/numOrderSuccess');
const numOrderError = createAction('order/numOrderError');

export default {
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersError,

  getPriceByArtRequest,
  getPriceByArtSuccess,
  getPriceByArtError,

  numOrderRequest,
  numOrderSuccess,
  numOrderError,

  createLineProduct,
  deleteLineSelectedProduct,
  changeLineProductInput,
  changeLineProductInputQuantity,

  calculateSum,
  calculateTotalPositions,
  calculateAveragePrice,
  calculateTotalQuantity,
  calculateTotalSum,

  removeOrder,
  editOrder,
  saveOrder,
};
