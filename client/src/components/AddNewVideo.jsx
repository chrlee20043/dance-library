import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addVideoClass, fetchAllInstructors } from "../helpers/fetching";
import { VideosContext } from "../context/VideosContext";
import { fetchAllVideos } from "../helpers/fetching";
import AddNewInstructor from "./AddNewInstructor";

export default function AddNewVideo({ token, userId }) {
  const { setVideos, addVideos } = useContext(VideosContext);

  const [instructors, setInstructors] = useState([]);
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [submittedBy, setSubmittedBy] = useState(userId);
  const [error, setError] = useState("");
  const [showInstructorForm, setShowInstructorForm] = useState(false);

  const navigate = useNavigate();

  // Fetch the list of instructors when the component mounts
  useEffect(() => {
    const fetchInstructorList = async () => {
      const instructorList = await fetchAllInstructors();
      setInstructors(instructorList);
    };
    fetchInstructorList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const userId = { submittedBy };
    async function makeAVideo() {
      const result = await addVideoClass(
        instructorId,
        instructorName,
        style,
        level,
        videoURL,
        userId
      );
      console.log(result);
      const updatedVideos = await fetchAllVideos();
      setVideos(updatedVideos);
    }
    makeAVideo();

    setInstructorId("");
    setInstructorName("");
    setStyle("");
    setLevel("");
    setVideoURL("");
    setSubmittedBy("");
    // navigate(0);
    navigate("./", { replace: true });
  };

  const handleShowInstructorForm = () => {
    setShowInstructorForm(true); // Show the instructor form when the button is clicked
  };

  return (
    <div className="new-video-form">
      {token ? (
        <form onSubmit={handleSubmit}>
          <h4>Add New Video Class</h4>
          <div className="form-row">
            <div className="col">
              <select
                className="form-control"
                value={instructorName}
                onChange={(event) => {
                  const selectedName = event.target.value;
                  setInstructorName(selectedName);

                  const selectedInstructor = instructors.find(
                    (instructor) => instructor.name === selectedName
                  );

                  if (selectedInstructor) {
                    setInstructorId(selectedInstructor.instructor_id);
                  }
                }}
              >
                <option value="" disabled>
                  Select Instructor
                </option>
                {instructors.map((instructor) => (
                  <option
                    key={instructor.instructor_id}
                    value={instructor.name}
                  >
                    {instructor.name}
                  </option>
                ))}
              </select>
              <button className="new-btn" onClick={handleShowInstructorForm}>
                Add an instructor
              </button>
            </div>
            <div className="col">
              <select
                className="form-control"
                value={style}
                onChange={(event) => {
                  setStyle(event.target.value);
                }}
              >
                <option value="" disabled>
                  Select Style
                </option>
                {instructors.map((instructor) => (
                  <option
                    key={instructor.instructor_id}
                    value={instructor.style}
                  >
                    {instructor.style}
                  </option>
                ))}
              </select>
              <button className="new-btn">Add Style</button>
            </div>
            <div className="col">
              <label>Level: </label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="beginner"
                    checked={level === "beginner"}
                    onChange={() => setLevel("beginner")}
                  />
                  Beginner
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="intermediate"
                    checked={level === "intermediate"}
                    onChange={() => setLevel("intermediate")}
                  />
                  Intermediate
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="advanced"
                    checked={level === "advanced"}
                    onChange={() => setLevel("advanced")}
                  />
                  Advanced
                </label>
              </div>
            </div>
            <div className="col">
              <label>Video URL: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Video URL"
                value={videoURL}
                onChange={(event) => setVideoURL(event.target.value)}
              />
            </div>
            <button className="card-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <p>Please log in or register to add new classes</p>
      )}
      {showInstructorForm && (
        <div className="instructor-form">
          <AddNewInstructor token={token} />
        </div>
      )}
    </div>
  );
}
