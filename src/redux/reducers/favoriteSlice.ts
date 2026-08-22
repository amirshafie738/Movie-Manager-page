import { createSlice } from "@reduxjs/toolkit";
import type { Imovie } from "../../types/movie";
interface Ifavorite {
  favorits: Imovie[];
}
const initialState: Ifavorite = {
  favorits: [],
};

const favoriteSlice = createSlice({
  name: "favorit",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const isExist = state.favorits.some(
        (item) => item.id === action.payload.id
      );
      if (isExist) {
        state.favorits = state.favorits.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.favorits.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
