import axios from 'axios';

import { ordersActions } from './';

const baseUrl = 'http://localhost:2000';

const getCurrentNumOrder = () => async dispatch => {
  dispatch(ordersActions.numOrderRequest());

  try {
    const { data } = await axios(`${baseUrl}/numorder`);

    dispatch(ordersActions.numOrderSuccess(data));
  } catch (error) {
    dispatch(ordersActions.numOrderError(error));
  }
};

const getAllOrders = () => async dispatch => {
  dispatch(ordersActions.getAllOrdersRequest());

  try {
    const { data } = await axios(`${baseUrl}/orders`);

    dispatch(ordersActions.getAllOrdersSuccess(data));
  } catch (error) {
    dispatch(ordersActions.getAllOrdersError(error));
  }
};

const getPriceByArt = (vendorCode, id) => async dispatch => {
  dispatch(ordersActions.getPriceByArtRequest());

  try {
    const { data } = await axios(`${baseUrl}/products/${vendorCode}`);

    dispatch(ordersActions.getPriceByArtSuccess(data));
    dispatch(ordersActions.calculateSum({ id }));
    dispatch(ordersActions.calculateAveragePrice());
  } catch (error) {
    console.error(error);
    dispatch(ordersActions.getPriceByArtError(error));
  }
};

const postOrder = (allProducts, numOrder) => async dispatch => {
  dispatch(ordersActions.saveOrderRequest());

  const editCustomNumber = () => ('00000' + (Number(numOrder) + 1)).substr(-5);

  const postData = {
    ...allProducts,
    numOrder: editCustomNumber(),
    id: editCustomNumber(),
  };

  try {
    const { data } = await axios.post(`${baseUrl}/orders`, postData);

    console.log(data);
    // dispatch(ordersActions.saveOrderSuccess());
  } catch (error) {
    dispatch(ordersActions.saveOrderError());
    console.error(error);
  }
};

export default { getCurrentNumOrder, getAllOrders, getPriceByArt, postOrder };
