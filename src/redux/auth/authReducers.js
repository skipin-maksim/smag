import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { authActions } from '.';

const isAuthenticated = createReducer(false, {
  [authActions.authenticated]: (state, { payload }) => payload,
});

export default combineReducers({
  isAuthenticated,
});
