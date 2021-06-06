import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import s from './WindowTable.module.scss';

export default function WindowTable({ children, otherBlock }) {
  return (
    <div className={s.windowOrders}>
      <Scrollbar
        style={{
          height: 530,
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.233)',
        }}
      >
        {children}
      </Scrollbar>
      {otherBlock}
    </div>
  );
}
