import { createAction } from '@reduxjs/toolkit';

const numOrderRequest = createAction('NUMORDER_numOrderRequest');
const numOrderSuccess = createAction('NUMORDER_numOrderSuccess');
const numOrderError = createAction('NUMORDER_numOrderError');

export default {
  numOrderRequest,
  numOrderSuccess,
  numOrderError,
};
