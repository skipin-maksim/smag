import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import notification from 'toastr';
import { clientsActions } from '.';

const resetErrorMessage = null;
const errorHandler = payload => {
  if (
    payload.message.includes('duplicate key error collection') &&
    payload.message.includes('email')
  ) {
    notification.error('Клиент с таким email существует', 'Ошибка');
  }
};

const checkboxClientSwitch = (state, payload) => {
  return state.map(item => {
    return item._id === payload._id
      ? { ...item, isChecked: payload.value }
      : item;
  });
};

const allClients = createReducer([], {
  [clientsActions.getAllClientsSuccess]: (state, { payload }) => {
    return [...payload];
  },
  [clientsActions.checkboxClientSwitch]: (state, { payload }) => {
    return checkboxClientSwitch(state, payload);
  },
  [clientsActions.createClientSuccess]: (state, { payload }) => {
    console.log(payload);
    return [...state, payload];
  },
});

const clientsError = createReducer(null, {
  [clientsActions.createClientError]: (state, { payload }) => {
    errorHandler(payload);
    return payload;
  },
  [clientsActions.createClientSuccess]: (state, { payload }) => {
    return resetErrorMessage;
  },
});

const loader = createReducer(false, {
  [clientsActions.getAllClientsRequest]: () => true,
  [clientsActions.getAllClientsSuccess]: () => false,
  [clientsActions.getAllClientsError]: () => false,
});

export default combineReducers({ allClients, clientsError, loader });
