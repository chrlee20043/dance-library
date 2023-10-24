import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoListName({ video }) {
  const navigate = useNavigate();

  return (
    <div id="video-card-container">
      <div id="all-video-card">
        <h3 className="videocard-title">
          {video.level} {video.style} with {video.instructor_name}
        </h3>

        <iframe
          // width="560"
          // height="315"
          src={video.videoURL}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <button
          className="card-button"
          onClick={() => {
            navigate(`/allvideos/${video.video_id}`);
          }}
        >
          Class Details
        </button>
      </div>
    </div>
  );
}
