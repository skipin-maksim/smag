import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { tabsReducer } from './tabs/';
import { ordersReducer } from './orders/';
import { modalReducer } from './modal/';
import { contactsReducer } from './contacts/';
import { numOrderReducer } from './numOrder/';
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
const temporaryStorageLocationPersistConfig = {
  key: 'orders',
  storage,
  whitelist: ['temporaryStorageLocation'],
};

export const store = configureStore({
  reducer: {
    numOrder: numOrderReducer,
    tabs: persistReducer(tabsPersistConfig, tabsReducer),
    orders: persistReducer(
      temporaryStorageLocationPersistConfig,
      ordersReducer,
    ),
    contacts: contactsReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
