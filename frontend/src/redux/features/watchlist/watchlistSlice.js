import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.watchlist.some((movie) => movie._id === action.payload._id);
      if (!exists) {
        state.watchlist.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter((movie) => movie._id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export const selectWatchlist = (state) => state.watchlist.watchlist;
export default watchlistSlice.reducer;
