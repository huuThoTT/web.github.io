import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import articleReducer from "./articleSlice";
import categoryReducer from "./categorySlice";
import tagReducer from "./tagSlice";
import commentReducer from "./commentSlice";
import ratingReducer from "./ratingSlice";
import articlePendingReducer from "./articlePendingSlice"
import bookMakedReducer from "./bookMakedSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({ auth: authReducer, user: userReducer, article: articleReducer ,category: categoryReducer, tag: tagReducer,comment : commentReducer,rating : ratingReducer,articlePending :articlePendingReducer, bookMaked :bookMakedReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store);