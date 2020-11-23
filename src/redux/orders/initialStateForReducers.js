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
    remainderPaid: 0,
  },
  isSaved: false,
  prepayment: 0,
  noteForOrder: '',
};

export const initCurrentContractorInfo = {
  contractorInfo: {
    firstName: '',
    secondName: '',
    thirdName: '',
    city: '',
    post: '',
    tel: '',
    debt: 0,
  },
};