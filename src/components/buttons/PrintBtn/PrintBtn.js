import React from 'react';

import PrintIcon from '@material-ui/icons/Print';

import s from './PrintBtn.module.scss';

export default function PrintBtn({ onOpenModalPrint }) {
  return (
    <button
      type="button"
      onClick={() => {
        onOpenModalPrint(true);
      }}
      className={s.settingButton}
    >
      <PrintIcon style={{ color: '#fff', fontSize: 21 }} />
    </button>
  );
}
