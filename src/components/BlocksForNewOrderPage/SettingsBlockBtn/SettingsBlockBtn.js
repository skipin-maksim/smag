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

  currentContractorInfo,
}) {
  const [isModalPrint, setIsModalPrint] = useState(false);

  const createNewOrderNum = prevNum => {
    const editCustomNumber = value => ('00000' + (value + 1)).substr(-5);

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
    if (currentContractorInfo.firstName) {
      const currentNumOrderObj = createNewOrderNum(currentNumOrder); // прибавляем 1 к полученному номеру заказа

      // запускаем сохранение, где мы соберем все в один объект и запишем новый номер заказа на сервер
      onSaveOrder(currentOrder, currentContractorInfo, currentNumOrderObj);

      history.replace(`/orders/${currentNumOrderObj.valueStr}`);
    } else {
      alert('Вы не выбрали контрагента');
    }
  };

  const onCloseModal = () => {
    setIsModalPrint(false);
  };

  const onCreateLine = () => {
    onCreateLineProduct();
    onCalculateTotalPositions();
  };

  return (
    <>
      <div className={s.settingButtons}>
        <AddBtn data={currentOrder} onCreate={onCreateLine} />

        <RemoveBtn data={currentOrder} onRemove={handleDelete} />

        <SaveBtn data={currentOrder} onSave={handleSaveBtn} />

        <PrintBtn onOpenModalPrint={setIsModalPrint} />
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
  currentContractorInfo: ordersSelectors.getCurrentContractorInfo(state),
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
