import React from "react";
import { useState, useEffect } from "react";
import { fetchAllVideos } from "../api/fetching";
// import { useNavigate } from "react-router-dom";
import SingleVideo from "./SingleVideo";

export default function AllVideos() {
  const [videos, setVideos] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  const [error, setError] = useState("");
  // const navigate = useNavigate();

  async function renderVideos() {
    try {
      const videoArray = await fetchAllVideos();
      console.log("Videos: ", videoArray);
      setVideos(videoArray);
    } catch (error) {
      setError("No videos to see here");
    }
  }

  useEffect(() => {
    renderVideos();
  }, []);

  const videosToDisplay = searchParam
    ? videos.filter((videos) =>
        videos.style.toLowerCase().includes(searchParam)
      )
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
      {videosToDisplay.map((video) => (
        <SingleVideo key={video.video_id} video={video} />
      ))}
    </div>
  );
}
