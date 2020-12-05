import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import LineProduct from '../LineProduct/LineProduct';

import s from './WindowOrdersBlock.module.scss';

export default function WindowOrdersBlock({
  allProductsItems,
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
          {allProductsItems.map((item, idx) => {
            return <LineProduct key={item.id} id={item.id} idx={idx} />;
          })}
        </ul>
      </Scrollbar>

      <div className={s.orderInfo}>
        <div className={s.numOrder}>
          <span>Позицый</span>
          <span className={s.numbers}>
            {calculatedTotals.positions ? calculatedTotals.positions : 0}
          </span>
        </div>

        <div className={s.totalProduct}>
          <span>Общее кол-во</span>
          <span className={s.numbers}>
            {calculatedTotals.quantity
              ? calculatedTotals.quantity.toLocaleString('ru')
              : 0}
          </span>
        </div>

        <div className={s.averagePrice}>
          <span>Средняя цена</span>
          <span className={s.numbers}>
            {calculatedTotals.averagePrice
              ? calculatedTotals.averagePrice.toLocaleString('ru').slice(0, 4)
              : 0}
          </span>
        </div>

        <div className={s.totalSum}>
          <span>Общая сумма</span>
          <span className={s.numbers}>
            {' '}
            {calculatedTotals.sum
              ? calculatedTotals.sum.toLocaleString('ru')
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
}
