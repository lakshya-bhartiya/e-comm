// src/features/authApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi', // Redux store mein slice ka naam
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/v1/register/create',
        method: 'POST',
        body: userData,
      }),
    }),
    // Login User
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/v1/register/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;