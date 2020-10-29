import { createAction } from '@reduxjs/toolkit';

const addTabs = createAction('tabs/addTabs');
const removeTabs = createAction('tabs/removeTabs');

export default {
  addTabs,
  removeTabs,
};
