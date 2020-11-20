import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { contactsActions } from './';

const allContacts = createReducer([], {
  [contactsActions.getAllContactsSuccess]: (state, { payload }) => [
    ...state,
    ...payload,
  ],
});

export default combineReducers({ allContacts });
