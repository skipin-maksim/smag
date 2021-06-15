import React, { useCallback } from 'react';
import { ordersActions, ordersSelectors } from '../../redux/orders/';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { tabsActions } from '../../redux/tabs';

import CheckBox from '../CheckBox/CheckBox';
import Line from '../Line/Line';

import s from './LineOrder.module.scss';
import sw from '../WindowTable/TitleTableOrders/TitleTableOrders.module.scss';

export default function LineOrder({ idx, order, id }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentLineOrderById = useSelector(state =>
    ordersSelectors.getCurrentLineOrderById(state, id),
  );

  const onAddTab = useCallback(
    data => dispatch(tabsActions.addTabOrder(data)),
    [dispatch],
  );
  const checkboxOrderSwitch = useCallback(
    checkboxValue =>
      dispatch(ordersActions.checkboxOrderSwitch({ ...checkboxValue, id })),
    [dispatch, id],
  );

  const handleOpenOrder = () => {
    onAddTab({
      name: `Заказ №${id}`,
      path: `/orders/${id}`,
      label: id,
    });

    history.replace(`/orders/${id}`);
  };

  const { calculatedTotals, clientInfo, prepayment, noteForOrder, status } =
    order;

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
    <Line gridClass={sw.grid} idx={idx}>
      <CheckBox
        id={id}
        name="checkOrder"
        isChecked={currentLineOrderById.isCheckedOrder}
        onChange={checkboxOrderSwitch}
      />
      <span>{order.orderNum}</span>
      <span className={s.nameClient} onClick={handleOpenOrder}>
        {clientInfo.secondName} {clientInfo.firstName} {clientInfo.thirdName}
      </span>
      <span>{calculatedTotals.positions.toLocaleString('ru')}</span>
      <span>{calculatedTotals.quantity.toLocaleString('ru')}</span>
      <span>{calculatedTotals.sum.toLocaleString('ru')}</span>
      <span>{prepayment.toLocaleString('ru')}</span>
      <span style={{ fontSize: '11px' }}>
        {order.date.toLocaleString('ru')}
      </span>
      <span className={`${s.status} ${className()}`}>{status}</span>
      <span>{noteForOrder}</span>
    </Line>
  );
}
