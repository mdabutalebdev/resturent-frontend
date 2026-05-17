import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/store/slices/appSlice";
import { baseApi } from "./api/baseApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
