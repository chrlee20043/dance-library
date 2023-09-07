import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { fetchSingleVideo } from "../helpers/fetching";
import { VideosContext } from "../context/VideosContext";
import VideoCard from "./VideoCard";

export default function RenderSingleVideo({ video }) {
  const { videoId } = useParams();
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleVideo = async () => {
      try {
        // console.log(videoId);
        const response = await fetchSingleVideo(videoId);
        console.log("Single Video: ", response);
        if (response) {
          setSelectedVideo(response);
        } else {
          setError("Cannot get this video");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSingleVideo();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {selectedVideo && <VideoCard selectedVideo={selectedVideo} />}
    </div>
  );
}
