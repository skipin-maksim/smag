import React from 'react';

import s from './MoneyBlock.module.scss';

export default function MoneyBlock({
  currentOrder,
  calculatedTotals,
  onChangePrepaymentInput,
  onCalculateRemainderPaid,
  onSaveToTemporaryStorageLocation,
}) {
  const handleOnBlurPrepayment = value => {
    if (currentOrder.isSaved) onSaveToTemporaryStorageLocation(currentOrder);

    onCalculateRemainderPaid(value);
  };

  return (
    <div className={s.moneyBlock}>
      <label className={s.prepaymentLabel}>
        Предоплата:
        <input
          disabled={currentOrder.isSaved}
          name="prepayment"
          type="number"
          className={s.prepaymentInput}
          value={currentOrder.prepayment}
          onChange={({ target }) => onChangePrepaymentInput(target.value)}
          onBlur={({ target }) => handleOnBlurPrepayment(target.value)}
        />
      </label>
      <div className={s.remainderPaid}>
        Остаток к оплате:{' '}
        <span>
          {' '}
          {calculatedTotals.remainderPaid < 0
            ? 0
            : calculatedTotals.remainderPaid.toLocaleString('ru')}
        </span>
      </div>
    </div>
  );
}
