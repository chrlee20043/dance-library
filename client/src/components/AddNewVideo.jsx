import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { addVideoClass, fetchAllVideos } from "../helpers/fetching";
import { VideosContext } from "../context/VideosContext";

export default function AddNewVideo({ token }) {
  const { setVideos, addVideos } = useContext(VideosContext);

  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function makeAVideo() {
      const result = await addVideoClass(
        token,
        instructorId,
        instructorName,
        style,
        level,
        videoURL
      );

      console.log("Me trying to add a new video: ", result);
      return result;
    }
    makeAVideo();

    setInstructorId("");
    setInstructorName("");
    setStyle("");
    setLevel("");
    setVideoURL("");
    navigate(0);
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
              id="instructor-name"
              type="text"
              className="form-control"
              placeholder="Instructor Name"
              value={instructorName}
              onChange={(event) => setInstructorName(event.target.value)}
            />
          </div>
          <div className="col">
            <input
              id="style"
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
        <button className="card-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
