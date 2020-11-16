import React from 'react';

import s from './CheckBox.module.scss';

export default function CheckBox({
  choiceOption,
  currentId,
  currentCheckValue,
  handleCheckAll,
  isCheckAll,
}) {
  const getCurrentCheckValue =
    choiceOption === 'checkAllProducts' ? isCheckAll : currentCheckValue;

  return (
    <label className={s.checkboxOther}>
      <input
        type="checkbox"
        name="checkProduct"
        onChange={({ target }) =>
          handleCheckAll(target, currentId, choiceOption)
        }
        checked={getCurrentCheckValue}
      />
      <span></span>
    </label>
  );
}
