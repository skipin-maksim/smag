import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { authActions } from './';

const currentAuthUser = createReducer(
  {},
  {
    [authActions.logInSuccess]: (state, { payload }) => {
      console.log(payload);
      return payload.user;
    },
    [authActions.getCurrentUserSuccess]: (state, { payload }) => payload.user,
  },
);

const tokens = createReducer(null, {
  [authActions.logInSuccess]: (state, { payload }) => payload.tokens,
});

export default combineReducers({
  currentAuthUser,
  tokens,
});
