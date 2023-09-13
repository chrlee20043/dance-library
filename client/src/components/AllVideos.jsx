import React from "react";
import { useState, useEffect, useContext } from "react";
// import {  useNavigate } from "react-router-dom";
import { fetchAllVideos } from "../helpers/fetching";
import VideoListName from "./VideoListName";
import AddNewVideo from "./AddNewVideo";
import { VideosContext } from "../context/VideosContext";

export default function AllVideos({ token }) {
  const { videos, setVideos } = useContext(VideosContext);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState("");

  // const navigate = useNavigate();

  const renderVideos = async () => {
    try {
      const videoArray = await fetchAllVideos();
      console.log("Video Array: ", videoArray);
      setVideos(videoArray);
      return videoArray;
    } catch (error) {
      setError("Failed to fetch videos. Please try again later.");
    }
  };
  useEffect(() => {
    renderVideos();
  }, []);

  const videosToDisplay = searchParam
    ? videos.filter(
        (video) =>
          video.instructor_name.toLowerCase().includes(searchParam) ||
          video.style.toLowerCase().includes(searchParam) ||
          video.level.toLowerCase().includes(searchParam)
      )
    : videos;

  return (
    <div>
      <div id="search-bar">
        <label className="search-name">
          Search:{" "}
          <input
            type="text"
            placeholder="search by instructor, style or level"
            id="search-input"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>

      {error && <p>{error}</p>}
      <h1>Classes</h1>
      <div className="new-video-container">
        <AddNewVideo token={token} />
      </div>
      <div className="all-videos-container">
        {videosToDisplay.map((video) => (
          <VideoListName key={video.video_id} video={video} />
        ))}
      </div>
    </div>
  );
}
