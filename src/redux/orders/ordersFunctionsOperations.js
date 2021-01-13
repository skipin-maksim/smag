import { v4 as uuidv4 } from 'uuid';

const changeLineProductInput = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return item.id === payload.id
        ? { ...item, [payload.name]: payload.value }
        : item;
    }),
  };
};
const changeMainCheckbox = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return { ...item, [payload.name]: payload.value };
    }),
  };
};
const checkboxOrderSwitch = (state, payload) => {
  return state.map(item =>
    item.orderNum === payload.id
      ? { ...item, isCheckedOrder: payload.value }
      : item,
  );
};
const getPriceByVendorCodeSuccess = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return item.vendorCode === payload.vendorCode
        ? {
            ...item,
            price: payload.prices.wholesale,
            provider: payload.provider,
          }
        : item;
    }),
  };
};
const changeLineProductInputQuantity = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return item.id === payload.id
        ? { ...item, [payload.name]: payload.value }
        : item;
    }),
  };
};
const deleteLineSelectedProduct = state => {
  return {
    ...state,
    items: state.items.filter(product => !product.checkProduct),
  };
};
const calculateSum = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return item.id === payload.id
        ? {
            ...item,
            sum:
              Number(item.quantity) * Number(item.price) -
              (Number(item.quantity) *
                Number(item.price) *
                Number(item.discount)) /
                100,
          }
        : item;
    }),
  };
};
const calculateTotalQuantity = state => {
  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      quantity: state.items.reduce((prev, cur) => {
        return Number(prev) + Number(cur.quantity);
      }, 0),
    },
  };
};
const calculateTotalSum = state => {
  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      sum: state.items.reduce((prev, cur) => {
        return Number(prev) + Number(cur.sum);
      }, 0),
    },
  };
};
const calculateAveragePrice = state => {
  const calcAveragePrice = state => {
    const totalPriceSum = state.items.reduce((prev, cur) => {
      return Number(prev) + Number(cur.price);
    }, 0);
    return totalPriceSum / state.items.length;
  };

  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      averagePrice: calcAveragePrice(state),
    },
  };
};
const calculateRemainderPaid = (state, payload) => {
  const { sum } = state.calculatedTotals;
  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      remainderPaid: sum && payload ? sum - payload : sum - state.prepayment,
    },
  };
};
const createLineProduct = state => {
  return {
    ...state,
    items: [
      ...state.items,
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
  };
};
const createLineProductCopy = (state, payload) => {
  return {
    ...state,
    items: [
      ...state.items,
      {
        id: uuidv4(),
        checkProduct: false,
        vendorCode: payload.vendorCode,
        color: '',
        quantity: '0',
        price: '0',
        discount: '0',
        sum: '0',
        note: '',
      },
    ],
  };
};
const calculateTotalPositions = state => {
  return {
    ...state,
    calculatedTotals: {
      ...state.calculatedTotals,
      positions: state.items.length,
    },
  };
};

export const func = {
  changeLineProductInput,
  changeMainCheckbox,
  checkboxOrderSwitch,
  getPriceByVendorCodeSuccess,
  changeLineProductInputQuantity,
  deleteLineSelectedProduct,
  calculateSum,
  calculateTotalQuantity,
  calculateTotalSum,
  calculateAveragePrice,
  calculateRemainderPaid,
  createLineProduct,
  createLineProductCopy,
  calculateTotalPositions,
};
