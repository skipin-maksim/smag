import axios from 'axios';

const changeBaseUrl = () =>
  (axios.defaults.baseURL = 'https://api.privatbank.ua/');

const pickUpCurrencyData = async () => {
  changeBaseUrl();

  try {
    const { data } = await axios.get(`p24api/pubinfo?json&exchange&coursid=5`);

    return data;
  } catch (err) {
    console.error(err);

    return {
      usd: { ccy: 'USD', sale: '??', buy: '??' },
      eur: { ccy: 'EUR', sale: '??', buy: '??' },
    };
  }
};

export default pickUpCurrencyData;
