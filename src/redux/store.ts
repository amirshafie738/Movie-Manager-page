import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from "../redux/reducers/TodoCartRaducer";
import favoriteRaducer from "../redux/reducers/favoriteSlice";
import storage  from 'redux-persist/es/storage';
import { FLUSH, PAUSE, PURGE, REHYDRATE, persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const combineRaducer =combineReducers({
    movie: movieReducer,
    favorites:favoriteRaducer,
})

const presistConfig ={
    key:"favorite",
    storage,
    whitelist:['favorites']
}

const persistedReducer = persistReducer(presistConfig,combineRaducer)

export const store =configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware({
        serializableCheck:{
          ignoredActions:[FLUSH,REHYDRATE,PAUSE,PURGE]
        }
      })
  })
  export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;