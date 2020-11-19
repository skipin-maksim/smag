const getOrdersList = state => state.orders.allOrders;

const getOrderById = (state, id) =>
  state.orders.allOrders.find(item => item.id === id);

const getCurrentOrderNum = state => state.orders.numOrder;

const getAllProductsItems = state => state.orders.allProducts.items;
const getOrdersAllProducts = state => state.orders.allProducts;

const getIsSomeUnchecked = state => {
  return getAllProductsItems(state).some(item => !item.checkProduct);
};
const getCalculatedTotals = state => state.orders.allProducts.calculatedTotals;

const getProductLineById = (state, id) =>
  getAllProductsItems(state).find(item => item.id === id);

export default {
  getOrdersList,
  getOrderById,
  getCurrentOrderNum,
  getOrdersAllProducts,
  getAllProductsItems,
  getIsSomeUnchecked,
  getCalculatedTotals,
  getProductLineById,
};
