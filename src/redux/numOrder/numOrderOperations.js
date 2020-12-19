import axios from 'axios';

import { numOrderActions } from './';

const baseUrl = 'https://smagserver.herokuapp.com';

const getCurrentNumOrder = () => async dispatch => {
  dispatch(numOrderActions.numOrderRequest());

  try {
    const { data } = await axios(`${baseUrl}/numorder`);

    dispatch(numOrderActions.numOrderSuccess(...data.numOrder));
  } catch (error) {
    dispatch(numOrderActions.numOrderError());
    console.error(error);
  }
};

export default {
  getCurrentNumOrder,
};
