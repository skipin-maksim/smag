import React from 'react';

import './CheckBox.module.scss';

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
        type="checkbox"
        id={id}
        name={name}
        checked={isChecked}
        onChange={({ target }) =>
          onChange({ name: target.name, value: target.checked })
        }
        disabled={isDisabled}
      />
      <label for={id}></label>
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
