const getOrdersList = state => state.orders.allOrders;

const getOrderById = (state, id) =>
  state.orders.allOrders.find(item => item.id === id);

const getCurrentOrderNum = state => state.orders.numOrder;

const getAllProducts = state => state.orders.allProducts.items;

const getIsSomeUnchecked = state => {
  return getAllProducts(state).some(item => !item.checkProduct);
};
const getCalculatedTotals = state => state.orders.allProducts.calculatedTotals;

const getProductLineById = (state, id) =>
  getAllProducts(state).find(item => item.id === id);

export default {
  getOrdersList,
  getOrderById,
  getCurrentOrderNum,
  getAllProducts,
  getIsSomeUnchecked,
  getCalculatedTotals,
  getProductLineById,
};
