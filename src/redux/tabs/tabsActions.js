import { createAction } from '@reduxjs/toolkit';

const addTab = createAction('tabs/addTab');
const addTabOrder = createAction('/tabs/addTabOrder');
const removeTab = createAction('tabs/removeTab');

export default {
  addTab,
  removeTab,
  addTabOrder,
};
