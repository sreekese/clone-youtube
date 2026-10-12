import { useDispatch, useSelector } from "react-redux";
import { Clock, Check } from "lucide-react";
import { videos, filterVideos } from "../data/videos";
import { toggleSave, watchVideo } from "../utils/appSlice";
export default function VideoContainer() {
  const state = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const visible = filterVideos(videos, state);
  if (!visible.length)
    return (
      <div className="empty" role="status">
        <h2>No videos found</h2>
        <p>
          {state.query
            ? "Try another search or category."
            : "Try another category, or add videos to this library from Home."}
        </p>
      </div>
    );
  return (
    <div className="video-grid">
      {visible.map((video) => (
        <article className="video-card" key={video.id}>
          <button
            className="video-link"
            onClick={() => dispatch(watchVideo(video.id))}
            aria-label={`Watch ${video.title}`}
          >
            <div className="thumbnail">
              <img src={video.thumbnail} alt="" loading="lazy" />
              <span className="duration">{video.duration}</span>
            </div>
            <h2>{video.title}</h2>
          </button>
          <p>{video.channel}</p>
          <div className="card-footer">
            <span>
              {video.views} views · {video.category}
            </span>
            <button
              className="icon-button"
              aria-label={`${state.saved.includes(video.id) ? "Remove from" : "Add to"} watch later: ${video.title}`}
              aria-pressed={state.saved.includes(video.id)}
              onClick={() => dispatch(toggleSave(video.id))}
            >
              {state.saved.includes(video.id) ? (
                <Check size={18} />
              ) : (
                <Clock size={18} />
              )}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
