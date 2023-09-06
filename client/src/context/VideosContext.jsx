import React, { useState, createContext } from "react";

export const VideosContext = createContext();

export const VideosContextProvider = (props) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);

  return (
    <VideosContext.Provider
      value={{ videos, setVideos, selectedVideo, setSelectedVideo }}
    >
      {props.children}
    </VideosContext.Provider>
  );
};
