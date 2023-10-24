import React from "react";

export default function InstructorListName({ token, userId, instructor }) {
  return (
    <div id="instructor-card-container">
      <div id="all-instructors-card">
        <h3 className="instructor-title">{instructor.name}</h3>
        <img src={instructor.imageURL} alt={instructor.name} />
        <p>{instructor.bio}</p>
        <p>{instructor.style}</p>
      </div>
    </div>
  );
}
