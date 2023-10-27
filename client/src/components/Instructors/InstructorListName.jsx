import React from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteInstructor,
  fetchAllInstructors,
  fetchSingleInstructor,
} from "../../helpers/fetching";
import EditInstructor from "./EditInstructor";

export default function InstructorListName({
  token,
  userId,
  instructor,
  onInstructorEdit,
}) {
  const navigate = useNavigate();

  const handleDelete = async (instructorId) => {
    try {
      const result = await deleteInstructor(instructorId);
      console.log("deleted instructor: ", result);
      navigate("/instructors");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="instructor-card-container">
      <div id="all-instructors-card">
        <h3 className="instructor-title">{instructor.name}</h3>
        <img src={instructor.imageURL} alt={instructor.name} />
        <p className="style-title">{instructor.style}</p>
        <p>{instructor.bio}</p>
        <button
          className="card-button"
          onClick={() => {
            navigate(`/instructors/${instructor.instructor_id}`);
          }}
        >
          Browse classes
        </button>
        {userId === instructor.submitted_by && (
          <div>
            <button
              className="card-button"
              onClick={() => handleDelete(instructor.instructor_id)}
            >
              Remove Instructor
            </button>
            <EditInstructor
              userId={userId}
              instructor_id={instructor.instructor_id}
              onInstructorEdit={onInstructorEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
