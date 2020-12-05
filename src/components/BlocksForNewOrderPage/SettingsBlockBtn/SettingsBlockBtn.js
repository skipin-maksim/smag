import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PrintIcon from '@material-ui/icons/Print';

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
      console.log(currentNumOrder);
      const currentNumOrderObj = createNewOrderNum(currentNumOrder); // прибавляем 1 к полученному номеру заказа

      // запускаем сохранение, где мы соберем все в один объект и запишем новый номер заказа на сервер
      onSaveOrder(currentOrder, currentContractorInfo, currentNumOrderObj);

      history.replace(`/orders/${currentNumOrderObj.valueStr}`);
    } else {
      alert('Вы не выбрали контрагента');
    }
  };

  return (
    <div className={s.settingButtons}>
      <Tooltip
        title={'Ctrl + Enter'}
        arrow
        disableHoverListener={currentOrder.isSaved}
      >
        {/* ****** span - для Tooltip-a */}
        <span>
          <button
            onClick={() => {
              onCreateLineProduct();
              onCalculateTotalPositions();
            }}
            className={`${s.settingButton} ${s.addBtn}`}
            disabled={currentOrder.isSaved}
          >
            <AddIcon style={{ color: '#98C379', fontSize: 21 }} />
          </button>
        </span>
      </Tooltip>

      <Tooltip
        title={'Удалить товар'}
        arrow
        disableHoverListener={currentOrder.isSaved}
      >
        {/* ****** span - для Tooltip-a */}
        <span>
          <button
            type="button"
            onClick={handleDelete}
            className={`${s.settingButton} ${s.removeBtn}`}
            disabled={currentOrder.isSaved}
          >
            <DeleteForeverIcon style={{ color: '#DE6A73', fontSize: 21 }} />
            <div className="visually-hidden">Удалить заказ</div>
          </button>
        </span>
      </Tooltip>

      <label
        className={
          !currentOrder.isSaved
            ? s.labelSaveBtnNotSaved
            : s.labelSaveBtnIstSaved
        }
      >
        {!currentOrder.isSaved ? 'Не сохранен' : 'Сохранен'}

        <input
          type="checkbox"
          checked={currentOrder.isSaved}
          className={s.saveBtn}
          onChange={handleSaveBtn}
          disabled={currentOrder.isSaved}
        />
      </label>

      <Tooltip
        title={'Печать'}
        arrow
        disableHoverListener={currentOrder.isSaved}
      >
        {/* ****** span - для Tooltip-a */}
        <span>
          <button
            type="button"
            // onClick={this.handleDelete}
            className={`${s.settingButton} ${s.printBtn}`}
          >
            <PrintIcon style={{ color: '#fff', fontSize: 21 }} />
            <div className="visually-hidden">Печать</div>
          </button>
        </span>
      </Tooltip>
    </div>
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
