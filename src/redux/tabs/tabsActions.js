import { createAction } from '@reduxjs/toolkit';

const addTab = createAction('tabs/addTab');
const addTabOrder = createAction('/tabs/addTabOrder');
const removeTab = createAction('tabs/removeTab');

const widthLineTabs = createAction('tabs/getWidthLineTabs');
const moveSlideLeft = createAction('tabs/moveSlideLeft');

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

  widthLineTabs,
  moveSlideLeft,

  saveToTemporaryStorageLocation,
  getDataOfTemporaryStorageLocation,
};
