import React from 'react';

// import CheckBox from '../../CheckBox/CheckBox';

import s from './TitleTableOrders.module.scss';

export default function TitleTableOrders() {
  return (
    <div className={s.tableTitletLine}>
      <span>^</span>
      <span>№</span>
      <span>Клиент</span>
      <span>Позиций</span>
      <span>Количество</span>
      <span>Сумма</span>
      <span>Предоплата</span>
      <span>Дата</span>
      <span>Статус</span>
      <span>Заметки</span>
    </div>
  );
}
