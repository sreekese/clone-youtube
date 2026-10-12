import { configureStore } from "@reduxjs/toolkit";
import appReducer, { initialState } from "./appSlice";
import { videos } from "../data/videos";

const storageKey = "viewtube-library-v1";
export function readLibrary(storage) {
  try {
    const data = JSON.parse(storage.getItem(storageKey)) || {};
    return Object.fromEntries(
      ["liked", "saved", "history"].map((key) => [
        key,
        Array.isArray(data[key])
          ? [
              ...new Set(
                data[key].filter((id) =>
                  videos.some((video) => video.id === id),
                ),
              ),
            ]
          : [],
      ]),
    );
  } catch {
    return {};
  }
}
export function createAppStore(library = {}) {
  return configureStore({
    reducer: { app: appReducer },
    preloadedState: { app: { ...initialState, ...library } },
  });
}
let library = {};
try {
  library = readLibrary(window.localStorage);
} catch {
  /* Storage may be unavailable. */
}
const store = createAppStore(library);
store.subscribe(() => {
  const { liked, saved, history } = store.getState().app;
  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ liked, saved, history }),
    );
  } catch {
    /* Keep the session usable when storage is full or blocked. */
  }
});
export default store;
