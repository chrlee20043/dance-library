import React from "react";
import { useNavigate } from "react-router-dom";

export default function VideoListName({ video }) {
  const navigate = useNavigate();
  return (
    <div id="video-card-container">
      <h3>Instructor: {video.instructor_name}</h3>
      <p>Style: {video.style}</p>
      <p>Level: {video.level}</p>
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