import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { addVideoClass } from "../helpers/fetching";
import { VideosContext } from "../context/VideosContext";
import { myUserData } from "../helpers/fetching";

export default function AddNewVideo({ token, userId }) {
  const { setVideos, addVideos } = useContext(VideosContext);

  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // trying to get userId to autofill so user doesn't have to input it
  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     const response = await myUserData(userId);
  //     console.log("add new video id: ", response.userId);

  //     setSubmittedBy(response.userId);
  //   };
  //   fetchUserId();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const author = { submittedBy };
    async function makeAVideo() {
      const result = await addVideoClass(
        instructorId,
        instructorName,
        style,
        level,
        videoURL,
        submittedBy
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
    setSubmittedBy("");
    navigate(0);
  };

  return (
    <div className="new-video-form">
      {token ? (
        <form onSubmit={handleSubmit}>
          <h4>Add New Video Class</h4>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Your User ID"
                value={submittedBy}
                onChange={(event) => setSubmittedBy(event.target.value)}
              />
            </div>
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
      ) : (
        <p>Please log in or register to add new classes</p>
      )}
    </div>
  );
}
