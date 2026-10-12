import { Menu, Search, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { navigate, search, toggleMenu } from "../utils/appSlice";

export default function Head() {
  const dispatch = useDispatch();
  const { query, isMenuOpen } = useSelector((state) => state.app);
  return (
    <header className="header">
      <button
        className="icon-button"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        aria-controls="sidebar"
        onClick={() => dispatch(toggleMenu())}
      >
        <Menu />
      </button>
      <button className="brand" onClick={() => dispatch(navigate("Home"))}>
        <span>
          <Play fill="currentColor" size={20} />
        </span>
        ViewTube
      </button>
      <form
        className="search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          aria-label="Search videos"
          placeholder="Search videos"
          value={query}
          onChange={(event) => dispatch(search(event.target.value))}
        />
        <button aria-label="Search" type="submit">
          <Search size={21} />
        </button>
      </form>
      <span className="demo-label">LOCAL DEMO</span>
    </header>
  );
}
