import React, { Component } from 'react';

import pickUpCurrencyData from '../../services/apiPrivatBank';

import s from './PrivatBankComponent.module.scss';
import Currency from './Currency';
import RefreshButton from '../buttons/RefreshButton';

export default class PrivatComponent extends Component {
  state = {
    allDataPrivatBank: {},
    isLoader: false,
    sale: 1,
    buy: 1,
  };

  componentDidMount() {
    this.getExchangeRatesData();
  }

  getExchangeRatesData = async () => {
    this.setState({ isLoader: true });

    const exchangeRatesData = await pickUpCurrencyData();

    const newData = exchangeRatesData.map(item => {
      item.buy = item.buy.slice(-0, -3);
      item.sale = item.sale.slice(-0, -3);

      return item;
    });

    this.setState({
      allDataPrivatBank: newData,
      sale: newData[1].sale,
      buy: newData[1].buy,
    });

    this.setState({ isLoader: false });
  };

  render() {
    const { allDataPrivatBank, isLoader } = this.state;
    const isData = allDataPrivatBank.length > 0;

    return (
      <>
        {isData && (
          <div className={s.privatWrapper}>
            <div className={s.privatBlock}>
              {!isLoader && (
                <>
                  <Currency
                    allDataPrivatBank={allDataPrivatBank}
                    currency={1}
                  />
                  <Currency
                    allDataPrivatBank={allDataPrivatBank}
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
