import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isMenuOpen: true,
  query: "",
  category: "All",
  section: "Home",
  selectedId: null,
  liked: [],
  saved: [],
  history: [],
};
const toggleId = (items, id) =>
  items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    search(state, { payload }) {
      state.query = payload;
      state.selectedId = null;
    },
    selectCategory(state, { payload }) {
      state.category = payload;
      state.selectedId = null;
    },
    navigate(state, { payload }) {
      state.section = payload;
      state.category = "All";
      state.query = "";
      state.selectedId = null;
    },
    watchVideo(state, { payload }) {
      state.selectedId = payload;
      state.history = [
        payload,
        ...state.history.filter((id) => id !== payload),
      ];
    },
    closeVideo(state) {
      state.selectedId = null;
    },
    toggleLike(state, { payload }) {
      state.liked = toggleId(state.liked, payload);
    },
    toggleSave(state, { payload }) {
      state.saved = toggleId(state.saved, payload);
    },
    clearHistory(state) {
      state.history = [];
    },
  },
});
export const {
  toggleMenu,
  search,
  selectCategory,
  navigate,
  watchVideo,
  closeVideo,
  toggleLike,
  toggleSave,
  clearHistory,
} = appSlice.actions;
export default appSlice.reducer;
