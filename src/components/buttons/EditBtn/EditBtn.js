import React from 'react';

import EditIcon from '@material-ui/icons/Edit';

import s from './EditBtn.module.scss';

export default function EditBtn({ data, onEdit, isEdit }) {
  return (
    <button
      onClick={onEdit}
      type="button"
      className={s.settingButton}
      disabled={!isEdit}
    >
      <EditIcon style={{ color: '#D19A66', fontSize: 21 }} />
      <div className="visually-hidden">Изменить заказ</div>
    </button>
  );
}
