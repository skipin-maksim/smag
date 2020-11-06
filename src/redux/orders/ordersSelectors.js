const getOrdersList = state => state.orders.allOrders;

const getOrderById = (state, id) =>
  state.orders.allOrders.find(item => item.id === id);

const getCurrentOrderNum = state => state.orders.numOrder;

export default {
  getOrdersList,
  getOrderById,
  getCurrentOrderNum,
};
