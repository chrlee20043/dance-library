// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import favoriteReducer from "./favoriteSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authenticate", "favoriteMuseum"],
};

const rootReducer = combineReducers({
  authenticate: authReducer,
  favoriteMuseum: favoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logMiddleware = (store) => (next) => (action) => {
  if (action.type === "persist/REHYDRATE") {
    console.log("REHYDRATE action:", action);
    console.log("store", store);
  }
  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logMiddleware),
});

export const persistor = persistStore(store);
