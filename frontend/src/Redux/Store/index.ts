import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { userReducer } from "../Reducers";
import { UserReducer } from "../Reducers/User";
import { ProductsReducer } from "../Reducers/products";

const reducers = combineReducers({
  user: userReducer,
  User: UserReducer,
  products: ProductsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
