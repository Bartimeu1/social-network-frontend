import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api/apiSlice';
import { userApi } from './features/user/userApi';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const allMiddlewares = [apiSlice.middleware, userApi.middleware];
    return getDefaultMiddleware().concat(...allMiddlewares);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
