import React from "react";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleSaveVideo = () => {
    alert("Video saved!");
  };

  const handleSeeVideo = () => {
    console.log("here is the video");
    alert("watch video!");
    // window.open(
    //     {video.videoURL}, "_blank"
  };

  const handleReturnToVideos = () => {
    navigate("/allvideos");
  };

  return (
    <div id="single-video-container">
      <p>Instructor: {video.instructor_name}</p>
      <p>Style: {video.style}</p>
      <p>Level: {video.level}</p>
      <p>Video: {video.videoURL}</p>
      <button onClick={handleSaveVideo}>Save Class</button>
      <button onClick={handleReturnToVideos}>Return to All Classes</button>
    </div>
  );
}
