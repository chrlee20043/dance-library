import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoListName({ video }) {
  const [videos, setVideos] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  //   function handleSavedVideo(updatedVideo) {
  //     const updatedVideoArray = videos.map((video) => {
  //       if (video.video_id === updatedVideo.video_id) {
  //         return updatedVideo;
  //       } else {
  //         return video;
  //       }
  //     });
  //     setVideos(updatedVideoArray);
  //   }

  return (
    <div id="video-card-container">
      <h3>{video.instructor_name}</h3>
      <img src={video.imageURL} />
      <p>Style: {video.style}</p>
      <p>Level: {video.level}</p>
      {/* <div id="video-card-buttons">
        {isSaved ? (
          <div>
            <input
              className="card-button"
              type="checkbox"
              checked={isSaved}
              onChange={handleSavedVideo}
            />
          </div>
        ) : (
          <div>
            <input
              className="card-button"
              type="checkbox"
              onChange={handleSavedVideo}
            />
          </div>
        )}
      </div> */}
      <button
        onClick={() => {
          navigate(`/allvideos/${video.video_id}`);
        }}
      >
        See Class Details
      </button>
    </div>
  );
}
