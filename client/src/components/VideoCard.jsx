import React from "react";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ selectedVideo }) {
  const navigate = useNavigate();

  const handleSaveVideo = () => {
    alert("Video saved!");
  };

  const handleReturnToVideos = () => {
    navigate("/allvideos");
  };

  return (
    <div id="single-video-container">
      <h3>{selectedVideo.instructor_name}</h3>
      <img src={selectedVideo.imageURL}></img>
      <h4>{selectedVideo.instructorBio}</h4>
      <p>Style: {selectedVideo.style}</p>
      <p>Level: {selectedVideo.level}</p>
      <a
        id="watch-video-btn"
        href={selectedVideo.videoURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch Video
      </a>
      {/* <p>{selectedVideo.videoURL}</p> */}

      <button onClick={handleSaveVideo}>Save Class</button>
      <button onClick={handleReturnToVideos}>Return to All Classes</button>
    </div>
  );
}
