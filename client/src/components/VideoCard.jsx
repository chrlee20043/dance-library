import React from "react";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleSaveVideo = () => {
    alert("Video saved!");
  };

  return (
    <div>
      <p>Style: {video.style}</p>
      <p>Level: {video.level}</p>
      <video controls width="250">
        <source src={video.videoURL} type="video/webm" />
        Oops, video not available
      </video>
      <button onClick={handleSaveVideo}>Save Video</button>
    </div>
  );
}
