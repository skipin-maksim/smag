import React, { useCallback } from 'react';
import { ordersActions } from '../../redux/orders/';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { tabsActions } from '../../redux/tabs';
import lineColorPick from '../../helpers/lineColorPick';
import CheckBox from '../CheckBox/CheckBox';

import s from './LineOrder.module.scss';

export default function LineOrder({ idx, order, id }) {
  const widthLineTabs = useSelector(state => state.tabs.positionData.width);
  const getCurrentLineOrderById = useSelector(state =>
    state.orders.allOrders.find(item => item.numOrder === id),
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const onMoveSlideLeft = useCallback(
    data => dispatch(tabsActions.moveSlideLeft(data)),
    [dispatch],
  );
  const onAddTab = useCallback(
    data => dispatch(tabsActions.addTabOrder(data)),
    [dispatch],
  );

  const checkboxOrderSwitch = useCallback(
    checkboxValue => dispatch(ordersActions.checkboxOrderSwitch(checkboxValue)),
    [dispatch],
  );

  const handleOpenOrder = () => {
    onAddTab({
      name: `Заказ №${id}`,
      path: `/orders/${id}`,
      label: id,
    });

    history.replace(`/orders/${id}`);

    if (widthLineTabs > 1300) {
      const futurePositionLeft = widthLineTabs - 1212;
      onMoveSlideLeft(-futurePositionLeft);
    }
  };

  const onChangeCheckbox = ({ name, value }) => {
    checkboxOrderSwitch({ id, value });
  };

  const {
    calculatedTotals,
    clientInfo,
    prepayment,
    noteForOrder,
    status,
  } = order;

  const className = () => {
    switch (status) {
      case 'Обработан':
        return s.processed;
      case 'Не обработан':
        return s.notProcessed;
      case 'Собран':
        return s.assembled;
      case 'Отдан':
        return s.givenAway;

      default:
        break;
    }
  };

  return (
    <li className={`${s.customerOrderItem} ${lineColorPick(idx)}`}>
      <CheckBox
        id={id}
        name="checkOrder"
        isChecked={getCurrentLineOrderById.isCheckedOrder}
        onChange={onChangeCheckbox}
      />
      <span>{order.numOrder}</span>
      <span className={s.nameClient} onDoubleClick={handleOpenOrder}>
        {clientInfo.secondName} {clientInfo.firstName} {clientInfo.thirdName}
      </span>
      <span>{calculatedTotals.positions}</span>
      <span>{calculatedTotals.quantity}</span>
      <span>{calculatedTotals.sum}</span>
      <span>{prepayment}</span>
      <span style={{ fontSize: '11px' }}>{order.date}</span>
      <span className={`${s.status} ${className()}`}>{status}</span>
      <span className={s.noteForOrder}>{noteForOrder}</span>
    </li>
  );
}
