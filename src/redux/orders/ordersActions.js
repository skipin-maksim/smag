import { createAction } from '@reduxjs/toolkit';

const getAllOrdersRequest = createAction('orders/getAllOrderRequest');
const getAllOrdersSuccess = createAction('orders/getAllOrderSuccess');
const getAllOrdersError = createAction('orders/getAllOrderError');

const getPriceByArtRequest = createAction('orders/getPriceByArtRequest');
const getPriceByArtSuccess = createAction('orders/getPriceByArtSuccess');
const getPriceByArtError = createAction('orders/getPriceByArtError');

const removeOrder = createAction('orders/removeOrder');
const editOrder = createAction('orders/editOrder');
const checkboxOrderSwitch = createAction('orders/checkboxOrderSwitch');

const saveOrderRequest = createAction('orders/saveOrderRequest');
const saveOrderSuccess = createAction('orders/saveOrderSuccess');
const saveOrderError = createAction('orders/saveOrderError');

const patchOrderRequest = createAction('orders/patchOrderRequest');
const patchOrderSuccess = createAction('orders/patchOrderSuccess');
const patchOrderError = createAction('orders/patchOrderError');

const clearCurrentOrder = createAction('orders/clearCurrentOrder');
const clearTemporaryStorageLocation = createAction(
  'orders/clearTemporaryStorageLocation',
);

const createLineProduct = createAction('orders/createLineProduct');
const createLineProductCopy = createAction('orders/createLineProductCopy');
const deleteLineSelectedProduct = createAction(
  'order/deleteLineSelectedProduct',
);
const changeLineProductInput = createAction('orders/changeLineProductInput');
const changeLineProductInputQuantity = createAction(
  'orders/changeLineProductInputQuantity',
);
const changeInputNoteForOrder = createAction('orders/changeInputNoteForOrder');
const changeMainCheckbox = createAction('orders/changeMainCheckbox');
const calculateSum = createAction('orders/calculateSum');
const calculateTotalPositions = createAction('orders/calculateTotalPositions');
const calculateTotalQuantity = createAction('orders/calculateTotalQuantity');
const calculateTotalSum = createAction('orders/calculateTotalSum');
const calculateAveragePrice = createAction('orders/calculateAveragePrice');
const calculateRemainderPaid = createAction('orders/calculateRemainderPaid');

const changePrepaymentInput = createAction('orders/changePrepaymentInput');

const getOrderByIdRequest = createAction('orders/getOrderByIdRequest');
const getOrderByIdSuccess = createAction('orders/getOrderByIdSuccess');
const getOrderByIdError = createAction('orders/getOrderByIdError');

const choiseClient = createAction('orders/choiseClient');

const filterClients = createAction('orders/filterClients');

const filterOrders = createAction('orders/filterOrders');

export default {
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersError,

  getPriceByArtRequest,
  getPriceByArtSuccess,
  getPriceByArtError,

  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderByIdError,

  clearCurrentOrder,
  clearTemporaryStorageLocation,

  createLineProduct,
  createLineProductCopy,
  deleteLineSelectedProduct,
  changeLineProductInput,
  changeLineProductInputQuantity,
  changeMainCheckbox,
  changeInputNoteForOrder,

  calculateSum,
  calculateTotalPositions,
  calculateAveragePrice,
  calculateTotalQuantity,
  calculateTotalSum,
  calculateRemainderPaid,

  changePrepaymentInput,

  removeOrder,
  editOrder,
  checkboxOrderSwitch,

  saveOrderRequest,
  saveOrderSuccess,
  saveOrderError,

  patchOrderRequest,
  patchOrderSuccess,
  patchOrderError,

  choiseClient,
  filterClients,
  filterOrders,
};
