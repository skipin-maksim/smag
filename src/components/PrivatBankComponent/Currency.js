import React from 'react';

import s from './PrivatBankComponent.module.scss';

export default function Currency({ currency, useDataPrivatBank }) {
  return (
    <div className={s.currency}>
      <div className={s.name}>{useDataPrivatBank[currency].ccy} - </div>
      <div className={s.buy}>
        Покупка <span>{useDataPrivatBank[currency].buy}</span>
      </div>
      <div className={s.sale}>
        Продажа <span>{useDataPrivatBank[currency].sale}</span>
      </div>
    </div>
  );
}
