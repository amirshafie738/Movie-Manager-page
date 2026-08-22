import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Imovie } from "../../types/movie";

interface MovieState {
  selectedMovie: Imovie | null;
}

const initialState: MovieState = {
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,

  reducers: {
    startEdit: (state, action: PayloadAction<Imovie>) => {
      state.selectedMovie = action.payload;
    },

    cancelEdit: (state) => {
      state.selectedMovie = null;
    },
  },
});

export const { startEdit, cancelEdit } = movieSlice.actions;

export default movieSlice.reducer;  