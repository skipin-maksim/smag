import React from 'react';

import InnerModal from '../InnerModal/InnerModal';
import DefaultBtn from '../../buttons/DefaultBtn/DefaultBtn';

import s from './RemoveModal.module.scss';

export default function RemoveModal({ onCloseModal, onRemoveOrders }) {
  return (
    <InnerModal onCloseModal={onCloseModal}>
      <div className={s.removeModal}>
        <h2 className={s.modalTitle}>Предупреждение</h2>
        <p className={s.modalText}>
          Вы уверенны что хотите удалить выбранные элементы!?
        </p>
        <p className={s.modalText}>
          Вернуть эти данные, будет{' '}
          <span className={s.accentText}>не возможно!</span>
        </p>

        <div className={s.blockBtn}>
          <DefaultBtn
            text="Удалить"
            handleOnClick={onRemoveOrders}
            customClassName={'removeBtn'}
          />

          <DefaultBtn
            text="Отмена"
            handleOnClick={onCloseModal}
            customClassName={'canselBtn'}
          />
        </div>
      </div>
    </InnerModal>
  );
}
