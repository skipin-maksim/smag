import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import PostAddIcon from '@material-ui/icons/PostAdd';

import s from './AddWithCopyBtn.module.scss';

export default function AddBtn({ data, onCreate, onCalculateTotalPositions }) {
  return (
    <Tooltip
      title={'Ctrl + Shift + Enter'}
      arrow
      disableHoverListener={data.isSaved}
    >
      {/* ****** span - для Tooltip-a */}
      <span>
        <button
          onClick={onCreate}
          className={`${s.settingButton} ${s.addWithCopyBtn}`}
          disabled={data.isSaved}
        >
          <PostAddIcon style={{ color: '#98C379', fontSize: 21 }} />
        </button>
      </span>
    </Tooltip>
  );
}
