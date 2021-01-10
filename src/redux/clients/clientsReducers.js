import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { clientsActions } from '.';

const allClients = createReducer([], {
  [clientsActions.getAllClientsSuccess]: (state, { payload }) => [...payload],
  [clientsActions.checkboxClientSwitch]: (state, { payload }) => {
    const checkedClient = state.map(item => {
      return item._id === payload._id
        ? { ...item, isChecked: payload.value }
        : item;
    });

    return checkedClient;
  },
});

const loader = createReducer(false, {
  [clientsActions.getAllClientsRequest]: () => true,
  [clientsActions.getAllClientsSuccess]: () => false,
  [clientsActions.getAllClientsError]: () => false,
});

export default combineReducers({ allClients, loader });
