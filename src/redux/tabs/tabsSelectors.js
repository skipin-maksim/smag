// import { createSelector } from '@reduxjs/toolkit';

const getTabsList = state => state.tabs.items;

const getIsTab = (state, name) => {
  // console.log(state.tabs.items);
  return getTabsList(state).find(item => item.name === name);
};

export default {
  getTabsList,
  getIsTab,
};
