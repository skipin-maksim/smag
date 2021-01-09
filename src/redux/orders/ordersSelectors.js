import { createSelector } from '@reduxjs/toolkit';

const getOrdersList = state => {
  return state.orders.allOrders;
};

const getCurrentClientInfo = state => {
  return state.orders.currentOrder.clientInfo;
};

const getCurrentLineOrderById = (state, id) => {
  return getOrdersList(state).find(item => item.numOrder === id);
};

const getOrderById = (state, id) => {
  return getOrdersList(state).find(item => {
    return item._id === id;
  });
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

const getFilterValue = state => state.orders.filterClients;

const getFilterOrdersValue = state => state.orders.filterOrders;

const getAllContactsList = state => state.contacts.allContacts;

const getVisibleClients = createSelector(
  [getAllContactsList, getFilterValue],
  (clients, filterValue) => {
    return clients.filter(client =>
      client.secondName.toLowerCase().includes(filterValue),
    );
  },
);

const getVisibleOrders = createSelector(
  [getOrdersList, getFilterOrdersValue],
  (orders, filterValue) => {
    return orders.filter(order => {
      return order.clientInfo.secondName
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  },
);

const getDataOfTemporaryStorageLocation = state => {
  return state.orders.temporaryStorageLocation;
};

const getIsError = state => state.orders.error;

export default {
  getOrdersList,
  getCurrentClientInfo,
  getCurrentLineOrderById,
  getOrderById,
  getIsLoader,
  getCurrentOrder,
  getCurrentOrderItems,
  getIsSomeUnchecked,
  getCalculatedTotals,
  getProductLineById,
  getFilterValue,
  getAllContactsList,
  getVisibleClients,
  getDataOfTemporaryStorageLocation,
  getFilterOrdersValue,
  getVisibleOrders,
  getIsError,
};
