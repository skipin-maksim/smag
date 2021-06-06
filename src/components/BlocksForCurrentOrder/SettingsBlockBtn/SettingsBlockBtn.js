import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import notification from 'toastr';

import Modal from '../../Modal/Modal';
import PrintModal from '../../Modal/PrintModal/PrintModal';
import AddBtn from '../../buttons/AddBtn/AddBtn';
import AddWithCopyBtn from '../../buttons/AddWithCopyBtn/AddWithCopyBtn';
import EditBtn from '../../buttons/EditBtn/EditBtn';
import SaveBtn from '../../buttons/SaveBtn/SaveBtn';
import PrintBtn from '../../buttons/PrintBtn/PrintBtn';
import RemoveBtn from '../../buttons/RemoveBtn/RemoveBtn';

import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../../redux/orders/';

import s from './SettingsBlockBtn.module.scss';

export default function SettingsBlockBtn() {
  const [isModalPrint, setIsModalPrint] = useState(false);

  const history = useHistory();
  const match = useRouteMatch('/orders/:orderId');

  const currentOrder = useSelector(ordersSelectors.getCurrentOrder);
  const currentClientInfo = useSelector(ordersSelectors.getCurrentClientInfo);
  const isSomeChecked = useSelector(ordersSelectors.getIsSomeChecked);

  const dispatch = useDispatch();
  const onCreateLineProduct = useCallback(
    () => dispatch(ordersActions.createLineProduct()),
    [dispatch],
  );
  const onCreateLineProductCopy = useCallback(
    prevItem => dispatch(ordersActions.createLineProductCopy(prevItem)),
    [dispatch],
  );
  const onDeleteLineSelectedProduct = useCallback(
    () => dispatch(ordersActions.deleteLineSelectedProduct()),
    [dispatch],
  );
  const onCalculateTotalQuantity = useCallback(
    () => dispatch(ordersActions.calculateTotalQuantity()),
    [dispatch],
  );
  const onCalculateTotalSum = useCallback(
    () => dispatch(ordersActions.calculateAveragePrice()),
    [dispatch],
  );
  const onCalculateAveragePrice = useCallback(
    () => dispatch(ordersActions.calculateAveragePrice()),
    [dispatch],
  );
  const onCalculateTotalPositions = useCallback(
    () => dispatch(ordersActions.calculateTotalPositions()),
    [dispatch],
  );
  const onCalculateRemainderPaid = useCallback(
    () => dispatch(ordersActions.calculateRemainderPaid()),
    [dispatch],
  );
  const onSaveOrder = useCallback(
    (order, client, num) =>
      dispatch(ordersOperations.createOrder(order, client, num)),
    [dispatch],
  );
  const onPatchOrder = useCallback(
    (order, client, num) =>
      dispatch(ordersOperations.patchOrder(order, client, num)),
    [dispatch],
  );
  const onEditOrderClick = useCallback(
    newDataOrder => dispatch(ordersActions.editOrder(newDataOrder)),
    [dispatch],
  );

  const handleDelete = () => {
    onDeleteLineSelectedProduct();

    onCalculateTotalQuantity();
    onCalculateTotalSum();
    onCalculateAveragePrice();
    onCalculateTotalPositions();
    onCalculateRemainderPaid();
  };

  const handleEdit = () => {
    onEditOrderClick({ isSaved: false, isEdit: 'changes' });

    notification.info(`Заказ в стадии изменения`, 'Изменение!!!');
  };

  const handleSaveBtn = async () => {
    const currentPath = match.params.orderId;

    if (currentClientInfo.firstName) {
      if (currentPath === 'new-order') {
        const data = await onSaveOrder(currentOrder, currentClientInfo);

        history.replace(`/orders/${data.orderNum}`);
      } else {
        onPatchOrder(currentOrder, currentClientInfo);
      }
    } else {
      notification.warning('Вы не выбрали клиента', 'Предупреждение');
      //
      return;
    }
  };

  const onCloseModal = () => {
    setIsModalPrint(false);
  };

  const onCreateLine = () => {
    onCreateLineProduct();
    onCalculateTotalPositions();
  };

  const lastProductItem = useSelector(state => {
    const arrItems = state.orders.currentOrder.items;

    return arrItems.find((item, idx) => idx === arrItems.length - 1);
  });

  const onCreateLineWithCopy = () => {
    onCreateLineProductCopy(lastProductItem);
    onCalculateTotalPositions();
  };

  const handeMoadlPrint = () => {
    currentOrder.isSaved
      ? setIsModalPrint(true)
      : notification.warning(
          `Для печати, сохраните заказ`,
          'Заказ не сохранен!!!',
        );
  };

  return (
    <>
      <div className={s.settingButtons}>
        <AddBtn data={currentOrder} onCreate={onCreateLine} />

        <AddWithCopyBtn data={currentOrder} onCreate={onCreateLineWithCopy} />

        <RemoveBtn
          disabled={currentOrder.isSaved || !isSomeChecked}
          onRemove={handleDelete}
        />

        <EditBtn
          data={currentOrder}
          onEdit={handleEdit}
          isEdit={currentOrder.isEdit}
        />

        <SaveBtn data={currentOrder} onSave={handleSaveBtn} />

        <PrintBtn onOpenModalPrint={handeMoadlPrint} />
      </div>
      {isModalPrint && (
        <Modal
          children={<PrintModal currentOrder={currentOrder} />}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}
