
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../types/Movie";

interface MovieState {
  allMovies: Movie[];
  favorites: string[];
}

const initialState: MovieState = {
  allMovies: [],
 
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.allMovies = action.payload;
       localStorage.setItem('allMovies', JSON.stringify(state.allMovies));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    loadFavorites: (state) => {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        state.favorites = JSON.parse(stored);
      }
      console.log(stored);
    },

    loadAllMovies: (state) => {
  const stored = localStorage.getItem('allMovies');
  if (stored) {
    state.allMovies = JSON.parse(stored);
  }
}
  },
});

export const { setMovies, toggleFavorite, loadFavorites, loadAllMovies } = movieSlice.actions;
export default movieSlice.reducer;
