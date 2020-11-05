import React, { Component } from 'react';

import s from './CustomerOrderItem.module.scss';

export default class CustomerOrderItem extends Component {
  lineColorPick = idx => (idx % 2 === 0 ? s.whithLine : s.greyLine);

  render() {
    return (
      <li className={`${s.customerOrderItem} ${this.lineColorPick(1)}`}>
        <span className={s.num}> 1</span>
        <span className={s.name}>
          <input type="checkbox" className={s.checkboxItem} />
          Григоренко Алексей Романович
        </span>
        <span className={s.positions}>10 000</span>
        <span className={s.quantity}>1 500</span>
        <span className={s.sum}>50 000</span>
        <span className={s.prepayment}>10 000</span>
      </li>
    );
  }
}
