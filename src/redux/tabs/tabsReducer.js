import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { tabsActions } from './';

const initialStateItem = [{ name: 'Главная', path: '/' }];

const items = createReducer(initialStateItem, {
  [tabsActions.addTabs]: (state, { payload }) => [...state, payload],
  [tabsActions.removeTabs]: (state, { payload }) => {
    if (state.length === 1) return;

    return state.filter(item => item.name !== payload);
  },
});

export default combineReducers({
  items,
});
