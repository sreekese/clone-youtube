import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeVideo, toggleLike, toggleSave } from "../utils/appSlice";
export default function WatchVideo({ video }) {
  const [failed, setFailed] = useState(false);
  const { liked, saved } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  return (
    <section className="watch" aria-label="Video player">
      <button className="text-button" onClick={() => dispatch(closeVideo())}>
        ← Back to videos
      </button>
      <video
        controls
        playsInline
        preload="metadata"
        poster={video.thumbnail}
        src={video.src}
        onError={() => setFailed(true)}
        aria-label={video.title}
      />
      {failed && (
        <p role="alert">
          This video could not be loaded. Check your connection and try again.
        </p>
      )}
      <h1>{video.title}</h1>
      <p>
        {video.channel} · {video.views} views
      </p>
      <div className="watch-actions">
        <button
          className="chip"
          aria-pressed={liked.includes(video.id)}
          onClick={() => dispatch(toggleLike(video.id))}
        >
          {liked.includes(video.id) ? "Liked" : "Like"}
        </button>
        <button
          className="chip"
          aria-pressed={saved.includes(video.id)}
          onClick={() => dispatch(toggleSave(video.id))}
        >
          {saved.includes(video.id)
            ? "Saved to watch later"
            : "Save to watch later"}
        </button>
      </div>
      <div className="description">
        Sample video from {video.channel}. This demo uses a public sample media
        collection. Playback requires an internet connection.
      </div>
    </section>
  );
}
