import React from "react";
import { useNavigate } from "react-router-dom";

export default function VideoListName({ video }) {
  const navigate = useNavigate();
  return (
    <div>
      <h3>{video.style}</h3>
      <button
        onClick={() => {
          navigate(`/allvideos/${video.video_id}`);
        }}
      >
        See Details
      </button>
    </div>
  );
}
