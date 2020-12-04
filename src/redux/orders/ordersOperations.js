import axios from 'axios';
import moment from 'moment';
import { tabsActions } from '../tabs';
import { ordersActions } from './';
import { contactsOperations } from '../contacts/';

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

const postOrder = (allProducts, contractorInfo, tetsNum) => async dispatch => {
  dispatch(ordersActions.saveOrderRequest());

  const newContractorInfo = {
    ...contractorInfo,
    debt: contractorInfo.debt - allProducts.calculatedTotals.remainderPaid,
  };

  const postData = {
    ...allProducts,
    isSaved: true,
    contractorInfo: newContractorInfo,
    numOrder: tetsNum.valueStr,
    id: tetsNum.valueStr,
    date: dateNow,
  };

  const createTabForNewOrder = tabsActions.addTab({
    name: `Заказ №${tetsNum.valueStr}`,
    path: `/orders/${tetsNum.valueStr}`,
  });

  try {
    const { data } = await axios.post(`${baseUrl}/orders`, postData);

    dispatch(ordersActions.saveOrderSuccess({ data, createTabForNewOrder }));

    axios.patch(`${baseUrl}/numorder`, tetsNum);
    axios.patch(
      `${baseUrl}/contractors/${contractorInfo.id}`,
      newContractorInfo,
    );
  } catch (error) {
    dispatch(ordersActions.saveOrderError());
    console.error(error);
  }
};

const getOrderById = id => async dispatch => {
  dispatch(ordersActions.getOrderByIdRequest());

  try {
    const { data } = await axios(`${baseUrl}/orders/${id}`);
    const { data: dataContact } = await axios(
      `${baseUrl}/contractors/${data.contractorInfo.id}`,
    );

    console.log(dataContact);
    console.log({ ...data, contractorInfo: dataContact });

    dispatch(
      ordersActions.getOrderByIdSuccess({
        ...data,
        contractorInfo: dataContact,
      }),
    );
  } catch (error) {
    dispatch(ordersActions.getOrderByIdError());
    console.error(error);
  }
};

export default {
  getCurrentNumOrder,
  getAllOrders,
  getPriceByArt,
  postOrder,
  getOrderById,
};
