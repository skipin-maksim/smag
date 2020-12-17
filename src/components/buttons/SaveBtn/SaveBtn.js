import React from 'react';

import s from './SaveBtn.module.scss';

export default function SaveBtn({ data, onSave }) {
  return (
    <label
      className={
        !data.isSaved ? s.labelSaveBtnNotSaved : s.labelSaveBtnIstSaved
      }
    >
      {!data.isSaved ? 'Не сохранен' : 'Сохранен'}

      <input
        type="checkbox"
        checked={data.isSaved}
        className={s.saveBtn}
        onChange={onSave}
        disabled={data.isSaved}
      />
    </label>
  );
}
