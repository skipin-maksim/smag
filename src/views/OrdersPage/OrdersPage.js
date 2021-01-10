import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ordersOperations, ordersSelectors } from '../../redux/orders';

import Spinner from '../../components/Spinner/Spinner';
import TitleTableOrders from '../../components/WindowTable/TitleTableOrders/TitleTableOrders';
import OrdersTableControls from '../../components/OrdersTableControls/OrdersTableControls';
import LineOrder from '../../components/LineOrder/LineOrder';
import WindowTable from '../../components/WindowTable/WindowTable';
import Modal from '../../components/Modal/Modal';
import RemoveModal from '../../components/Modal/RemoveModal/RemoveModal';

import s from './OrdersPage.module.scss';

export default function OrdersPage() {
  const [removeModal, setRemoveModal] = useState(false);
  const dispatch = useDispatch();

  const ordersList = useSelector(ordersSelectors.getOrdersList);
  const filterOrdersValue = useSelector(ordersSelectors.getFilterOrdersValue);
  const isLoading = useSelector(ordersSelectors.getIsLoader);

  const visibleOrders = ordersList.filter(order => {
    return order.clientInfo.secondName
      .toLowerCase()
      .includes(filterOrdersValue.toLowerCase());
  });

  const getAllOrders = useCallback(
    () => dispatch(ordersOperations.getAllOrders()),
    [dispatch],
  );

  const onRemoveOrders = useCallback(
    ordersList => dispatch(ordersOperations.removeOrders(ordersList)),
    [dispatch],
  );

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const onCloseModal = () => {
    setRemoveModal(false);
  };

  const handleRemoveOrders = () => {
    onRemoveOrders(visibleOrders);
    onCloseModal();
  };

  const isCheckedOrder = () => {
    return visibleOrders.some(order => order.isCheckedOrder === true);
  };

  const handleOpenModal = () => {
    if (isCheckedOrder()) setRemoveModal(true);
  };

  return (
    <div className={s.orderPage}>
      {isLoading && <Spinner />}
      <OrdersTableControls
        visibleOrders={visibleOrders}
        handleOpenModal={handleOpenModal}
        disabled={!isCheckedOrder()}
      />

      <TitleTableOrders />

      <WindowTable>
        <ul className={s.customerOrderList}>
          {visibleOrders
            .map((item, idx) => {
              return (
                <LineOrder
                  key={item._id}
                  idx={idx}
                  id={item.orderNum}
                  order={item}
                />
              );
            })
            .reverse()}
        </ul>
      </WindowTable>
      {removeModal && (
        <Modal
          children={
            <RemoveModal
              onCloseModal={onCloseModal}
              onRemoveOrders={handleRemoveOrders}
            />
          }
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
}
