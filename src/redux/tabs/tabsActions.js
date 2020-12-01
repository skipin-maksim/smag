import { createAction } from '@reduxjs/toolkit';

const addTab = createAction('tabs/addTab');
const addTabOrder = createAction('/tabs/addTabOrder');
const removeTab = createAction('tabs/removeTab');

const saveToTemporaryStorageLocation = createAction(
  'tabs/saveToTemporaryStorageLocation',
);
const getDataOfTemporaryStorageLocation = createAction(
  'tabs/getDataOfTemporaryStorageLocation',
);

export default {
  addTab,
  removeTab,
  addTabOrder,

  saveToTemporaryStorageLocation,
  getDataOfTemporaryStorageLocation,
};
