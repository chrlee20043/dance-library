import React from "react";
import { useState, useEffect } from "react";
import { fetchVideosWithInstructorName } from "../helpers/fetching";
import VideoListName from "./VideoListName";

export default function AllVideos() {
  const [videos, setVideos] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState("");

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
    ? videos.filter((video) => video.style.toLowerCase().includes(searchParam))
    : videos;

  return (
    <div>
      <div id="search-bar">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search by style"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      {error && <p>{error}</p>}
      {videosToDisplay.map((video) => (
        <VideoListName key={video.video_id} video={video} />
      ))}
    </div>
  );
}
