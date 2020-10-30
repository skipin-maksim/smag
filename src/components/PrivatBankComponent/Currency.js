import React from 'react';

import s from './PrivatBankComponent.module.scss';

export default function Currency({ viewDetails }) {
  console.log(viewDetails);
  return (
    <div className={s.currency}>
      <div className={s.name}>{viewDetails.ccy} - </div>
      <div className={s.buy}>
        Покупка <span>{viewDetails.buy}</span>
      </div>
      <div className={s.sale}>
        Продажа <span>{viewDetails.sale}</span>
      </div>
    </div>
  );
}
