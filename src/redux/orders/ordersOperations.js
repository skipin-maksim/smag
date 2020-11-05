import axios from 'axios';

import { ordersActions } from './';

axios.defaults.baseURL = 'http://localhost:2000';

const getCurrentNumOrder = () => async dispatch => {
  dispatch(ordersActions.numOrderRequest());

  try {
    const { data } = await axios('/numorder');

    console.log('numOrder:', data);

    dispatch(ordersActions.numOrderSuccess(data));
  } catch (error) {
    dispatch(ordersActions.numOrderError(error));
  }
};

export default { getCurrentNumOrder };
