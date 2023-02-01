import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/UserService";
import { userReducer } from "./reducers/UsersSlice";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  userReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
