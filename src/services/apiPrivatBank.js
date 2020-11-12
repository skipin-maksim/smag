import axios from 'axios';

const basetUrl = 'https://api.privatbank.ua';

const pickUpCurrencyData = async () => {
  try {
    const { data } = await axios(
      `${basetUrl}/p24api/pubinfo?json&exchange&coursid=5`,
    );

    if (data) {
      const updatedData = {};

      data
        .filter(item => item.ccy === 'USD' || item.ccy === 'EUR')
        .map(item => {
          item.buy = item.buy.slice(-0, -3);
          item.sale = item.sale.slice(-0, -3);

          if (item.ccy === 'USD') updatedData.usd = { ...item };
          if (item.ccy === 'EUR') updatedData.eur = { ...item };

          return item;
        });

      return updatedData;
    }
  } catch (err) {
    console.error(err);

    return {
      usd: { ccy: 'USD', sale: '??', buy: '??' },
      eur: { ccy: 'EUR', sale: '??', buy: '??' },
    };
  }
};

export default pickUpCurrencyData;
