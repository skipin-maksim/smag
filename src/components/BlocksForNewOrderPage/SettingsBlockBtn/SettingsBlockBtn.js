import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from '../../Modal/Modal';
import PrintModal from '../../Modal/PrintModal/PrintModal';
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

import routes from '../../../routes';

import s from './SettingsBlockBtn.module.scss';

function SettingsBlockBtn({
  history,
  currentOrder,
  currentNumOrder,

  onCreateLineProduct,
  onDeleteLineSelectedProduct,
  onSaveOrder,

  onCalculateTotalQuantity,
  onCalculateTotalSum,
  onCalculateAveragePrice,
  onCalculateTotalPositions,
  onCalculateRemainderPaid,

  currentClientInfo,
}) {
  const [isModalPrint, setIsModalPrint] = useState(false);

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

  const handleSaveBtn = () => {
    if (currentClientInfo.firstName) {
      const currentNumOrderObj = createNewOrderNum(currentNumOrder); // прибавляем 1 к полученному номеру заказа

      // запускаем сохранение, где мы соберем все в один объект и запишем новый номер заказа на сервер
      onSaveOrder(currentOrder, currentClientInfo, currentNumOrderObj);

      history.replace(`${routes.OrdersPage}/${currentNumOrderObj.valueStr}`);
    } else {
      alert('Вы не выбрали клиента');
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

const mSTP = state => ({
  currentOrder: ordersSelectors.getCurrentOrder(state),
  currentClientInfo: ordersSelectors.getCurrentClientInfo(state),
  currentNumOrder: numOrderSelectors.getCurrentNum(state),
});
const mDTP = {
  getCurrentNumOrder: numOrderOperations.getCurrentNumOrder,

  onCreateLineProduct: ordersActions.createLineProduct,
  onCreateLineProductCopy: ordersActions.createLineProductCopy,
  onDeleteLineSelectedProduct: ordersActions.deleteLineSelectedProduct,

  onCalculateTotalQuantity: ordersActions.calculateTotalQuantity,
  onCalculateTotalSum: ordersActions.calculateTotalSum,
  onCalculateAveragePrice: ordersActions.calculateAveragePrice,
  onCalculateTotalPositions: ordersActions.calculateTotalPositions,
  onCalculateRemainderPaid: ordersActions.calculateRemainderPaid,
  onSaveOrder: ordersOperations.postOrder,
};

export default withRouter(connect(mSTP, mDTP)(SettingsBlockBtn));
