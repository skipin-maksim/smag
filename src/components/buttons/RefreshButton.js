import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Autorenew from '@material-ui/icons/Autorenew';

import s from './RefreshButton.module.scss';

export default function RefreshButton({
  onRefreshFunction,
  size,
  tooltipText,
  isRotate,
}) {
  return (
    <Tooltip title={tooltipText} arrow>
      <button className={s.btnUpdate} type="button" onClick={onRefreshFunction}>
        {isRotate && (
          <Autorenew className={s.rotate} style={{ fontSize: size }} />
        )}

        {!isRotate && <Autorenew style={{ fontSize: size }} />}
      </button>
    </Tooltip>
  );
}
