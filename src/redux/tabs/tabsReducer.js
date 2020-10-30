import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { tabsActions } from './';

const initialStateItem = [{ name: 'Главная', path: '/' }];

const addTabs = (state, payload) => {
  const isTabs = state.find(item => item.name === payload.name);

  if (!isTabs) return [...state, payload];

  return state;
};

const items = createReducer(initialStateItem, {
  [tabsActions.addTabs]: (state, { payload }) => addTabs(state, payload),
  [tabsActions.removeTabs]: (state, { payload }) => {
    if (state.length === 1) return;

    return state.filter(item => item.name !== payload);
  },
});

export default combineReducers({
  items,
});
