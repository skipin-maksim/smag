import axios from 'axios';

import { ordersActions } from './';

const changeBaseUrl = () => (axios.defaults.baseURL = 'http://localhost:2000');

const getCurrentNumOrder = () => async dispatch => {
  changeBaseUrl();

  dispatch(ordersActions.numOrderRequest());

  try {
    const { data } = await axios('/numorder');

    console.log('numOrder:', data);

    dispatch(ordersActions.numOrderSuccess(data));
  } catch (error) {
    dispatch(ordersActions.numOrderError(error));
  }
};

const getAllOrders = () => async dispatch => {
  changeBaseUrl();

  dispatch(ordersActions.getAllOrdersRequest());

  try {
    const { data } = await axios('/orders');

    console.log('orders:', data);

    dispatch(ordersActions.getAllOrdersSuccess(data));
  } catch (error) {
    dispatch(ordersActions.getAllOrdersError(error));
  }
};

export default { getCurrentNumOrder, getAllOrders };
