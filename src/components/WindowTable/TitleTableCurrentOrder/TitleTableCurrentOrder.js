import React from 'react';

import { CheckBoxMain } from '../../CheckBox';

import s from './TitleTableCurrentOrder.module.scss';

export default function TitleTableCurrentOrder({
  currentOrder,
  isCheckAll,
  handleCheckAll,
}) {
  return (
    <div className={`${s.tableTitletLine} ${s.grid}`}>
      <CheckBoxMain
        name="checkProduct"
        isChecked={isCheckAll}
        onChange={handleCheckAll}
        isDisabled={currentOrder.isSaved}
      />
      <span>№</span>
      <span>Артикул</span>
      <span>Цвет</span>
      <span>Кол-во</span>
      <span>Цена</span>
      <span>Скидка </span>
      <span>Сумма</span>
      <span>Примечание</span>
    </div>
  );
}
