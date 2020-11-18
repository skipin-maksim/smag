import React from 'react';

import s from './CheckBox.module.scss';

export default function CheckBoxMain({ name, isChecked, onChange }) {
  return (
    <label className={s.checkboxOther}>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={({ target }) => onChange({ name: target.name })}
      />
      <span></span>
    </label>
  );
}
