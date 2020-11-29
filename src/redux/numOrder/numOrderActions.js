import { createAction } from '@reduxjs/toolkit';

const numOrderRequest = createAction('orders/numOrderRequest');
const numOrderSuccess = createAction('orders/numOrderSuccess');
const numOrderError = createAction('orders/numOrderError');

export default {
  numOrderRequest,
  numOrderSuccess,
  numOrderError,
};
