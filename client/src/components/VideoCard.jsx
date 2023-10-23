import React from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import { fetchSingleVideo, deleteVideo } from "../helpers/fetching";
import EditVideo from "./EditVideo";
import FavoriteClass from "./FavoriteClass";

export default function VideoCard({ userId, token }) {
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const { videoId } = useParams();
  const navigate = useNavigate();

  return (
    // View single video class
    <div id="single-video-container">
      <FavoriteClass userId={userId} videoId={videoId} token={token} />
      <div id="single-video-card">
        <h3>{selectedVideo.instructor_name}</h3>
        <img src={selectedVideo.imageURL}></img>
        <h4>{selectedVideo.instructorBio}</h4>
        <p>Style: {selectedVideo.style}</p>
        <p>Level: {selectedVideo.level}</p>
        <iframe
          width="560"
          height="315"
          src={selectedVideo.videoURL}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {/* <div className="editing-video-form">
        <EditVideo />
      </div> */}
        {/* Buttons to  delete, edit/update, return to all videos */}
        <div className="edit-button-container">
          <button
            className="card-button"
            onClick={() => {
              navigate("/allvideos");
            }}
          >
            Return to All Classes
          </button>
        </div>
      </div>

      {/* EditVideo form */}
    </div>
  );
}
