import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addVideoClass, fetchAllInstructors } from "../helpers/fetching"; // Create a function to fetch instructors
import { VideosContext } from "../context/VideosContext";
import { fetchAllVideos } from "../helpers/fetching";

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

  const navigate = useNavigate();

  // Fetch the list of instructors when the component mounts
  useEffect(() => {
    const fetchInstructorList = async () => {
      const instructorList = await fetchAllInstructors(); // Implement fetchInstructors function
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

                  // Find the corresponding instructorId based on the selected name
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
              <button>Add an instructor</button>
            </div>

            <div className="col">
              <label>Style: </label>
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
              <label>Level: </label>

              <input
                type="text"
                className="form-control"
                placeholder="Level"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
              />
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
