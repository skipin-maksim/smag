import React from 'react';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import s from './Remove.module.scss';

export default function RemoveBtn({ disabled = false, onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className={`${s.settingButton} ${s.removeBtn}`}
      disabled={disabled}
    >
      <DeleteForeverIcon style={{ color: '#DE6A73', fontSize: 21 }} />
      <div className="visually-hidden">Удалить заказ</div>
    </button>
  );
}
