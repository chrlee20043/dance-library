import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVideosWithInstructorName } from "../helpers/fetching";
import VideoListName from "./VideoListName";
import AddNewVideo from "./AddNewVideo";

export default function AllVideos() {
  const [videos, setVideos] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const renderVideos = async () => {
      try {
        const videoArray = await fetchVideosWithInstructorName();
        console.log("Videos: ", videoArray);
        setVideos(videoArray);
      } catch (error) {
        setError("Failed to fetch videos. Please try again later.");
      }
    };

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
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      <p className="new-video-container">
        <AddNewVideo />
      </p>
      {error && <p>{error}</p>}
      {videosToDisplay.map((video) => (
        <VideoListName key={video.video_id} video={video} />
      ))}
    </div>
  );
}
