import React from 'react';

import s from './ClientsInfoBlock.module.scss';

export default function ClientsInfoBlock({
  currentClientInfo,
  currentOrder,
  allContacts,
  onChoiseClient,
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
  } = currentClientInfo;

  const handleChoiseClients = () => {
    onOpenModal();
    // onChoiseClient();
    allContacts();
  };

  return (
    <div className={s.clientInfo}>
      <div className={s.clientsBlock}>
        <button
          type="button"
          className={s.clientsBtn}
          onClick={handleChoiseClients}
          disabled={currentOrder.isSaved}
        >
          Выбрать клиента
        </button>
        <span className={s.clientName}>
          {!secondName ? 'Клиент не выбран' : secondName} {firstName}{' '}
          {thirdName}
        </span>
      </div>
      <div className={s.clientInfoInner}>
        <span>{city}</span>
        <span>{!post ? 'нет данных по доставке' : post}</span>
        <span>{tel}</span>
      </div>

      <div className={s.clientInfoInnerDept}>
        Долг клиента:{' '}
        <span className={debt > 0 ? 'green' : 'red'}>
          {debt.toLocaleString('ru')}
        </span>
      </div>
    </div>
  );
}
