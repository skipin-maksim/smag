const getOrdersList = state => state.orders.allOrders;

const getOrderById = (state, id) =>
  state.orders.allOrders.find(item => item.id === id);

const getCurrentOrderNum = state => state.orders.numOrder;

const getAllProducts = state => state.orders.allProducts;

const getProductLineById = (state, id) =>
  state.orders.allProducts.find(item => item.id === id);

export default {
  getOrdersList,
  getOrderById,
  getCurrentOrderNum,
  getAllProducts,
  getProductLineById,
};
