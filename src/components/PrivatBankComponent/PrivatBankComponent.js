import React, { useState, useEffect, useCallback } from 'react';

import pickUpCurrencyData from '../../services/apiPrivatBank';

import Currency from './Currency';
import RefreshButton from '../buttons/RefreshButton/RefreshButton';

import s from './PrivatBankComponent.module.scss';

export default function PrivatBankComponent3() {
  const initDataPrivat = {
    usd: { ccy: 'USD', sale: '??', buy: '??' },
    eur: { ccy: 'EUR', sale: '??', buy: '??' },
  };

  const [useDataPrivatBank, setUseDataPrivatBank] = useState({
    ...initDataPrivat,
  });

  const [isLoader, setIsLoader] = useState(false);

  const getExchangeRatesData = useCallback(async () => {
    setIsLoader(true);

    const exchangeRatesData = await pickUpCurrencyData();

    setUseDataPrivatBank({ ...initDataPrivat, ...exchangeRatesData });

    setIsLoader(false);
  }, [initDataPrivat]);

  useEffect(() => {
    getExchangeRatesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.privatWrapper}>
      <div className={s.privatBlock}>
        {!isLoader && (
          <>
            <Currency viewDetails={useDataPrivatBank.usd} />
            <Currency viewDetails={useDataPrivatBank.eur} />
          </>
        )}

        {isLoader && 'Загрузка...'}
      </div>

      <RefreshButton
        onRefreshFunction={getExchangeRatesData}
        size={20}
        tooltipText="Обновить курс"
        isRotate={isLoader}
      />
    </div>
  );
}
