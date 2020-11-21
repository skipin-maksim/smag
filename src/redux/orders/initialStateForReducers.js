import { v4 as uuidv4 } from 'uuid';

export const initAllProducts = {
  items: [
    {
      id: uuidv4(),
      checkProduct: false,
      vendorCode: '',
      color: '',
      quantity: '0',
      price: '0',
      discount: '0',
      sum: '0',
      note: '',
    },
  ],
  calculatedTotals: {
    positions: 1,
    quantity: 0,
    averagePrice: 0,
    sum: 0,
    prepayment: 0,
  },
  noteForOrder: '',
  date: '',
};

export const initCurrentContractorInfo = {
  id: '00001',
  numOrder: '00001',
  isSave: true,
  orderInfo: {
    positions: 10,
    totalQuantity: 100,
    sum: 1000,
    prepayment: 100,
    checkOrder: false,
  },
  contactInfo: {
    firstName: '',
    secondName: '',
    thirdName: '',
    city: '',
    post: '',
    tel: '',
    debt: 0,
  },
  date: '',
};
