import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { fetchSingleVideo } from "../api/fetching";
import { VideosContext } from "../context/VideosContext";

export default function RenderSingleVideo() {
  const { id } = useParams();
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const navigate = useNavigate();

  async function setSingleVideo() {
    try {
      const videoData = await fetchSingleVideo(id);
      console.log("Single Video: ", videoData);
      setSelectedVideo(videoData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setSingleVideo();
  }, [id]);

  const handleDetails = (video_id) => {
    navigate(`/AllVideos/${video_id}`);
  };

  // if (!singleVideo) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div>
        <p>Style: {selectedVideo.style}</p>
        <p>Level: {selectedVideo.level}</p>
        <p>Video: {selectedVideo.videoURL}</p>
        <button onClick={() => handleDetails(selectedVideo.video_id)}>
          See Details
        </button>
      </div>
    </div>
  );
}

// <button onClick={() => handleAllVideos()}>Back to all classes</button>

// const handleAllVideos = () => {
//   navigate("/AllVideos");
// };
