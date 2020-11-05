import React from 'react';
import { connect } from 'react-redux';
import { ordersSelectors } from '../../redux/orders';

import s from './CustomerOrderItem.module.scss';

function CustomerOrderItem({ idx, orderItem }) {
  const lineColorPick = idx => (idx % 2 === 0 ? s.whithLine : s.greyLine);

  const { name, positions, quantity, sum, prepayment } = orderItem;
  return (
    <li className={`${s.customerOrderItem} ${lineColorPick(idx)}`}>
      <span className={s.num}>{idx + 1}</span>
      <span className={s.name}>
        <input type="checkbox" className={s.checkboxItem} />
        {name}
      </span>
      <span className={s.positions}>{positions}</span>
      <span className={s.quantity}>{quantity}</span>
      <span className={s.sum}>{sum}</span>
      <span className={s.prepayment}>{prepayment}</span>
    </li>
  );
}

const mSTP = (state, ownProps) => ({
  orderItem: ordersSelectors.getOrderById(state, ownProps.id),
});

export default connect(mSTP)(CustomerOrderItem);
