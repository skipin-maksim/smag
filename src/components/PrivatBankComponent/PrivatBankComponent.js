import React, { Component } from 'react';

import pickUpCurrencyData from '../../services/apiPrivatBank';

import s from './PrivatBankComponent.module.scss';
import Currency from './Currency';
import RefreshButton from '../Buttons/RefreshButton';

const initDataPrivat = {
  usd: { ccy: 'USD', sale: '??', buy: '??' },
  eur: { ccy: 'EUR', sale: '??', buy: '??' },
};
class PrivatComponent extends Component {
  state = {
    allDataPrivatBank: {},
    useDataPrivatBank: { ...initDataPrivat },
    isLoader: false,
  };

  componentDidMount() {
    this.getExchangeRatesData();
  }

  getExchangeRatesData = async () => {
    this.setState({ isLoader: true });

    const exchangeRatesData = await pickUpCurrencyData();

    if (exchangeRatesData) {
      // изначально пустой объект. Функция getSlicePrice записывает в объект нужные валюты, переданные вторым аргументом внутри массива (передавать как строку - имя валюты в любом регистре)
      const sliceData = {};

      const getSlicePrice = (item, currencyArray) => {
        return currencyArray.map(name => {
          if (item.ccy === name.toUpperCase()) {
            const buy = item.buy.slice(-0, -3);
            const sale = item.sale.slice(-0, -3);

            return (sliceData[name.toLowerCase()] = { ...item, buy, sale });
          }

          return item;
        });
      };

      exchangeRatesData.map(item => {
        return getSlicePrice(item, ['usd', 'eur']);
      });

      this.setState({
        allDataPrivatBank: exchangeRatesData,
        useDataPrivatBank: sliceData,
      });
    }

    this.setState({ isLoader: false });
  };

  checkFetchCurrencyData = () => {
    if (this.state.useDataPrivatBank) return true;
  };

  render() {
    const { useDataPrivatBank, isLoader } = this.state;
    const isUseData = this.checkFetchCurrencyData();

    return (
      <>
        <div className={s.privatWrapper}>
          <div className={s.privatBlock}>
            {!isLoader && (
              <>
                {isUseData && (
                  <>
                    <Currency viewDetails={useDataPrivatBank.usd} />
                    <Currency viewDetails={useDataPrivatBank.eur} />
                  </>
                )}

                {!isUseData && (
                  <>
                    <Currency viewDetails={initDataPrivat.usd} />
                    <Currency viewDetails={initDataPrivat.eur} />
                  </>
                )}
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
