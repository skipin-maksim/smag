import axios from 'axios';

import { numOrderActions } from './';

const baseUrl = 'http://localhost:2000';

const testGetNumOrder = () => async dispatch => {
  dispatch(numOrderActions.numOrderRequest());

  try {
    const { data } = await axios(`${baseUrl}/numorder`);

    console.log(data);

    dispatch(numOrderActions.numOrderSuccess(data));

    // axios.patch(`${baseUrl}/numorder`, currentNumOrderObj);
  } catch (error) {
    dispatch(numOrderActions.numOrderError());
    console.error(error);
  }
};

export default {
  testGetNumOrder,
};
