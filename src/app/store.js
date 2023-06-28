import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

const userOnlyFilter = createFilter("user", ["user"]);
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [userOnlyFilter],
};
const rootReducer = combineReducers({ user: userSlice });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export const persistor = persistStore(store);
