import { createAction } from '@reduxjs/toolkit';

const addOrder = createAction('order/addOrder');
const removeOrder = createAction('order/removeOrder');
const editOrder = createAction('order/editOrder');

const numOrderRequest = createAction('order/numOrderRequest');
const numOrderSuccess = createAction('order/numOrderSuccess');
const numOrderError = createAction('order/numOrderError');

const getAllOrdersRequest = createAction('order/getAllOrderRequest');
const getAllOrdersSuccess = createAction('order/getAllOrderSuccess');
const getAllOrdersError = createAction('order/getAllOrderError');

export default {
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersError,
  numOrderRequest,
  numOrderSuccess,
  numOrderError,
  addOrder,
  removeOrder,
  editOrder,
};
