import { configureStore } from "@reduxjs/toolkit";
import { allApi } from "./api/allApi";

export const store = configureStore({
  reducer: {
    [allApi.reducerPath]: allApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allApi.middleware),
});
