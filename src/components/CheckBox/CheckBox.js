import React, { useState } from 'react';

import s from './CheckBox.module.scss';

export default function CheckBox({
  choiceOption,
  currentId,
  onChangeInput,
  currentCheckValue,
}) {
  const [valueCheckbox, setValueCheckbox] = useState(false);

  const isSelectAll =
    choiceOption === 'checkAllProducts' ? valueCheckbox : currentCheckValue;

  const handleChecked = (target, currentId) => {
    if (choiceOption === 'checkAllProducts') setValueCheckbox(!valueCheckbox);

    onChangeInput({
      id: currentId,
      value: target.checked,
      name: target.name,
      choiceOption: choiceOption,
    });
  };

  return (
    <label className={s.checkboxOther}>
      <input
        type="checkbox"
        name="checkProduct"
        onChange={({ target }) => handleChecked(target, currentId)}
        checked={isSelectAll}
      />
      <span></span>
    </label>
  );
}
