// src/app/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/services/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
