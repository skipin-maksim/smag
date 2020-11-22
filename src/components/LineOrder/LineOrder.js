import React from 'react';
import { connect } from 'react-redux';
import { ordersSelectors } from '../../redux/orders';
import lineColorPick from '../../helpers/lineColorPick';
import CheckBox from '../CheckBox/CheckBox';

import s from './LineOrder.module.scss';

function LineOrder({ idx, orderItem }) {
  const {
    calculatedTotals,
    contractorInfo,
    prepayment,
    noteForOrder,
  } = orderItem;

  return (
    <li className={`${s.customerOrderItem} ${lineColorPick(idx)}`}>
      <CheckBox />
      <span>{idx + 1}</span>
      <span>
        {contractorInfo.secondName} {contractorInfo.firstName}{' '}
        {contractorInfo.thirdName}
      </span>
      <span>{calculatedTotals.positions}</span>
      <span>{calculatedTotals.quantity}</span>
      <span>{calculatedTotals.sum}</span>
      <span>{prepayment}</span>
      <span>{noteForOrder}</span>
    </li>
  );
}

const mSTP = (state, ownProps) => ({
  orderItem: ordersSelectors.getOrderById(state, ownProps.id),
});

export default connect(mSTP)(LineOrder);
