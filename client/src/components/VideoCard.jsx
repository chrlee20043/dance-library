import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import { fetchSingleVideo, deleteVideo } from "../helpers/fetching";
// import EditVideo from "./EditVideo";

export default function VideoCard() {
  const { video, setVideo, selectedVideo, setSelectedVideo } =
    useContext(VideosContext);
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  // const [instructorId, setInstructorId] = useState("");
  // const [instructorName, setInstructorName] = useState("");
  // const [style, setStyle] = useState("");
  // const [level, setLevel] = useState("");
  // const [videoURL, setVideoURL] = useState("");

  // FIX THIS LOGIC

  // EDIT Video - PUT request
  // useEffect(() => {
  //   setInstructorId(video.instructor_id);
  //   setInstructorName(video.instructor_name);
  //   setStyle(video.style);
  //   setLevel(video.level);
  //   setVideoURL(video.videoURL);
  // }, []);

  // function handleClick() {
  //   setIsOpen(!isOpen);
  // }

  async function handleSave(videoId) {
    try {
      const response = await fetchSingleVideo(videoId);
      if (response) {
        setSelectedVideo(response);
      } else {
        console.error("cannot save");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (videoId) => {
    try {
      const result = await deleteVideo(videoId);
      console.log("deleted video: ", result);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   console.log("edit me");

  //   async function editVideo() {
  //     const updatedVideo = {
  //       instructorId,
  //       instructorName,
  //       style,
  //       level,
  //       videoURL,
  //     };
  //     const newVideo = await editVideo(videoId, updatedVideo);
  //     return newVideo;
  //   }
  //   editVideo();
  // };

  // Return to all videos
  const handleReturnToVideos = () => {
    navigate("/allvideos");
  };

  return (
    // View single video class

    <div id="single-video-container">
      <h3>{selectedVideo.instructor_name}</h3>
      <img src={selectedVideo.imageURL}></img>
      <h4>{selectedVideo.instructorBio}</h4>
      <p>Style: {selectedVideo.style}</p>
      <p>Level: {selectedVideo.level}</p>
      <iframe
        // width="560"
        // height="315"
        src={selectedVideo.videoURL}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      {/* Buttons to save, delete, edit/update, return to all videos */}

      <div>
        <button onClick={handleSave}>Save me</button>
        <button onClick={() => navigate(`/allvideos/${videoId}/update`)}>
          Edit me
        </button>
        <button onClick={() => handleDelete(videoId)}>Delete me</button>
        <button onClick={handleReturnToVideos}>Return to All Classes</button>
      </div>

      {/* EDIT VIDEO FORM*/}

      {/* <div className="edit-video-form">
        <button onClick={handleClick} className="edit-button">
          Edit Class
        </button>
        {isOpen && (
          <form onSubmit={handleEdit}>
            <h4>Edit Your Class</h4>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instructor Id"
                  value={instructorId}
                  onChange={(event) => setInstructorId(event.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instructor Name"
                  value={instructorName}
                  onChange={(event) => setInstructorName(event.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Style"
                  value={style}
                  onChange={(event) => setStyle(event.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Level"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Video URL"
                  value={videoURL}
                  onChange={(event) => setVideoURL(event.target.value)}
                />
              </div>
            </div>
            <button type="submit">
              {isOpen ? "Save Changes" : "Edit Details"}
            </button>
          </form>
        )}
        </div>*/}
    </div>
  );
}
