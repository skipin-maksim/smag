import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabsActions } from '../../redux/tabs';
import { ordersSelectors } from '../../redux/orders';
import lineColorPick from '../../helpers/lineColorPick';
import CheckBox from '../CheckBox/CheckBox';

import s from './LineOrder.module.scss';

function LineOrder({ idx, orderItem, order, id, addTab, history }) {
  const {
    calculatedTotals,
    contractorInfo,
    prepayment,
    noteForOrder,
  } = orderItem;

  return (
    <li
      className={`${s.customerOrderItem} ${lineColorPick(idx)}`}
      onClick={() => {
        addTab({
          name: `Заказ №${id}`,
          path: `/orders/${id}`,
        });
        console.log('li', id);
        history.replace(`/orders/${id}`);
      }}
    >
      <CheckBox />
      <span>{order.numOrder}</span>
      <span>
        {contractorInfo.secondName} {contractorInfo.firstName}{' '}
        {contractorInfo.thirdName}
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

const mSTP = (state, ownProps) => ({
  orderItem: ordersSelectors.getOrderById(state, ownProps.id),
});

const mDTP = {
  addTab: tabsActions.addTabOrder,
};

export default withRouter(connect(mSTP, mDTP)(LineOrder));
