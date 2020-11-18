import React from 'react';

import s from './CheckBox.module.scss';

export default function CheckBox({ name, isChecked, onChange }) {
  return (
    <label className={s.checkboxOther}>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={({ target }) =>
          onChange({ name: target.name, value: target.checked })
        }
      />
      <span></span>
    </label>
  );
}
