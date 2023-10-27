import React from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../../context/VideosContext";

import FavoriteClass from "./FavoriteClass";

export default function VideoCard({ userId, token }) {
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const { videoId } = useParams();
  const navigate = useNavigate();

  return (
    // View single video class
    <div id="single-video-container">
      {userId !== selectedVideo.submitted_by && (
        <FavoriteClass userId={userId} videoId={videoId} token={token} />
      )}
      <div id="single-video-card">
        <h3 className="card-title">
          {selectedVideo.level} {selectedVideo.style} with{" "}
          {selectedVideo.instructor_name}
        </h3>
        {/* <img src={selectedVideo.imageURL} alt="Video Thumbnail" /> */}
        <h4>{selectedVideo.instructorBio}</h4>

        <iframe
          width="560"
          height="315"
          src={selectedVideo.videoURL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <button
          className="card-button"
          id="video-card-button"
          onClick={() => {
            navigate("/allvideos");
          }}
        >
          Return to All Classes
        </button>
      </div>
    </div>
  );
}
