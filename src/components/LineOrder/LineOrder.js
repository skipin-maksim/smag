import React from 'react';
import { connect } from 'react-redux';
import { ordersSelectors } from '../../redux/orders';
import lineColorPick from '../../helpers/lineColorPick';
import CheckBox from '../CheckBox/CheckBox';

import s from './LineOrder.module.scss';

function LineOrder({ idx, orderItem }) {
  const { calculatedTotals, contactInfo } = orderItem;
  return (
    <li className={`${s.customerOrderItem} ${lineColorPick(idx)}`}>
      <CheckBox />
      <span>{idx + 1}</span>
      <span>{contactInfo.name}</span>
      <span>{calculatedTotals.positions}</span>
      <span>{calculatedTotals.quantity}</span>
      <span>{calculatedTotals.sum}</span>
      <span>{calculatedTotals.prepayment}</span>
    </li>
  );
}

const mSTP = (state, ownProps) => ({
  orderItem: ordersSelectors.getOrderById(state, ownProps.id),
});

export default connect(mSTP)(LineOrder);
