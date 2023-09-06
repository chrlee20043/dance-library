import React from "react";
import { useState, useEffect } from "react";
import { fetchAllVideos } from "../api/fetching";
import SingleVideo from "./SingleVideo";

export default function AllVideos() {
  const [videos, setVideos] = useState([]);
  // const [searchParam, setSearchParam] = useState("");

  const [error, setError] = useState("");

  async function renderVideos() {
    try {
      const videoArray = await fetchAllVideos();
      console.log("Videos: ", videoArray);
      setVideos(videoArray);
    } catch (error) {
      setError("No posts to see here");
    }
  }

  useEffect(() => {
    renderVideos();
  }, []);

  // const videosToDisplay = searchParam
  //   ? videos.filter((videos) =>
  //       videos.style.toLowerCase().includes(searchParam)
  //     )
  //   : videos;

  return (
    <div>
      {videos.map((video) => (
        <div>
          <p>{video.instructor_id}</p>
          <p>{video.style}</p>
          <p>{video.level}</p>
          <p>{video.videoURL}</p>
        </div>
      ))}
    </div>
  );
}
