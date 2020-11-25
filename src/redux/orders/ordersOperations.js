import axios from 'axios';
import moment from 'moment';
import { ordersActions } from './';

const baseUrl = 'http://localhost:2000';
const dateNow = moment().format('DD-MM-YYYY hh:mm');

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

const postOrder = (allProducts, contractorInfo) => async dispatch => {
  dispatch(ordersActions.saveOrderRequest());

  const { data } = await axios(`${baseUrl}/numorder`);

  const createNewOrderNum = prevNum => {
    const editCustomNumber = value => ('00000' + (value + 1)).substr(-5);

    return {
      valueNum: prevNum.valueNum + 1,
      valueStr: editCustomNumber(prevNum.valueNum),
    };
  };

  const currentNumOrderObj = createNewOrderNum(data);

  const postData = {
    ...allProducts,
    isSaved: true,
    contractorInfo: contractorInfo,
    numOrder: currentNumOrderObj.valueStr,
    id: currentNumOrderObj.valueStr,
    date: dateNow,
  };

  try {
    const { data } = await axios.post(`${baseUrl}/orders`, postData);

    dispatch(ordersActions.saveOrderSuccess(data));

    axios.patch(`${baseUrl}/numorder`, currentNumOrderObj);
  } catch (error) {
    dispatch(ordersActions.saveOrderError());
    console.error(error);
  }
};

export default { getCurrentNumOrder, getAllOrders, getPriceByArt, postOrder };
