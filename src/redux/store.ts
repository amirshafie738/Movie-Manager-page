import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../redux/reducers/TodoCartRaducer";
import favoriteRaducer from "../redux/reducers/favoriteSlice";

export const store = configureStore({
    reducer:{ 
         movie: movieReducer,
         favorites:favoriteRaducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;