import { createAction } from '@reduxjs/toolkit';

const addTab = createAction('TABS_addTab');
const addTabOrder = createAction('TABS_addTabOrder');
const removeTab = createAction('TABS_removeTab');

const widthLineTabs = createAction('TABS_getWidthLineTabs');
const moveSlideLeft = createAction('TABS_moveSlideLeft');

const saveToTemporaryStorageLocation = createAction(
  'TABS_saveToTemporaryStorageLocation',
);
const getDataOfTemporaryStorageLocation = createAction(
  'TABS_getDataOfTemporaryStorageLocation',
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
