import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import s from './Remove.module.scss';

export default function RemoveBtn({ data, onRemove }) {
  return (
    <Tooltip title={'Удалить товар'} arrow disableHoverListener={data.isSaved}>
      {/* ****** span - для Tooltip-a */}
      <span>
        <button
          type="button"
          onClick={onRemove}
          className={`${s.settingButton} ${s.removeBtn}`}
          disabled={data.isSaved}
        >
          <DeleteForeverIcon style={{ color: '#DE6A73', fontSize: 21 }} />
          <div className="visually-hidden">Удалить заказ</div>
        </button>
      </span>
    </Tooltip>
  );
}
