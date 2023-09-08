import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";

export default function VideoCard({ video, onSavedVideo, videos }) {
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  //callback function to render single video on and off Profile page
  function handleSavedVideo(updatedVideo) {
    const updatedVideoArray = videos.map((video) => {
      if (video.video_id === updatedVideo.video_id) {
        return updatedVideo;
      } else {
        return video;
      }
    });
    setSelectedVideo(updatedVideoArray);
  }

  const handleReturnToVideos = () => {
    navigate("/allvideos");
  };

  return (
    <div id="single-video-container">
      <div id="video-card-buttons">
        {isSaved ? (
          <div>
            <input
              className="star-button"
              type="checkbox"
              checked={isSaved}
              onChange={handleSavedVideo}
            />
          </div>
        ) : (
          <div>
            <input
              className="star-button"
              type="checkbox"
              onChange={handleSavedVideo}
            />
          </div>
        )}
      </div>
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

      {/* <button onClick={handleSavedVideo}>Save Class</button> */}
      <button onClick={handleReturnToVideos}>Return to All Classes</button>
    </div>
  );
}
