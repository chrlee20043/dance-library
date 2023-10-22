import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favoriteClass",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const favorite = action.payload;
      if (!state.favorites.some((item) => item.videoId === favorite.videoId)) {
        state.favorites.push(favorite);
      }
      console.log("videoId in slice", favorite.videoId);
    },
    removeFavorite: (state, action) => {
      const favoriteIdToRemove = action.payload.favoriteId;
      console.log("remove:", favoriteIdToRemove);
      state.favorites = state.favorites.filter(
        (favorite) => favorite.favoriteId !== favoriteIdToRemove
      );
    },

    resetFavorites: (state) => {
      state.favorites = initialState.favorites;
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, resetFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;

export const selectFavorites = (state) => state.favoriteClass.favorites;
