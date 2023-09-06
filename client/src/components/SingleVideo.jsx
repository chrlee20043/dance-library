import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { fetchSingleVideo } from "../helpers/fetching";
import { VideosContext } from "../context/VideosContext";

export default function RenderSingleVideo({ video }) {
  const { videoId } = useParams();
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const navigate = useNavigate();

  useEffect(() => {
    const setSingleVideo = async () => {
      try {
        const response = await fetchSingleVideo(videoId);
        const result = await response.json();
        console.log("Single Video: ", result);
        setSelectedVideo(result);
      } catch (error) {
        console.error(error);
      }
    };

    setSingleVideo();
  }, [videoId, setSelectedVideo]);

  const handleSeeDetails = (videoId) => {
    navigate(`/allvideos/${videoId}`);
  };

  // if (!singleVideo) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div>
        <p>Style: {video.style}</p>
        <p>Level: {video.level}</p>
        <p>Video: {video.videoURL}</p>
        <button onClick={() => handleSeeDetails(video.video_id)}>
          See details
        </button>
      </div>
    </div>
  );
}

// <button onClick={() => handleAllVideos()}>Back to all classes</button>

// const handleAllVideos = () => {
//   navigate("/AllVideos");
// };
