import React from 'react';

import { CheckBoxMain } from '../CheckBox/';

import s from './TableTitletLineBlock.module.scss';

export default function TableTitletLineBlock({
  allProducts,
  isCheckAll,
  handleCheckAll,
}) {
  return (
    <div className={s.tableTitletLine}>
      <CheckBoxMain
        name="checkProduct"
        isChecked={isCheckAll}
        onChange={handleCheckAll}
        isDisabled={allProducts.isSaved}
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
