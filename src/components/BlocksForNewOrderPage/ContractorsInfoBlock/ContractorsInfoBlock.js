import React from 'react';

import s from './ContractorsInfoBlock.module.scss';

export default function ContractorsInfoBlock({
  currentContractorInfo,
  currentOrder,
  allContacts,
  onChoiseContractor,
  onOpenModal,
}) {
  const {
    secondName,
    firstName,
    thirdName,
    city,
    post,
    tel,
    debt,
  } = currentContractorInfo;

  const handleChoiseContractors = () => {
    onOpenModal();
    // onChoiseContractor();
    allContacts();
  };

  return (
    <div className={s.contractorInfo}>
      <div className={s.contractorsBlock}>
        <button
          type="button"
          className={s.contractorsBtn}
          onClick={handleChoiseContractors}
          disabled={currentOrder.isSaved}
        >
          Выбрать контрагента
        </button>
        <span className={s.contractorName}>
          {!secondName ? 'Контрагент не выбран' : secondName} {firstName}{' '}
          {thirdName}
        </span>
      </div>
      <div className={s.contractorInfoInner}>
        <span>{city}</span>
        <span>
          {!post ? 'нет данных по доставке' : `Новая Почта № ${post}`}
        </span>
        <span>{tel}</span>
      </div>

      <div className={s.contractorInfoInnerDept}>
        Долг контрагента:{' '}
        <span className={debt > 0 ? 'green' : 'red'}>
          {debt.toLocaleString('ru')}
        </span>
      </div>
    </div>
  );
}
