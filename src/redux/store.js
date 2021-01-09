import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authReducers } from './auth';
import { tabsReducers } from './tabs/';
import { ordersReducers } from './orders/';
import { clientsReducers } from './clients/';
import { numOrderReducers } from './numOrder/';
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
    isAuthenticated: persistReducer(authenticatedPersistConfig, authReducers),
    numOrder: numOrderReducers,
    tabs: persistReducer(tabsPersistConfig, tabsReducers),
    orders: persistReducer(
      temporaryStorageLocationPersistConfig,
      ordersReducers,
    ),
    clients: clientsReducers,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
