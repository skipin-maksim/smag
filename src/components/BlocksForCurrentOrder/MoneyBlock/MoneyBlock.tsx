import { FC } from 'react';
import { CurrentOrderType } from '../../../redux/orders/initialStateForReducers';

import s from './MoneyBlock.module.scss';

type PropsType = {
  currentOrder: CurrentOrderType;
  calculatedTotals: CurrentOrderType['calculatedTotals'];

  onChangePrepaymentInput: (targetValue: string) => void;
  onCalculateRemainderPaid: (targetValue: string) => void;
  onSaveToTemporaryStorageLocation: (currentOrder: Object) => void;
};

const MoneyBlock: FC<PropsType> = ({
  currentOrder,
  calculatedTotals,
  onChangePrepaymentInput,
  onCalculateRemainderPaid,
  onSaveToTemporaryStorageLocation,
}) => {
  const handleOnBlurPrepayment = (value: string) => {
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
};

export default MoneyBlock;
