import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dogApi } from "../services/DogService";
import { userApi } from "../services/UserService";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [dogApi.reducerPath]: dogApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([userApi.middleware, dogApi.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
