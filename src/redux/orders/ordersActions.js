import { createAction } from '@reduxjs/toolkit';

const getAllOrdersRequest = createAction('order/getAllOrderRequest');
const getAllOrdersSuccess = createAction('order/getAllOrderSuccess');
const getAllOrdersError = createAction('order/getAllOrderError');

const getPriceByArtRequest = createAction('order/getPriceByArtRequest');
const getPriceByArtSuccess = createAction('order/getPriceByArtSuccess');
const getPriceByArtError = createAction('order/getPriceByArtError');

const addOrder = createAction('order/addOrder');
const removeOrder = createAction('order/removeOrder');
const editOrder = createAction('order/editOrder');
const saveOrder = createAction('order/saveOrder');

const createLineProduct = createAction('order/createLineProduct');
const changeLineProductInput = createAction('order/changeLineProductInput');

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
  changeLineProductInput,

  addOrder,
  removeOrder,
  editOrder,
  saveOrder,
};
