import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authSlice from './slices/authSlice';
import usersSlice from './slices/usersSlice';
import requestsSlice from './slices/requestsSlice';
import messagesSlice from './slices/messagesSlice';
import questionsSlice from './slices/questionsSlice';
import receiptSlice from './slices/receiptSlice';
import reviewSlice from './slices/reviewSlice';
import reportSlice from './slices/reportSlice';
import serviceSlice from './slices/serviceSlice';
import analyticsSlice from './slices/analyticsSlice';
import projectsSlice from './slices/projectsSlice';
// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  requests: requestsSlice,
  messages: messagesSlice,
  formdata: questionsSlice,
  receipts: receiptSlice,
  reviews: reviewSlice,
  reports: reportSlice,
  services: serviceSlice,
  analytics: analyticsSlice,
  projects: projectsSlice
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
