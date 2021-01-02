import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import LineProduct from '../../LineProduct/LineProduct';
import CalculatedBlock from '../CalculatedBlock/CalculatedBlock';

import s from './WindowOrdersBlock.module.scss';

export default function WindowOrdersBlock({
  currentOrderItems,
  calculatedTotals,
}) {
  return (
    <div className={s.windowOrders}>
      <Scrollbar
        style={{
          width: 1567,
          height: 549,
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.233)',
        }}
      >
        <ul className={s.customerOrderList}>
          {currentOrderItems.map((item, idx) => {
            return <LineProduct key={item.id} id={item.id} idx={idx} />;
          })}
        </ul>
      </Scrollbar>

      <CalculatedBlock totals={calculatedTotals} />
    </div>
  );
}
