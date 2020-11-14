import React from 'react';
import { connect } from 'react-redux';
import { ordersSelectors } from '../../redux/orders';
import CheckBox from '../CheckBox/CheckBox';

import s from './CustomerOrderItem.module.scss';

function CustomerOrderItem({ idx, orderItem }) {
  const lineColorPick = idx => (idx % 2 === 0 ? 'whithLine' : 'greyLine');

  const { name, positions, quantity, sum, prepayment } = orderItem;
  return (
    <li className={`${s.customerOrderItem} ${lineColorPick(idx)}`}>
      <CheckBox choiceOption="checkOrder" />
      <span>{idx + 1}</span>
      <span>{name}</span>
      <span>{positions}</span>
      <span>{quantity}</span>
      <span>{sum}</span>
      <span>{prepayment}</span>
    </li>
  );
}

const mSTP = (state, ownProps) => ({
  orderItem: ordersSelectors.getOrderById(state, ownProps.id),
});

export default connect(mSTP)(CustomerOrderItem);
