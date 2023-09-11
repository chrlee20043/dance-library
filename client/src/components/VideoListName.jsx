import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoListName({ video }) {
  // const [isSaved, setIsSaved] = useState(false);

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
      {/* <img src={video.imageURL} /> */}
      {/* <p>{video.video_id}</p> */}
      <p>Style: {video.style}</p>
      <p>Level: {video.level}</p>
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
        See Class Details
      </button>
    </div>
  );
}
