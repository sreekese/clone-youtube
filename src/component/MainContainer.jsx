import { useDispatch, useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import WatchVideo from "./WatchVideo";
import { videos } from "../data/videos";
import { clearHistory } from "../utils/appSlice";
export default function MainContainer() {
  const { selectedId, section, query, history } = useSelector(
    (state) => state.app,
  );
  const dispatch = useDispatch();
  const video = videos.find((item) => item.id === selectedId);
  return (
    <main id="main-content">
      {video ? (
        <WatchVideo key={video.id} video={video} />
      ) : (
        <>
          <ButtonList />
          <div className="feed-heading">
            <div>
              <p className="eyebrow">EXPLORE SOMETHING NEW</p>
              <h1>
                {query
                  ? `Results for “${query}”`
                  : section === "Home"
                    ? "Recommended for you"
                    : section}
              </h1>
            </div>
            {section === "History" && history.length > 0 && (
              <button
                className="text-button"
                onClick={() => dispatch(clearHistory())}
              >
                Clear history
              </button>
            )}
          </div>
          <VideoContainer />
        </>
      )}
    </main>
  );
}
