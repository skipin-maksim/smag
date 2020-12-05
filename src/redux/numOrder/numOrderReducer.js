import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { numOrderActions } from './';

const numOrder = createReducer(
  { valueNum: 0, valueStr: '00000' },
  {
    [numOrderActions.numOrderSuccess]: (state, { payload }) => {
      console.log(payload);
      return payload;
    },
  },
);

export default combineReducers({
  numOrder,
});
