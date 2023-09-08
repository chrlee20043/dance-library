import React from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import { fetchSingleVideo, deleteVideo, editVideo } from "../helpers/fetching";

export default function VideoCard({ video, videos }) {
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const { videoId } = useParams;
  const navigate = useNavigate();

  async function handleSave(videoId) {
    try {
      const result = await fetchSingleVideo(videoId);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(videoId) {
    try {
      const result = await deleteVideo(videoId);
      console.log("Deleted video", result);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit(videoId) {
    try {
      const result = await editVideo(videoId);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

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
      <div>
        <button onClick={handleSave}>Save me</button>
        <button onClick={handleDelete}>Delete me</button>
        <button onClick={handleEdit}>Edit me</button>

        <button onClick={handleReturnToVideos}>Return to All Classes</button>
      </div>
    </div>
  );
}
