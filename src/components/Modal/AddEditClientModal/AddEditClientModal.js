import React from 'react';

import InnerModal from '../InnerModal/InnerModal';

// import s from './AddEditClientModal.module.scss';

export default function AddEditClientModal({ onCloseModal }) {
  return (
    <InnerModal width={600} height={400} onCloseModal={onCloseModal}>
      gfg
    </InnerModal>
  );
}
