import React, { Component } from 'react';

import pickUpCurrencyData from '../../services/apiPrivatBank';

import s from './PrivatBankComponent.module.scss';
import Currency from './Currency';
import RefreshButton from '../buttons/RefreshButton';

export default class PrivatComponent extends Component {
  state = {
    allDataPrivatBank: {},
    useDataPrivatBank: { sale: 0, buy: 0 },
    isLoader: false,
  };

  componentDidMount() {
    this.getExchangeRatesData();
  }

  getExchangeRatesData = async () => {
    this.setState({ isLoader: true });

    const exchangeRatesData = await pickUpCurrencyData();
    console.log(exchangeRatesData);

    if (exchangeRatesData) {
      const sliceData = exchangeRatesData.map(item => {
        const buy = item.buy.slice(-0, -3);
        const sale = item.sale.slice(-0, -3);

        return { ...item, buy, sale };
      });

      this.setState({
        allDataPrivatBank: exchangeRatesData,
        useDataPrivatBank: sliceData,
      });
    }

    this.setState({ isLoader: false });
  };

  render() {
    const { allDataPrivatBank, useDataPrivatBank, isLoader } = this.state;
    const isShowPanel = allDataPrivatBank.length > 0;

    return (
      <>
        {isShowPanel && (
          <div className={s.privatWrapper}>
            <div className={s.privatBlock}>
              {!isLoader && (
                <>
                  <Currency
                    useDataPrivatBank={useDataPrivatBank}
                    currency={1}
                  />
                  <Currency
                    useDataPrivatBank={useDataPrivatBank}
                    currency={0}
                  />
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
        )}
      </>
    );
  }
}
