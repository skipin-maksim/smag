import axios from 'axios';
import moment from 'moment';
import { tabsActions } from '../tabs';
import { ordersActions } from './';

const baseUrl = 'http://localhost:2000';
const dateNow = moment().format('DD-MM-YYYY hh:mm');

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

const postOrder = (currentOrder, clientInfo, numOrder) => async dispatch => {
  dispatch(ordersActions.saveOrderRequest());

  const newClientInfo = {
    ...clientInfo,
    debt: clientInfo.debt - currentOrder.calculatedTotals.remainderPaid,
  };

  const postData = {
    ...currentOrder,
    isSaved: true,
    clientInfo: newClientInfo,
    numOrder: numOrder.valueStr,
    id: numOrder.valueStr,
    date: dateNow,
  };

  const createTabForNewOrder = tabsActions.addTab({
    name: `Заказ №${numOrder.valueStr}`,
    path: `/orders/${numOrder.valueStr}`,
  });

  try {
    const { data } = await axios.post(`${baseUrl}/orders`, postData);

    dispatch(ordersActions.saveOrderSuccess({ data, createTabForNewOrder }));

    axios.patch(`${baseUrl}/numorder`, numOrder);
    axios.patch(`${baseUrl}/clients/${clientInfo.id}`, newClientInfo);
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
      `${baseUrl}/clients/${data.clientInfo.id}`,
    );

    dispatch(
      ordersActions.getOrderByIdSuccess({
        ...data,
        clientInfo: dataContact,
      }),
    );
  } catch (error) {
    dispatch(ordersActions.getOrderByIdError());
    console.error(error);
  }
};

export default {
  getAllOrders,
  getPriceByArt,
  postOrder,
  getOrderById,
};
