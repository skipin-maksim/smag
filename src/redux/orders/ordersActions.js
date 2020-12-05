import { createAction } from '@reduxjs/toolkit';

const getAllOrdersRequest = createAction('orders/getAllOrderRequest');
const getAllOrdersSuccess = createAction('orders/getAllOrderSuccess');
const getAllOrdersError = createAction('orders/getAllOrderError');

const getPriceByArtRequest = createAction('orders/getPriceByArtRequest');
const getPriceByArtSuccess = createAction('orders/getPriceByArtSuccess');
const getPriceByArtError = createAction('orders/getPriceByArtError');

const removeOrder = createAction('orders/removeOrder');
const editOrder = createAction('orders/editOrder');

const saveOrderRequest = createAction('orders/saveOrderRequest');
const saveOrderSuccess = createAction('orders/saveOrderSuccess');
const saveOrderError = createAction('orders/saveOrderError');

const clearAllProducts = createAction('orders/clearAllProducts');
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

const numOrderRequest = createAction('orders/numOrderRequest');
const numOrderSuccess = createAction('orders/numOrderSuccess');
const numOrderError = createAction('orders/numOrderError');

const getOrderByIdRequest = createAction('orders/getOrderByIdRequest');
const getOrderByIdSuccess = createAction('orders/getOrderByIdSuccess');
const getOrderByIdError = createAction('orders/getOrderByIdError');

const choiseContractor = createAction('orders/choiseContractor');

const filterContractors = createAction('orders/filterContractors');

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

  clearAllProducts,
  clearTemporaryStorageLocation,

  numOrderRequest,
  numOrderSuccess,
  numOrderError,

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
  saveOrderRequest,
  saveOrderSuccess,
  saveOrderError,

  choiseContractor,
  filterContractors,
};
