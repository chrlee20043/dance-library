import React from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import { fetchSingleVideo, deleteVideo, editVideo } from "../helpers/fetching";

export default function VideoCard({ video, videos }) {
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const { videoId } = useParams();
  const navigate = useNavigate();

  async function handleSave(videoId) {
    try {
      const response = await fetchSingleVideo(videoId);
      if (response) {
        setSelectedVideo(response);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // async function handleDelete(videoId) {
  //   try {
  //     const response = await deleteVideo(videoId);
  //     if (response) {
  //       setSelectedVideo(response);
  //     console.log("Deleted video", result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
      <iframe
        // width="560"
        // height="315"
        src={selectedVideo.videoURL}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      {/* <a
        id="watch-video-btn"
        href={selectedVideo.videoURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch Video
      </a> */}
      <div>
        <button onClick={handleSave}>Save me</button>
        <button onClick={() => deleteVideo(videoId)}>Delete me</button>
        <button onClick={handleEdit}>Edit me</button>

        <button onClick={handleReturnToVideos}>Return to All Classes</button>
      </div>
    </div>
  );
}
