import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ordersOperations } from '../../redux/orders';

import Spinner from '../../components/Spinner/Spinner';
import TitleTableOrders from '../../components/WindowTable/TitleTableOrders/TitleTableOrders';
import OrdersTableControls from '../../components/OrdersTableControls/OrdersTableControls';
import LineOrder from '../../components/LineOrder/LineOrder';
import WindowTable from '../../components/WindowTable/WindowTable';

import s from './OrdersPage.module.scss';

export default function OrdersPage() {
  const dispatch = useDispatch();

  const ordersList = useSelector(state => state.orders.allOrders);
  const filterOrdersValue = useSelector(state => state.orders.filterOrders);
  const isLoading = useSelector(state => state.orders.loader);

  const visibleOrders = ordersList.filter(order => {
    return order.clientInfo.secondName
      .toLowerCase()
      .includes(filterOrdersValue.toLowerCase());
  });

  const getAllOrders = useCallback(
    () => dispatch(ordersOperations.getAllOrders()),
    [dispatch],
  );

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <div className={s.orderPage}>
      {isLoading && <Spinner />}
      <OrdersTableControls visibleOrders={visibleOrders} />

      <TitleTableOrders />

      <WindowTable>
        <ul className={s.customerOrderList}>
          {visibleOrders
            .map((item, idx) => {
              return (
                <LineOrder
                  key={item._id}
                  idx={idx}
                  id={item.numOrder}
                  order={item}
                />
              );
            })
            .reverse()}
        </ul>
      </WindowTable>
    </div>
  );
}
