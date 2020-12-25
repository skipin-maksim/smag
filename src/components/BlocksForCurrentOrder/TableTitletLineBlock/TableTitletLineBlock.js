import React from 'react';

import { CheckBoxMain } from '../../CheckBox/';

import s from './TableTitletLineBlock.module.scss';

export default function TableTitletLineBlock({
  currentOrder,
  isCheckAll,
  handleCheckAll,
}) {
  return (
    <div className={s.tableTitletLine}>
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
