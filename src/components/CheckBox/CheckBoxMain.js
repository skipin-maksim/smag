import React from 'react';

import s from './CheckBox.module.scss';

export default function CheckBoxMain({
  name,
  isChecked,
  onChange,
  isDisabled,
}) {
  return (
    <div className="checkbox-box">
      <input
        id="checkbox-main"
        className={s.checkboxInput}
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={({ target }) => onChange({ name: target.name })}
        disabled={isDisabled}
      />
      <label className={s.checkboxLabel} for="checkbox-main"></label>
    </div>
  );
}
