import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewInstructor } from "../helpers/fetching";

export default function AddNewInstructor({ token }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [style, setStyle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await addNewInstructor(name, bio, style, imageURL, token);
      console.log(result);
      //   const updateReview = await fetchReviewsByMuseumId(museumId);
      //   setReviews(updateReview);
      //   console.log("New reviews", updateReview);

      setName("");
      setBio("");
      setStyle("");
      setImageURL("");
      setError(null);

      navigate("./", { replace: true });
    } catch (error) {
      setError("Failed to create the review. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="new-instructor">
      <h3 className="new-instructor-title">Add New Instructor</h3>

      <form onSubmit={submitHandler} className="add-instructor-form">
        <input
          className="add-instructor-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="add-instructor-input"
          placeholder="Biography"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          className="add-instructor-input"
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <input
          className="add-instructor-input"
          placeholder="Image"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <br />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="card-button">
          Submit
        </button>
      </form>
    </div>
  );
}
