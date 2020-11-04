import { createAction } from '@reduxjs/toolkit';

const addTab = createAction('tabs/addTab');
const removeTab = createAction('tabs/removeTab');

export default {
  addTab,
  removeTab,
};
