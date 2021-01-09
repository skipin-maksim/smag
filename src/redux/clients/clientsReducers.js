import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { clientsActions } from '.';

const allClients = createReducer([], {
  [clientsActions.getAllClientsSuccess]: (state, { payload }) => [...payload],
});

const loader = createReducer(false, {
  [clientsActions.getAllClientsRequest]: () => true,
  [clientsActions.getAllClientsSuccess]: () => false,
  [clientsActions.getAllClientsError]: () => false,
});

export default combineReducers({ allClients, loader });
