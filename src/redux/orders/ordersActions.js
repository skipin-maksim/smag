import { createAction } from '@reduxjs/toolkit';

const addOrder = createAction('order/addOrder');
const removeOrder = createAction('order/removeOrder');
const editOrder = createAction('order/editOrder');

const numOrderRequest = createAction('order/numOrderRequest');
const numOrderSuccess = createAction('order/numOrderSuccess');
const numOrderError = createAction('order/numOrderError');

export default {
  numOrderRequest,
  numOrderSuccess,
  numOrderError,
  addOrder,
  removeOrder,
  editOrder,
};
