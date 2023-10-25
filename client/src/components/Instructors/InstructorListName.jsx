import React from "react";
import { useNavigate } from "react-router-dom";

export default function InstructorListName({ token, userId, instructor }) {
  const navigate = useNavigate();

  return (
    <div id="instructor-card-container">
      <div id="all-instructors-card">
        <h3 className="instructor-title">{instructor.name}</h3>
        <img src={instructor.imageURL} alt={instructor.name} />
        <p>{instructor.style}</p>
        <p>{instructor.bio}</p>
        <button
          onClick={() => {
            navigate(`/instructors/${instructor_id}`);
          }}
        >
          Browse classes
        </button>
      </div>
    </div>
  );
}
