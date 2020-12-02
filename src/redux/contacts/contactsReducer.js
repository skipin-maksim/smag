import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { contactsActions } from './';
// import { ordersActions } from '../orders/';
// import { modalActions } from '../modal/';

const allContacts = createReducer([], {
  [contactsActions.getAllContactsSuccess]: (state, { payload }) => [...payload],
  // [modalActions.closeModal]: () => [],
  // [ordersActions.saveOrderSuccess]: (state, { payload }) => {
  //   console.log(payload);
  //   return state;
  // },
});

const loader = createReducer(false, {
  [contactsActions.getAllContactsRequest]: () => true,
  [contactsActions.getAllContactsSuccess]: () => false,
  [contactsActions.getAllContactsError]: () => false,
});

export default combineReducers({ allContacts, loader });
