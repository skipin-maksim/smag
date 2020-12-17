import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import s from './EditBtn.module.scss';

export default function EditBtn() {
  return (
    <Tooltip title={'Изменить заказ'} arrow>
      <button type="button" className={s.settingButton}>
        <EditIcon style={{ color: '#D19A66', fontSize: 21 }} />
        <div className="visually-hidden">Изменить заказ</div>
      </button>
    </Tooltip>
  );
}
