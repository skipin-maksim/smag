import { v4 as uuidv4 } from 'uuid';

export const initCurrentOrder = {
  items: [
    {
      id: uuidv4(),
      provider: '',
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
  clientInfo: {
    firstName: '',
    secondName: '',
    thirdName: '',
    city: '',
    post: '',
    tel: '',
    debt: 0,
  },
  isSaved: false,
  isEdit: false,
  prepayment: 0,
  noteForOrder: '',
  status: 'Не обработан',
};
