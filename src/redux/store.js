import { configureStore } from '@reduxjs/toolkit';

import tabsReducer from './tabs/tabsReducer';

const store = configureStore({
  reducer: {
    tabs: tabsReducer,
  },
});

export default store;
