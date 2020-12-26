import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import notification from 'toastr';

import Modal from '../../Modal/Modal';
import PrintModal from '../../Modal/PrintModal/PrintModal';
import AddBtn from '../../Buttons/AddBtn/AddBtn';
import AddWithCopyBtn from '../../Buttons/AddWithCopyBtn/AddWithCopyBtn';
import EditBtn from '../../Buttons/EditBtn/EditBtn';
import SaveBtn from '../../Buttons/SaveBtn/SaveBtn';
import PrintBtn from '../../Buttons/PrintBtn/PrintBtn';
import RemoveBtn from '../../Buttons/RemoveBtn/RemoveBtn';

import { ordersActions, ordersOperations } from '../../../redux/orders/';
import { numOrderOperations } from '../../../redux/numOrder/';

import s from './SettingsBlockBtn.module.scss';

export default function SettingsBlockBtn() {
  const [isModalPrint, setIsModalPrint] = useState(false);

  const history = useHistory();

  const currentOrder = useSelector(state => state.orders.currentOrder);
  const currentClientInfo = useSelector(
    state => state.orders.currentOrder.clientInfo,
  );
  const currentNumOrder = useSelector(state => state.numOrder.numOrder);

  const dispatch = useDispatch();
  const onGetCurrentNumOrder = useCallback(
    () => dispatch(numOrderOperations.getCurrentNumOrder()),
    [dispatch],
  );
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
      dispatch(ordersOperations.postOrder(order, client, num)),
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

  const createNewOrderNum = prevNum => {
    const editCustomNumber = value => ('000000' + (value + 1)).substr(-6);

    return {
      ...prevNum,
      valueNum: prevNum.valueNum + 1,
      valueStr: editCustomNumber(prevNum.valueNum),
    };
  };

  const handleDelete = () => {
    onDeleteLineSelectedProduct();

    onCalculateTotalQuantity();
    onCalculateTotalSum();
    onCalculateAveragePrice();
    onCalculateTotalPositions();
    onCalculateRemainderPaid();
  };

  const handleEdit = () => {
    onGetCurrentNumOrder();

    onEditOrderClick({ isSaved: false, isEdit: 'изменяется' });

    notification.info(`Заказ в стадии изменения`, 'Изменение!!!');
  };

  const handleSaveBtn = async () => {
    const currentPath = history.location.pathname.slice(8);

    if (currentClientInfo.firstName) {
      if (currentPath === 'new-order') {
        const currentNumOrderObj = createNewOrderNum(currentNumOrder); // прибавляем 1 к полученному номеру заказа

        // запускаем сохранение, где мы соберем все в один объект и запишем новый номер заказа на сервер
        onSaveOrder(currentOrder, currentClientInfo, currentNumOrderObj);

        history.replace(`/orders/${currentNumOrderObj.valueStr}`);
      } else {
        onPatchOrder(currentOrder, currentClientInfo, currentNumOrder);
      }
    } else {
      notification.warning('Вы не выбрали клиента', 'Предупреждение');
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
    console.log(lastProductItem);
    onCreateLineProductCopy(lastProductItem);
    onCalculateTotalPositions();
  };

  const handeMoadlPrint = () => {
    currentOrder.isSaved
      ? setIsModalPrint(true)
      : alert('Заказ не сохранен!!! Для печати, сохраните заказ');
  };

  return (
    <>
      <div className={s.settingButtons}>
        <AddBtn data={currentOrder} onCreate={onCreateLine} />

        <AddWithCopyBtn data={currentOrder} onCreate={onCreateLineWithCopy} />

        <RemoveBtn data={currentOrder} onRemove={handleDelete} />

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
