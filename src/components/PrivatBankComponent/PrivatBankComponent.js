import React, { Component } from 'react';

import pickUpCurrencyData from '../../services/apiPrivatBank';

import s from './PrivatBankComponent.module.scss';
import Currency from './Currency';
import RefreshButton from '../Buttons/RefreshButton/RefreshButton';

const initDataPrivat = {
  usd: { ccy: 'USD', sale: '??', buy: '??' },
  eur: { ccy: 'EUR', sale: '??', buy: '??' },
};
class PrivatComponent extends Component {
  state = {
    useDataPrivatBank: { ...initDataPrivat },
    isLoader: false,
  };

  componentDidMount() {
    this.getExchangeRatesData();
  }

  getExchangeRatesData = async () => {
    this.setState({ isLoader: true });

    const exchangeRatesData = await pickUpCurrencyData();

    this.setState({
      useDataPrivatBank: { ...initDataPrivat, ...exchangeRatesData },
      isLoader: false,
    });
  };

  render() {
    const { useDataPrivatBank, isLoader } = this.state;

    return (
      <>
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
            onRefreshFunction={this.getExchangeRatesData}
            size={20}
            tooltipText="Обновить курс"
            isRotate={isLoader}
          />
        </div>
      </>
    );
  }
}

export default PrivatComponent;
