import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import addVideoClass, {
  fetchVideosWithInstructorName,
} from "../helpers/fetching";

export default function AddNewVideo() {
  const [videos, setVideos] = useState([]);
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    async function newVideo() {
      const videoData = {
        instructorName,
        style,
        level,
        videoURL,
      };

      const result = await addVideoClass(videoData);
      console.log(videoData);
      const updatedVideos = await fetchVideosWithInstructorName();
      setVideos(updatedVideos);
      return result;
    }
    newVideo();

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
