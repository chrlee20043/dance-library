import React, { useState, createContext } from "react";

export const VideosContext = createContext();

export const VideosContextProvider = (props) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});

  const addVideos = (video) => {
    // console.log("existing videos:", videos);
    setVideos([...videos, video]);
    console.log("video context: ", video);
  };

  return (
    <VideosContext.Provider
      value={{ videos, setVideos, selectedVideo, setSelectedVideo, addVideos }}
    >
      {props.children}
    </VideosContext.Provider>
  );
};
