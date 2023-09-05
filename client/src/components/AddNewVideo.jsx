import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddNewVideo() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await createVideoClass(
      instructorName,
      style,
      level,
      videoURL
    );
    console.log(response);
    if (response.success) {
      console.log("New Post: ", response);
      navigate("/myprofile");

      // const newPosts = [...post, response.data.post];
      // setPost(newPosts);
    } else {
      setError("Unauthorized token. Please register or log in");
    }
  }

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
            />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Style" />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Level" />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Video URL"
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
