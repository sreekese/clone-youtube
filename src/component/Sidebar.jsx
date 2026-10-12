import { Home, Clock, History, ThumbsUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../utils/appSlice";
const links = [
  ["Home", Home],
  ["History", History],
  ["Watch later", Clock],
  ["Liked videos", ThumbsUp],
];
export default function Sidebar() {
  const { isMenuOpen, section } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  return (
    <aside id="sidebar" hidden={!isMenuOpen} className="sidebar">
      <nav aria-label="Main navigation">
        {links.map(([name, Icon]) => (
          <button
            key={name}
            className={section === name ? "nav-item active" : "nav-item"}
            aria-current={section === name ? "page" : undefined}
            onClick={() => dispatch(navigate(name))}
          >
            <Icon size={20} />
            {name}
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        Your daily dose of discovery.
        <p>A video browsing demo with a library saved on this device.</p>
      </div>
    </aside>
  );
}
