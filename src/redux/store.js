import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { tabsReducer } from './tabs/';
import { ordersReducer } from './orders/';
import { modalReducer } from './modal/';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const tabsPersistConfig = {
  key: 'tabs',
  storage,
  whitelist: ['items'],
};

export const store = configureStore({
  reducer: {
    tabs: persistReducer(tabsPersistConfig, tabsReducer),
    orders: ordersReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
