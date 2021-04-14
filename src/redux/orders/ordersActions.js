import { createAction } from '@reduxjs/toolkit';

const getAllOrdersRequest = createAction('ORDERS_getAllOrderRequest');
const getAllOrdersSuccess = createAction('ORDERS_getAllOrderSuccess');
const getAllOrdersError = createAction('ORDERS_getAllOrderError');

const getPriceByVendorCodeRequest = createAction(
  'ORDERS_getPriceByVendorCodeRequest',
);
const getPriceByVendorCodeSuccess = createAction(
  'ORDERS_getPriceByVendorCodeSuccess',
);
const getPriceByVendorCodeError = createAction(
  'ORDERS_getPriceByVendorCodeError',
);

const removeOrdersRequest = createAction('ORDERS_removeOrdersRequest');
const removeOrdersSuccess = createAction('ORDERS_removeOrdersSuccess');
const removeOrdersError = createAction('ORDERS_removeOrdersError');

const editOrder = createAction('ORDERS_editOrder');
const checkboxOrderSwitch = createAction('ORDERS_checkboxOrderSwitch');

const saveOrderRequest = createAction('ORDERS_saveOrderRequest');
const saveOrderSuccess = createAction('ORDERS_saveOrderSuccess');
const saveOrderError = createAction('ORDERS_saveOrderError');

const patchOrderRequest = createAction('ORDERS_patchOrderRequest');
const patchOrderSuccess = createAction('ORDERS_patchOrderSuccess');
const patchOrderError = createAction('ORDERS_patchOrderError');

const clearCurrentOrder = createAction('ORDERS_clearCurrentOrder');
const clearTemporaryStorageLocation = createAction(
  'orders/clearTemporaryStorageLocation',
);

const createLineProduct = createAction('ORDERS_createLineProduct');
const createLineProductCopy = createAction('ORDERS_createLineProductCopy');

const deleteLineSelectedProduct = createAction(
  'ORDERS_deleteLineSelectedProduct',
);
const changeLineProductInput = createAction('ORDERS_changeLineProductInput');
const changeLineProductInputQuantity = createAction(
  'ORDERS_changeLineProductInputQuantity',
);
const changeInputNoteForOrder = createAction('ORDERS_changeInputNoteForOrder');
const changeMainCheckbox = createAction('ORDERS_changeMainCheckbox');
const changePrepaymentInput = createAction('ORDERS_changePrepaymentInput');

const calculateSum = createAction('ORDERS_calculateSum');
const calculateTotalPositions = createAction('ORDERS_calculateTotalPositions');
const calculateTotalQuantity = createAction('ORDERS_calculateTotalQuantity');
const calculateTotalSum = createAction('ORDERS_calculateTotalSum');
const calculateAveragePrice = createAction('ORDERS_calculateAveragePrice');
const calculateRemainderPaid = createAction('ORDERS_calculateRemainderPaid');

const getOrderByIdRequest = createAction('ORDERS_getOrderByIdRequest');
const getOrderByIdSuccess = createAction('ORDERS_getOrderByIdSuccess');
const getOrderByIdError = createAction('ORDERS_getOrderByIdError');

const choiseClient = createAction('ORDERS_choiseClient');

const filterClients = createAction('ORDERS_filterClients');
const filterOrders = createAction('ORDERS_filterOrders');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersError,

  getPriceByVendorCodeRequest,
  getPriceByVendorCodeSuccess,
  getPriceByVendorCodeError,

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
  changePrepaymentInput,

  calculateSum,
  calculateTotalPositions,
  calculateAveragePrice,
  calculateTotalQuantity,
  calculateTotalSum,
  calculateRemainderPaid,

  removeOrdersRequest,
  removeOrdersSuccess,
  removeOrdersError,

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
