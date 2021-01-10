import React from 'react';

import CloseBtn from '../../buttons/CloseBtn/CloseBtn';

import s from './InnerModal.module.scss';

export default function InnerModal({
  children,
  onCloseModal,
  width = 500,
  height = 500,
}) {
  return (
    <div
      className={s.innerModal}
      style={{ width: width + 'px', height: height + 'px' }}
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
