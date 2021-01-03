import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { tabsReducer } from './tabs/';
import { ordersReducer } from './orders/';
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

const authenticatedPersistConfig = {
  key: 'authenticated',
  storage,
  whitelist: ['isAuthenticated'],
};

const temporaryStorageLocationPersistConfig = {
  key: 'orders',
  storage,
  whitelist: ['temporaryStorageLocation'],
};

export const store = configureStore({
  reducer: {
    isAuthenticated: persistReducer(authenticatedPersistConfig, authReducer),
    numOrder: numOrderReducer,
    tabs: persistReducer(tabsPersistConfig, tabsReducer),
    orders: persistReducer(
      temporaryStorageLocationPersistConfig,
      ordersReducer,
    ),
    contacts: contactsReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
