import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { tabsActions } from '../../redux/tabs';
import lineColorPick from '../../helpers/lineColorPick';
import CheckBox from '../CheckBox/CheckBox';

import s from './LineOrder.module.scss';

export default function LineOrder({ idx, order, id }) {
  const widthLineTabs = useSelector(state => state.tabs.positionData.width);
  const orderItem = useSelector(state =>
    state.orders.allOrders.find(item => item.id === id),
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

  const handleOpenOrder = () => {
    onAddTab({
      name: `Заказ №${id}`,
      path: `/orders/${id}`,
    });

    history.replace(`/orders/${id}`);

    if (widthLineTabs > 1300) {
      const futurePositionLeft = widthLineTabs - 1212;
      onMoveSlideLeft(-futurePositionLeft);
    }
  };

  const { calculatedTotals, clientInfo, prepayment, noteForOrder } = orderItem;

  return (
    <li
      className={`${s.customerOrderItem} ${lineColorPick(idx)}`}
      onClick={handleOpenOrder}
    >
      <CheckBox />
      <span>{order.numOrder}</span>
      <span>
        {clientInfo.secondName} {clientInfo.firstName} {clientInfo.thirdName}
      </span>
      <span>{calculatedTotals.positions}</span>
      <span>{calculatedTotals.quantity}</span>
      <span>{calculatedTotals.sum}</span>
      <span>{prepayment}</span>
      <span>{order.date}</span>
      <span>{noteForOrder}</span>
    </li>
  );
}
