import { createSelector } from '@reduxjs/toolkit';

const getOrdersList = state => state.orders.allOrders;

const getCurrentContractorInfo = state => {
  return state.orders.currentContractorInfo.contractorInfo;
};

const getOrderById = (state, id) => {
  return state.orders.allOrders.find(item => item.id === id);
};

const getCurrentOrderNum = state => state.orders.numOrder;

const getAllProductsItems = state => state.orders.allProducts.items;

const getOrdersAllProducts = state => state.orders.allProducts;

const getIsSomeUnchecked = state => {
  return getAllProductsItems(state).some(item => !item.checkProduct);
};
const getCalculatedTotals = state => state.orders.allProducts.calculatedTotals;

const getProductLineById = (state, id) => {
  return getAllProductsItems(state).find(item => item.id === id);
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

export default {
  getOrdersList,
  getCurrentContractorInfo,
  getOrderById,
  getCurrentOrderNum,
  getOrdersAllProducts,
  getAllProductsItems,
  getIsSomeUnchecked,
  getCalculatedTotals,
  getProductLineById,
  getFilterValue,
  getAllContactsList,
  getVisibleContractors,
};
