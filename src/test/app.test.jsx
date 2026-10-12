import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { createAppStore, readLibrary } from "../utils/store";
import reducer, {
  watchVideo,
  toggleLike,
  toggleSave,
  clearHistory,
  navigate,
} from "../utils/appSlice";
import { filterVideos, videos } from "../data/videos";

function setup() {
  const store = createAppStore();
  render(<App appStore={store} />);
  return { user: userEvent.setup(), store };
}
describe("video filtering", () => {
  it("matches trimmed case-insensitive titles and channels", () => {
    expect(
      filterVideos(videos, { query: "  BUNNY " }).map((v) => v.id),
    ).toEqual(["bunny"]);
    expect(filterVideos(videos, { query: "blender" })).toHaveLength(4);
  });
  it("combines category and library filters", () => {
    expect(
      filterVideos(videos, {
        section: "Watch later",
        saved: ["bunny", "steel"],
        category: "Education",
      }).map((v) => v.id),
    ).toEqual(["steel"]);
    expect(filterVideos(videos, { section: "Liked videos" })).toEqual([]);
  });
  it("sorts history by most recently watched", () => {
    expect(
      filterVideos(videos, {
        section: "History",
        history: ["steel", "bunny"],
      }).map((v) => v.id),
    ).toEqual(["steel", "bunny"]);
  });
});
describe("library state", () => {
  it("deduplicates history and supports clearing it", () => {
    let state = reducer(undefined, watchVideo("bunny"));
    state = reducer(state, watchVideo("steel"));
    state = reducer(state, watchVideo("bunny"));
    expect(state.history).toEqual(["bunny", "steel"]);
    expect(reducer(state, clearHistory()).history).toEqual([]);
  });
  it.each([
    [toggleLike, "liked"],
    [toggleSave, "saved"],
  ])("toggles membership", (action, key) => {
    const state = reducer(undefined, action("bunny"));
    expect(state[key]).toEqual(["bunny"]);
    expect(reducer(state, action("bunny"))[key]).toEqual([]);
  });
  it("resets filters and player when navigating", () => {
    const state = reducer(
      {
        ...createAppStore().getState().app,
        query: "test",
        category: "Movies",
        selectedId: "bunny",
      },
      navigate("History"),
    );
    expect(state).toMatchObject({
      section: "History",
      query: "",
      category: "All",
      selectedId: null,
    });
  });
  it("recovers from invalid storage and removes unknown or duplicate ids", () => {
    expect(readLibrary({ getItem: () => "{invalid" })).toEqual({});
    expect(
      readLibrary({
        getItem: () =>
          JSON.stringify({
            liked: ["bunny", "bunny", "missing"],
            history: "bad",
          }),
      }),
    ).toEqual({ liked: ["bunny"], saved: [], history: [] });
    expect(
      readLibrary({
        getItem: () => {
          throw new Error("blocked");
        },
      }),
    ).toEqual({});
  });
});
describe("browsing interactions", () => {
  it("reports media loading failures", async () => {
    const { user } = setup();
    await user.click(
      screen.getByRole("button", { name: `Watch ${videos[0].title}` }),
    );
    fireEvent.error(screen.getByLabelText(videos[0].title));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This video could not be loaded",
    );
  });

  it("searches and displays an empty result state", async () => {
    const { user } = setup();
    await user.type(
      screen.getByRole("textbox", { name: "Search videos" }),
      "bunny",
    );
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await user.type(
      screen.getByRole("textbox", { name: "Search videos" }),
      " missing",
    );
    expect(screen.getByRole("status")).toHaveTextContent("No videos found");
  });
  it("filters categories and toggles navigation accessibly", async () => {
    const { user } = setup();
    await user.click(
      screen.getByRole("button", { name: "Education", exact: true }),
    );
    expect(screen.getAllByRole("article")).toHaveLength(1);
    const menu = screen.getByRole("button", { name: "Toggle navigation" });
    await user.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    await user.click(menu);
    expect(screen.getByRole("navigation")).toBeVisible();
  });
  it("plays, likes, saves, and revisits a video through the library", async () => {
    const { user, store } = setup();
    await user.click(
      screen.getByRole("button", { name: `Watch ${videos[0].title}` }),
    );
    expect(screen.getByLabelText(videos[0].title)).toHaveAttribute(
      "src",
      videos[0].src,
    );
    await user.click(screen.getByRole("button", { name: "Like", exact: true }));
    await user.click(
      screen.getByRole("button", { name: "Save to watch later" }),
    );
    expect(store.getState().app).toMatchObject({
      liked: ["bunny"],
      saved: ["bunny"],
      history: ["bunny"],
    });
    await user.click(
      within(screen.getByRole("navigation")).getByRole("button", {
        name: "Watch later",
      }),
    );
    expect(screen.getAllByRole("article")).toHaveLength(1);
    await user.click(
      screen.getByRole("button", { name: /Remove from watch later:/ }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("No videos found");
    await user.click(
      screen.getByRole("button", { name: "History", exact: true }),
    );
    await user.click(screen.getByRole("button", { name: "Clear history" }));
    expect(screen.getByRole("status")).toBeVisible();
  });
});
