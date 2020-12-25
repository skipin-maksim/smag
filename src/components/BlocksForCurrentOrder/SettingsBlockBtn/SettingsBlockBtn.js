import React, { useState, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import notification from 'toastr';

import Modal from '../../Modal/Modal';
import PrintModal from '../../Modal/PrintModal/PrintModal';
import EditBtn from '../../Buttons/EditBtn/EditBtn';
import SaveBtn from '../../Buttons/SaveBtn/SaveBtn';
import PrintBtn from '../../Buttons/PrintBtn/PrintBtn';
import AddBtn from '../../Buttons/AddBtn/AddBtn';
import RemoveBtn from '../../Buttons/RemoveBtn/RemoveBtn';

import {
  ordersActions,
  ordersOperations,
  ordersSelectors,
} from '../../../redux/orders/';
import {
  numOrderOperations,
  numOrderSelectors,
} from '../../../redux/numOrder/';

// import routes from '../../../routes';

import s from './SettingsBlockBtn.module.scss';

const SettingsBlockBtn = ({
  history,

  // onCreateLineProduct,
  // onDeleteLineSelectedProduct,
  // onSaveOrder,
  // onPatchOrder,

  // onCalculateTotalQuantity,
  // onCalculateTotalSum,
  // onCalculateAveragePrice,
  // onCalculateTotalPositions,
  // onCalculateRemainderPaid,

  // onEditOrderClick,
}) => {
  const [isModalPrint, setIsModalPrint] = useState(false);

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
    () => dispatch(ordersActions.createLineProductCopy()),
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
    () => dispatch(ordersOperations.patchOrder()),
    [dispatch],
  );
  const onEditOrderClick = useCallback(
    () => dispatch(ordersActions.editOrder()),
    [dispatch],
  );

  const createNewOrderNum = prevNum => {
    const editCustomNumber = value => ('000000' + (value + 1)).substr(-6);

    return {
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

    onEditOrderClick({ isSaved: false, isEdit: false });

    notification.info(`Заказ в стадии изменения`, 'Изменение!!!');
  };

  const handleSaveBtn = async () => {
    const currentPath = history.location.pathname.slice(8);

    if (currentClientInfo.firstName) {
      if (currentPath === 'new-order') {
        const currentNumOrderObj = createNewOrderNum(currentNumOrder); // прибавляем 1 к полученному номеру заказа

        // запускаем сохранение, где мы соберем все в один объект и запишем новый номер заказа на сервер
        onSaveOrder(currentOrder, currentClientInfo, currentNumOrderObj);

        history.replace(`orders/${currentNumOrderObj.valueStr}`);
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

  const handeMoadlPrint = () => {
    currentOrder.isSaved
      ? setIsModalPrint(true)
      : alert('Заказ не сохранен!!! Для печати, сохраните заказ');
  };

  return (
    <>
      <div className={s.settingButtons}>
        <AddBtn data={currentOrder} onCreate={onCreateLine} />

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
};

export default withRouter(connect()(SettingsBlockBtn));
