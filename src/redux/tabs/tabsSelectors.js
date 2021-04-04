// import { createSelector } from '@reduxjs/toolkit';

const getTabsList = state => state.tabs.items;

const getIsTab = (state, name) =>
  getTabsList(state).find(item => item.name === name);

const getWidthLineTabs = state => state.tabs.positionData.width;

const getLeftPositionLineTabs = state => state.tabs.positionData.left;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTabsList,
  getIsTab,
  getWidthLineTabs,
  getLeftPositionLineTabs,
};
