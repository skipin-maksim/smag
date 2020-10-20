import axios from 'axios';

const pickUpCurrencyData = async () => {
  try {
    const result = await axios.get(
      `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`,
    );

    return result.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default pickUpCurrencyData;
