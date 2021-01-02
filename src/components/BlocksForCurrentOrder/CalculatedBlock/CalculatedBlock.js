import React from 'react';

import s from './CalculatedBlock.module.scss';

export default function CalculatedBlock({ totals }) {
  const { positions, quantity, averagePrice, sum } = totals;

  return (
    <div className={s.orderInfo}>
      <div className={s.numOrder}>
        <span>Позицый</span>
        <span className={s.numbers}>{positions ? positions : 0}</span>
      </div>

      <div className={s.totalProduct}>
        <span>Общее кол-во</span>
        <span className={s.numbers}>
          {quantity ? quantity.toLocaleString('ru') : 0}
        </span>
      </div>

      <div className={s.averagePrice}>
        <span>Средняя цена</span>
        <span className={s.numbers}>
          {averagePrice ? averagePrice.toLocaleString('ru').slice(0, 4) : 0}
        </span>
      </div>

      <div className={s.totalSum}>
        <span>Общая сумма</span>
        <span className={s.numbers}> {sum ? sum.toLocaleString('ru') : 0}</span>
      </div>
    </div>
  );
}
