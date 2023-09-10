import React from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import fetchVideosWithInstructorName, {
  fetchSingleVideo,
  deleteVideo,
  editVideo,
} from "../helpers/fetching";
import EditVideo from "./EditVideo";

export default function VideoCard() {
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const { videoId } = useParams();
  const navigate = useNavigate();

  // FIX THIS LOGIC

  async function handleSave(videoId) {
    try {
      const response = await fetchSingleVideo(videoId);
      if (response) {
        setSelectedVideo(response);
      } else {
        console.error("cannot save");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // EDIT Video - PUT request
  const handleEdit = async () => {
    console.log("edit me");
  };

  // const handleUpdateVideo = async (updatedVideo) => {
  //   try {
  //     const result = await editVideo(updatedVideo);
  //     console.log(result);
  //     const updatedVideos = await fetchVideosWithInstructorName();
  //     setVideos(updatedVideos || []);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Return to all videos
  const handleReturnToVideos = () => {
    navigate("/allvideos");
  };

  return (
    // View single video class

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

      {/* Buttons to save, delete, edit/update, return to all videos */}
      <div className="edit-video-form">
        <EditVideo />
      </div>

      <div>
        <button onClick={handleSave}>Save me</button>
        <button onClick={() => deleteVideo(videoId)}>Delete me</button>
        <button onClick={handleReturnToVideos}>Return to All Classes</button>
      </div>
    </div>
  );
}
