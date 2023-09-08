import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import addVideoClass, {
  fetchVideosWithInstructorName,
} from "../helpers/fetching";

export default function AddNewVideo({ setVideos }) {
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    async function createAVideo() {
      const videoData = {
        instructorId,
        instructorName,
        style,
        level,
        videoURL,
      };
      try {
        const result = await addVideoClass(videoData);
        console.log("Video Data: ", videoData);
        const updateVideos = await fetchVideosWithInstructorName();
        setVideos(updateVideos);
        // navigate(0);
        return result;
      } catch {
        setError("Can't add this video", error);
      }
    }
    createAVideo();

    setInstructorId("");
    setInstructorName("");
    setStyle("");
    setLevel("");
    setVideoURL("");
  };

  return (
    <div className="new-video-form">
      <form onSubmit={handleSubmit}>
        <h4>Add New Video Class</h4>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
