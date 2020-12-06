import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { ordersActions } from './';
import { tabsActions } from '../tabs/';
import { initCurrentOrder } from './initialStateForReducers';

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
const getPriceByArtSuccess = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      return item.vendorCode === payload.vendorCode
        ? { ...item, price: payload.prices.wholesale }
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

const allOrders = createReducer([], {
  [ordersActions.getAllOrdersSuccess]: (state, { payload }) => [...payload],
  [ordersActions.saveOrderSuccess]: (state, { payload }) => [
    ...state,
    payload.data,
  ],
});

const currentOrder = createReducer(initCurrentOrder, {
  [ordersActions.createLineProduct]: (state, _) => {
    return createLineProduct(state);
  },
  [ordersActions.createLineProductCopy]: (state, { payload }) => {
    return createLineProductCopy(state, payload);
  },
  [ordersActions.changeLineProductInput]: (state, { payload }) => {
    return changeLineProductInput(state, payload);
  },
  [ordersActions.changeMainCheckbox]: (state, { payload }) => {
    return changeMainCheckbox(state, payload);
  },
  [ordersActions.getPriceByArtSuccess]: (state, { payload }) => {
    return getPriceByArtSuccess(state, payload);
  },
  [ordersActions.changeLineProductInputQuantity]: (state, { payload }) => {
    return changeLineProductInputQuantity(state, payload);
  },
  [ordersActions.deleteLineSelectedProduct]: (state, _) => {
    return deleteLineSelectedProduct(state);
  },
  [ordersActions.calculateSum]: (state, { payload }) => {
    return calculateSum(state, payload);
  },
  [ordersActions.calculateTotalQuantity]: (state, _) => {
    return calculateTotalQuantity(state);
  },
  [ordersActions.calculateTotalSum]: (state, _) => {
    return calculateTotalSum(state);
  },
  [ordersActions.calculateAveragePrice]: (state, _) => {
    return calculateAveragePrice(state);
  },
  [ordersActions.calculateTotalPositions]: (state, _) => {
    return calculateTotalPositions(state);
  },
  [ordersActions.calculateRemainderPaid]: (state, { payload }) => {
    return calculateRemainderPaid(state, payload);
  },
  [ordersActions.changeInputNoteForOrder]: (state, { payload }) => {
    return { ...state, noteForOrder: payload };
  },
  [ordersActions.changePrepaymentInput]: (state, { payload }) => {
    return { ...state, prepayment: payload };
  },
  [ordersActions.clearCurrentOrder]: (state, { payload }) => {
    return initCurrentOrder;
  },
  [ordersActions.getOrderByIdSuccess]: (state, { payload }) => {
    return payload;
  },
  [ordersActions.choiseContractor]: (state, { payload }) => {
    return {
      ...state,
      contractorInfo: payload,
    };
  },
  [tabsActions.getDataOfTemporaryStorageLocation]: (state, { payload }) => {
    return { ...payload };
  },
  [ordersActions.saveOrderSuccess]: (state, { payload }) => payload.data,
});

const filterContractors = createReducer('', {
  [ordersActions.filterContractors]: (_, { payload }) => payload,
});

const temporaryStorageLocation = createReducer(initCurrentOrder, {
  [tabsActions.saveToTemporaryStorageLocation]: (state, { payload }) => payload,
  [ordersActions.clearTemporaryStorageLocation]: (state, { payload }) => {
    return initCurrentOrder;
  },
});

const loader = createReducer(false, {
  [ordersActions.getOrderByIdRequest]: () => true,
  [ordersActions.getOrderByIdSuccess]: () => false,
  [ordersActions.getOrderByIdError]: () => false,
});

export default combineReducers({
  allOrders,
  currentOrder,
  filterContractors,
  temporaryStorageLocation,
  loader,
});
