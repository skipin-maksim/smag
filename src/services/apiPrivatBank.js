import axios from 'axios';

axios.defaults.baseURL = 'https://api.privatbank.ua/';

const pickUpCurrencyData = async () => {
  try {
    const { data } = await axios.get(`p24api/pubinfo?json&exchange&coursid=5`);

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default pickUpCurrencyData;
