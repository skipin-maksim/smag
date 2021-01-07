import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { tabsActions } from './';
import ordersActions from '../orders/ordersActions';

const initialStateItem = [];

const addTab = (state, payload) => {
  const isTabs = state.find(item => item.name === payload.name);

  if (!isTabs) return [...state, payload];

  return state;
};
const removeTab = (state, payload) => {
  // if (state.length === 1) {
  //   return initialStateItem;
  // }

  return state.filter(item => item.name !== payload);
};

const items = createReducer(initialStateItem, {
  [tabsActions.addTab]: (state, { payload }) => addTab(state, payload),
  [tabsActions.removeTab]: (state, { payload }) => removeTab(state, payload),
  [tabsActions.addTabOrder]: (state, { payload }) => addTab(state, payload),
  [ordersActions.saveOrderSuccess]: (state, { payload }) => {
    const newState = state.filter(item => item.path !== `/orders/new-order`);

    return [...newState, payload.createTabForNewOrder.payload];
  },
  [ordersActions.getOrderByIdError]: (state, { payload }) => {
    console.log(payload.id);
    const newState = state.filter(item => item.label !== payload.id);

    return newState;
  },
  [ordersActions.removeOrdersSuccess]: (state, { payload }) => {
    console.log(payload.tabsOrder);

    const newArr = payload.tabsOrder.map(item => {
      const filterTabs = state.filter(tab => {
        if (tab.label === item) {
          console.log(tab.label, '-------', item);
          console.log('-------------------ничего------------------------');
          // eslint-disable-next-line array-callback-return
          return;
        }
        if (tab.label !== item || tab.label === 'text tab') {
          console.log(tab.label, '++++++', item);
          console.log('+++++++++++++++', tab, ' +++++++++++++++');
          return tab;
        }
      });

      return filterTabs;
    });

    console.log(newArr);
    return newArr;
  },
});
// ordersActions.getOrderByIdError
const positionData = createReducer(
  { width: 0, left: 0 },
  {
    [tabsActions.widthLineTabs]: (state, { payload }) => {
      return { ...state, width: payload };
    },
    [tabsActions.moveSlideLeft]: (state, { payload }) => {
      return { ...state, left: payload };
    },
  },
);

export default combineReducers({
  items,
  positionData,
});
