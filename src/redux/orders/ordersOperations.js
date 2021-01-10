import axios from 'axios';
import notification from 'toastr';

import { ordersActions } from './';

const baseUrl = 'https://smagserver.herokuapp.com';
// const dateNow = () =>
//   momentTimezone().tz('Europe/Kiev').format('DD-MM-YYYY HH:mm');

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

const createOrder = (currentOrder, clientInfo) => async dispatch => {
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
  };

  try {
    const { data: dataOrder } = await axios.post(`${baseUrl}/orders`, postData);

    const data = dataOrder.order;

    dispatch(ordersActions.saveOrderSuccess(data));

    notification.success(
      `Заказ №${data.numOrderServer} создан и сохранен`,
      'Сохранен!',
    );

    axios.patch(`${baseUrl}/clients/${clientInfo._id}`, newClientInfo);

    return data;
  } catch (error) {
    dispatch(ordersActions.saveOrderError());
    console.error(error);
    return { numOrder: '' };
  }
};

const patchOrder = (currentOrder, clientInfo) => async dispatch => {
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
    };

    const { data } = await axios.patch(
      `${baseUrl}/orders/${currentOrder._id}`,
      postData,
    );

    dispatch(ordersActions.patchOrderSuccess(data.order));

    notification.success(
      `Заказ №${currentOrder.numOrderServer} успешно изменен`,
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
  console.log(id);
  try {
    const { data } = await axios(`${baseUrl}/orders/${id}`);
    const { data: dataClients } = await axios(
      `${baseUrl}/clients/${data.order.clientInfo._id}`,
    );

    dispatch(
      ordersActions.getOrderByIdSuccess({
        ...data.order,
        clientInfo: dataClients.client,
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

  const arrRemovedOrder = [];

  try {
    const updateOrders = await orders.filter(order => {
      if (order.isCheckedOrder === true) {
        axios.delete(`${baseUrl}/orders/${order._id}`);

        arrRemovedOrder.push(order.numOrderServer);

        // eslint-disable-next-line array-callback-return
        return;
      }
      return order;
    });

    dispatch(
      ordersActions.removeOrdersSuccess({
        orders: updateOrders,
        tabsOrders: arrRemovedOrder,
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
