import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

import s from './AddBtn.module.scss';

export default function AddBtn({ data, onCreate, onCalculateTotalPositions }) {
  return (
    <Tooltip title={'Ctrl + Enter'} arrow disableHoverListener={data.isSaved}>
      {/* ****** span - для Tooltip-a */}
      <span>
        <button
          onClick={onCreate}
          className={`${s.settingButton} ${s.addBtn}`}
          disabled={data.isSaved}
        >
          <AddIcon style={{ color: '#98C379', fontSize: 21 }} />
        </button>
      </span>
    </Tooltip>
  );
}
