import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import filtersReducer from './filtersSlice';
import sortReducer from './sortSlice';
import { usersApi } from "./users";
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    userTableFilters: filtersReducer,
    userTableSort: sortReducer,

    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware)
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;