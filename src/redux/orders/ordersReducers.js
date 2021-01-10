import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { ordersActions, func } from '.';
import { tabsActions } from '../tabs';
import { initCurrentOrder } from './initialStateForReducers';

const resetErrorMessage = null;

const allOrders = createReducer([], {
  [ordersActions.getAllOrdersSuccess]: (state, { payload }) => {
    return [...payload];
  },
  [ordersActions.saveOrderSuccess]: (state, { payload }) => [...state, payload],
  [ordersActions.checkboxOrderSwitch]: (state, { payload }) => {
    return state.map(item =>
      item.numOrderServer === payload.id
        ? { ...item, isCheckedOrder: payload.value }
        : item,
    );
  },
  [ordersActions.removeOrdersSuccess]: (state, { payload }) => {
    return payload.orders;
  },
});

const currentOrder = createReducer(initCurrentOrder, {
  [ordersActions.createLineProduct]: (state, _) => {
    return func.createLineProduct(state);
  },
  [ordersActions.createLineProductCopy]: (state, { payload }) => {
    return func.createLineProductCopy(state, payload);
  },
  [ordersActions.changeLineProductInput]: (state, { payload }) => {
    return func.changeLineProductInput(state, payload);
  },
  [ordersActions.changeMainCheckbox]: (state, { payload }) => {
    return func.changeMainCheckbox(state, payload);
  },
  [ordersActions.getPriceByVendorCodeSuccess]: (state, { payload }) => {
    return func.getPriceByVendorCodeSuccess(state, payload);
  },
  [ordersActions.changeLineProductInputQuantity]: (state, { payload }) => {
    return func.changeLineProductInputQuantity(state, payload);
  },
  [ordersActions.deleteLineSelectedProduct]: (state, _) => {
    return func.deleteLineSelectedProduct(state);
  },
  [ordersActions.calculateSum]: (state, { payload }) => {
    return func.calculateSum(state, payload);
  },
  [ordersActions.calculateTotalQuantity]: (state, _) => {
    return func.calculateTotalQuantity(state);
  },
  [ordersActions.calculateTotalSum]: (state, _) => {
    return func.calculateTotalSum(state);
  },
  [ordersActions.calculateAveragePrice]: (state, _) => {
    return func.calculateAveragePrice(state);
  },
  [ordersActions.calculateTotalPositions]: (state, _) => {
    return func.calculateTotalPositions(state);
  },
  [ordersActions.calculateRemainderPaid]: (state, { payload }) => {
    return func.calculateRemainderPaid(state, payload);
  },
  [ordersActions.changeInputNoteForOrder]: (state, { payload }) => {
    return { ...state, noteForOrder: payload };
  },
  [ordersActions.changePrepaymentInput]: (state, { payload }) => {
    return { ...state, prepayment: payload };
  },
  [ordersActions.clearCurrentOrder]: (state, { payload }) => {
    return initCurrentOrder;
  },
  [ordersActions.getOrderByIdSuccess]: (state, { payload }) => {
    return payload;
  },
  [ordersActions.choiseClient]: (state, { payload }) => {
    return {
      ...state,
      clientInfo: payload,
    };
  },
  [tabsActions.getDataOfTemporaryStorageLocation]: (state, { payload }) => {
    return { ...payload };
  },
  [ordersActions.saveOrderSuccess]: (state, { payload }) => {
    return payload;
  },
  [ordersActions.patchOrderSuccess]: (state, { payload }) => {
    return payload;
  },
  [ordersActions.editOrder]: (state, { payload }) => {
    return { ...state, ...payload };
  },
});

const filterClients = createReducer('', {
  [ordersActions.filterClients]: (_, { payload }) => {
    return payload;
  },
});

const filterOrders = createReducer('', {
  [ordersActions.filterOrders]: (_, { payload }) => {
    return payload;
  },
});

const temporaryStorageLocation = createReducer(initCurrentOrder, {
  [tabsActions.saveToTemporaryStorageLocation]: (state, { payload }) => {
    return payload;
  },
  [ordersActions.clearTemporaryStorageLocation]: (state, { payload }) => {
    return initCurrentOrder;
  },
});

const loader = createReducer(false, {
  [ordersActions.getOrderByIdRequest]: () => true,
  [ordersActions.getOrderByIdSuccess]: () => false,
  [ordersActions.getOrderByIdError]: () => false,

  [ordersActions.getAllOrdersRequest]: () => true,
  [ordersActions.getAllOrdersSuccess]: () => false,
  [ordersActions.getAllOrdersError]: () => false,
});

const error = createReducer(null, {
  [ordersActions.getOrderByIdError]: (state, { payload }) => {
    return payload.error;
  },
  [ordersActions.getOrderByIdSuccess]: (state, { payload }) =>
    resetErrorMessage,
});

export default combineReducers({
  allOrders,
  currentOrder,
  filterClients,
  filterOrders,
  temporaryStorageLocation,
  loader,
  error,
});
