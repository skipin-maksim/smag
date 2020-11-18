import React from 'react';
import { connect } from 'react-redux';
import { ordersSelectors } from '../../redux/orders';
import CheckBox from '../CheckBox/CheckBox';

import s from './LineOrder.module.scss';

function LineOrder({ idx, orderItem }) {
  const lineColorPick = idx => (idx % 2 === 0 ? 'whithLine' : 'greyLine');

  const { orderInfo, contactInfo } = orderItem;
  return (
    <li className={`${s.customerOrderItem} ${lineColorPick(idx)}`}>
      <CheckBox choiceOption="checkOrder" />
      <span>{idx + 1}</span>
      <span>{contactInfo.name}</span>
      <span>{orderInfo.positions}</span>
      <span>{orderInfo.quantity}</span>
      <span>{orderInfo.sum}</span>
      <span>{orderInfo.prepayment}</span>
    </li>
  );
}

const mSTP = (state, ownProps) => ({
  orderItem: ordersSelectors.getOrderById(state, ownProps.id),
});

export default connect(mSTP)(LineOrder);
