import { v4 as uuidv4 } from 'uuid';

export type CurrentOrderType = {
  items: [
    {
      id: string;
      provider: string;
      checkProduct: false;
      vendorCode: string;
      color: string;
      quantity: string;
      price: string;
      discount: string;
      sum: string;
      note: string;
    },
  ];
  calculatedTotals: {
    positions: number;
    quantity: number;
    averagePrice: number;
    sum: number;
    remainderPaid: number;
  };
  clientInfo: {
    firstName: string;
    secondName: string;
    thirdName: string;
    city: string;
    post: string;
    tel: string;
    debt: number;
  };
  isSaved: false;
  isEdit: false;
  prepayment: number;
  noteForOrder: string;
};

export const initCurrentOrder: CurrentOrderType = {
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
};
