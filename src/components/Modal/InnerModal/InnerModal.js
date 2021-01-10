import React from 'react';

import CloseBtn from '../../buttons/CloseBtn/CloseBtn';

import s from './InnerModal.module.scss';

export default function InnerModal({
  children,
  onCloseModal,
  width = 500,
  height = 'auto',
}) {
  const isHeight = height === 'auto' ? 'auto' : height + 'px';

  return (
    <div
      className={s.innerModal}
      style={{ width: width + 'px', height: isHeight }}
    >
      <div className={s.modalContent}>
        {children}
        <CloseBtn
          onClick={onCloseModal}
          additionalClassName={s.closeModalBtn}
        />
      </div>
    </div>
  );
}
