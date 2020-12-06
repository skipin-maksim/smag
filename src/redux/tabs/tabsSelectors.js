// import { createSelector } from '@reduxjs/toolkit';

const getTabsList = state => state.tabs.items;

const getIsTab = (state, name) =>
  getTabsList(state).find(item => item.name === name);

const getWidthLineTabs = state => state.tabs.positionData.width;
const getLeftPositionLineTabs = state => state.tabs.positionData.left;

export default {
  getTabsList,
  getIsTab,
  getWidthLineTabs,
  getLeftPositionLineTabs,
};
