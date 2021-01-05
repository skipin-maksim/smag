import React from 'react';

import s from './CheckBox.module.scss';

export default function CheckBox({
  id,
  name,
  onChange,
  isChecked = false,
  isDisabled = false,
}) {
  return (
    <div className="checkbox-box">
      <input
        id={id}
        className={s.checkboxInput}
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={({ target }) =>
          onChange({ name: target.name, value: target.checked })
        }
        disabled={isDisabled}
      />
      <label className={s.checkboxLabel} for={id}></label>
    </div>
  );
}

{
  /* <label className={s.checkboxOther}>
  <input
    type="checkbox"
    name={name}
    checked={isChecked}
    onChange={({ target }) =>
      onChange({ name: target.name, value: target.checked })
    }
    disabled={isDisabled}
  />
  <span></span>
</label>; */
}
