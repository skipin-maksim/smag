import React from 'react';

import s from './PrivatBankComponent.module.scss';

export default function Currency({ currency, allDataPrivatBank }) {
  return (
    <div className={s.currency}>
      <div className={s.name}>{allDataPrivatBank[currency].ccy} - </div>
      <div className={s.buy}>
        Покупка <span>{allDataPrivatBank[currency].buy}</span>
      </div>
      <div className={s.sale}>
        Продажа <span>{allDataPrivatBank[currency].sale}</span>
      </div>
    </div>
  );
}
