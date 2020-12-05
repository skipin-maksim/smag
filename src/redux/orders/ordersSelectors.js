import { createSelector } from '@reduxjs/toolkit';

const getOrdersList = state => state.orders.allOrders;

const getCurrentContractorInfo = state => {
  return state.orders.currentOrder.contractorInfo;
};

const getOrderById = (state, id) => {
  return state.orders.allOrders.find(item => item.id === id);
};

const getIsLoader = state => state.orders.loader;

const getCurrentOrderItems = state => state.orders.currentOrder.items;

const getCurrentOrder = state => state.orders.currentOrder;

const getIsSomeUnchecked = state => {
  return getCurrentOrderItems(state).some(item => !item.checkProduct);
};
const getCalculatedTotals = state => state.orders.currentOrder.calculatedTotals;

const getProductLineById = (state, id) => {
  return getCurrentOrderItems(state).find(item => item.id === id);
};

const getFilterValue = state => state.orders.filterContractors;

const getAllContactsList = state => state.contacts.allContacts;

const getVisibleContractors = createSelector(
  [getAllContactsList, getFilterValue],
  (contractors, filterValue) => {
    return contractors.filter(contractor =>
      contractor.secondName.toLowerCase().includes(filterValue),
    );
  },
);

const getDataOfTemporaryStorageLocation = state => {
  return state.orders.temporaryStorageLocation;
};

export default {
  getOrdersList,
  getCurrentContractorInfo,
  getOrderById,
  getIsLoader,
  getCurrentOrder,
  getCurrentOrderItems,
  getIsSomeUnchecked,
  getCalculatedTotals,
  getProductLineById,
  getFilterValue,
  getAllContactsList,
  getVisibleContractors,
  getDataOfTemporaryStorageLocation,
};
