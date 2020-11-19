// import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { modalActions } from './';

const modal = createReducer(false, {
  [modalActions.openModal]: () => true,
  [modalActions.closeModal]: () => false,
});

export default modal;
