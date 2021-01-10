import axios from 'axios';
import notification from 'toastr';
import momentTimezone from 'moment-timezone';

import { tabsActions } from '../tabs';
import { ordersActions } from './';

const baseUrl = 'https://smagserver.herokuapp.com';
const dateNow = momentTimezone().tz('Europe/Kiev').format('DD-MM-YYYY HH:mm');

const getAllOrders = () => async dispatch => {
  dispatch(ordersActions.getAllOrdersRequest());

  try {
    const { data } = await axios(`${baseUrl}/orders`);

    const updatedOrders = data.orders.map(order => ({
      ...order,
      isCheckedOrder: false,
    }));

    dispatch(ordersActions.getAllOrdersSuccess(updatedOrders));
  } catch (error) {
    dispatch(ordersActions.getAllOrdersError(error));
  }
};

const getPriceByVendorCode = (vendorCode, id) => async dispatch => {
  dispatch(ordersActions.getPriceByVendorCodeRequest());

  try {
    const { data } = await axios(`${baseUrl}/products/${vendorCode}`);

    dispatch(ordersActions.getPriceByVendorCodeSuccess(data.product));
    dispatch(ordersActions.calculateSum({ id }));
    dispatch(ordersActions.calculateAveragePrice());
  } catch (error) {
    if (error.message === 'Request failed with status code 404') {
      notification.error(
        `Такого артикула, не существует в базе данных!!!`,
        `Артикул ${vendorCode} не найден`,
      );

      return;
    }

    dispatch(ordersActions.getPriceByVendorCodeError(error));
  }
};

const createOrder = (currentOrder, clientInfo, numOrder) => async dispatch => {
  dispatch(ordersActions.saveOrderRequest());

  const newClientInfo = {
    ...clientInfo,
    debt: clientInfo.debt - currentOrder.calculatedTotals.remainderPaid,
  };

  const postData = {
    ...currentOrder,
    items: currentOrder.items.map(item => ({ ...item, checkProduct: false })),
    isSaved: true,
    isEdit: true,
    clientInfo: newClientInfo,
    numOrder: numOrder.valueStr,
    date: dateNow,
    dateUpdate: '',
    id: numOrder.valueStr,
  };

  console.log(postData);

  const createTabForNewOrder = tabsActions.addTab({
    name: `Заказ №${numOrder.valueStr}`,
    path: `/orders/${numOrder.valueStr}`,
    label: numOrder.valueStr,
  });

  try {
    const { data: dataOrder } = await axios.post(`${baseUrl}/orders`, postData);

    const data = dataOrder.order;

    dispatch(ordersActions.saveOrderSuccess({ data, createTabForNewOrder }));

    notification.success(
      `Заказ №${numOrder.valueStr} создан и сохранен`,
      'Сохранен!',
    );

    axios.patch(`${baseUrl}/numorder/5fde67cfb0a5f803a8e092ae`, numOrder);

    axios.patch(`${baseUrl}/clients/${clientInfo._id}`, newClientInfo);
  } catch (error) {
    dispatch(ordersActions.saveOrderError());
    console.error(error);
  }
};

const patchOrder = (currentOrder, clientInfo, numOrder) => async dispatch => {
  dispatch(ordersActions.patchOrderRequest());

  try {
    const { data: serverOrderData } = await axios(
      `${baseUrl}/orders/${currentOrder.numOrder}`,
    );

    const resetDebtWithoutCurrentOrderRemainderPaid =
      clientInfo.debt + serverOrderData.order.calculatedTotals.remainderPaid;

    const newClientInfo = {
      ...clientInfo,
      debt:
        resetDebtWithoutCurrentOrderRemainderPaid -
        currentOrder.calculatedTotals.remainderPaid,
    };

    const postData = {
      ...currentOrder,
      items: currentOrder.items.map(item => ({ ...item, checkProduct: false })),
      isSaved: true,
      isEdit: true,
      clientInfo: newClientInfo,
      dateUpdate: dateNow,
    };

    console.log(postData);

    const { data } = await axios.patch(
      `${baseUrl}/orders/${currentOrder._id}`,
      postData,
    );

    dispatch(ordersActions.patchOrderSuccess(data.order));

    notification.success(
      `Заказ №${numOrder.valueStr} успешно изменен`,
      'Изменен!',
    );

    try {
      await axios.patch(`${baseUrl}/clients/${clientInfo._id}`, newClientInfo);

      notification.info(``, 'Долг клиента обновлен!');
    } catch (error) {
      notification.error(``, 'Долг клиента не обновлен!');
      console.error(error);
    }
  } catch (error) {
    dispatch(ordersActions.patchOrderError());
    console.error(error);
  }
};

const getOrderById = id => async dispatch => {
  dispatch(ordersActions.getOrderByIdRequest());

  try {
    const { data } = await axios(`${baseUrl}/orders/${id}`);
    const { data: dataContact } = await axios(
      `${baseUrl}/clients/${data.order.clientInfo._id}`,
    );

    dispatch(
      ordersActions.getOrderByIdSuccess({
        ...data.order,
        clientInfo: dataContact.client,
      }),
    );
  } catch (error) {
    dispatch(
      ordersActions.getOrderByIdError({ error: error.response.data, id }),
    );

    if (error.response.data.message.includes('Not found order id')) {
      notification.error(`Заказ был удален`, `Заказ ${id} не найден!`);
      return;
    }

    console.error(error);
  }
};

const removeOrders = orders => async dispatch => {
  dispatch(ordersActions.removeOrdersRequest());

  const aarr = [];

  try {
    const updateOrders = await orders.filter(order => {
      if (order.isCheckedOrder === true) {
        axios.delete(`${baseUrl}/orders/${order._id}`);

        aarr.push(order.numOrder);

        // eslint-disable-next-line array-callback-return
        return;
      }
      return order;
    });

    dispatch(
      ordersActions.removeOrdersSuccess({
        orders: updateOrders,
        tabsOrders: aarr,
      }),
    );
  } catch (error) {
    dispatch(ordersActions.removeOrdersError());
    console.error(error);
  }
};

export default {
  getAllOrders,
  getPriceByVendorCode,
  createOrder,
  patchOrder,
  getOrderById,
  removeOrders,
};
