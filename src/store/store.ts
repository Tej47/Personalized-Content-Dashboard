import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore} from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from './UserSlice';
import { newsApi } from "./api/newsApi";
import { tmdbApi } from "./api/tmdbApi";

const createNoopStorage = () => {
  return {
    getItem(_key: string) { return Promise.resolve(null); },
    setItem(_key: string, value: any) { return Promise.resolve(value); },
    removeItem(_key: string) { return Promise.resolve(); },
  };
};

const storage = typeof window !== "undefined" 
  ? createWebStorage("local") 
  : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    user: userReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(newsApi.middleware, tmdbApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;