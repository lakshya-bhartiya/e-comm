    // src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApiSlice/authApiSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware) // Add Auth API middleware
});