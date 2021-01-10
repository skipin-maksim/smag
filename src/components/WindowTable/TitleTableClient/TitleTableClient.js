import React from 'react';

// import CheckBox from '../../CheckBox/CheckBox';

import s from './TitleTableClient.module.scss';

export default function TitleTableOrders() {
  return (
    <div className={`${s.tableTitletLine} ${s.grid}`}>
      <span>^</span>
      <span>№</span>
      <span>Фамилия Имя Отчество</span>
      <span>Заказов</span>
      <span>Товара</span>
      <span>На сумму</span>
      <span>Долг</span>
      <span>Город</span>
      <span>Доставка</span>
      <span>E-mail</span>
    </div>
  );
}
