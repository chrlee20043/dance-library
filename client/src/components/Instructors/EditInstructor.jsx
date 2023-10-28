import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSingleInstructor, editInstructor } from "../../helpers/fetching";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditInstructor({
  userId,
  instructor_id,
  onInstructorChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [bio, setBio] = useState("");
  const [style, setStyle] = useState("");
  const [imageURL, setImageURL] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructor = async () => {
      const response = await fetchSingleInstructor(instructor_id);
      console.log(response);

      // SET THE STATE to the current info, this will show up in the form
      setInstructorId(response.instructor_id);
      setInstructorName(response.name);
      setBio(response.bio);
      setStyle(response.style);
      setImageURL(response.imageURL);
    };
    fetchInstructor();
  }, []);

  // Function to edit the video

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedInstructor = {
      instructorId,
      instructorName,
      bio,
      style,
      imageURL,
      userId,
    };
    try {
      console.log("editing instructor result: ", updatedInstructor);
      const editedInstructor = await editInstructor(
        updatedInstructor.instructorId,
        updatedInstructor.instructorName,
        updatedInstructor.bio,
        updatedInstructor.style,
        updatedInstructor.imageURL,
        userId
      );

      setIsOpen(false);

      if (onInstructorChange) {
        onInstructorChange();
      }

      navigate("./", { replace: true });

      return editedInstructor;
    } catch (error) {
      console.error("can't edit this video, error");
    }
  };

  const buttonSX = {
    backgroundColor: "rgb(69, 2, 69)",
    "&:hover": {
      backgroundColor: "rgb(219, 206, 219)",
    },
  };

  const textfieldSX = {
    margin: 1,
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid rgb(255, 123, 0)",
      borderColor: "rgb(249, 236, 218)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(69, 2, 69)",
    },
  };

  return (
    <>
      {/* Edit Instructor button that opens the form */}
      <button className="card-button" onClick={() => setIsOpen(true)}>
        Edit Instructor
      </button>

      {isOpen && (
        <div className="edit-container">
          <form className="edit-video-form" onSubmit={handleEdit}>
            <h4>Edit Instructor Info</h4>
            <div className="form-row">
              <div className="col">
                <TextField
                  label="Instructor Name"
                  variant="outlined"
                  value={instructorName}
                  sx={textfieldSX}
                  onChange={(event) => setInstructorName(event.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  label="Bio"
                  variant="outlined"
                  value={bio}
                  sx={textfieldSX}
                  onChange={(event) => setBio(event.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  label="Style"
                  variant="outlined"
                  value={style}
                  sx={textfieldSX}
                  onChange={(event) => setStyle(event.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  label="Image URL"
                  variant="outlined"
                  value={imageURL}
                  sx={textfieldSX}
                  onChange={(event) => setImageURL(event.target.value)}
                />
              </div>
            </div>
            <Button
              variant="contained"
              className="card-button"
              type="submit"
              sx={buttonSX}
            >
              Save Changes
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
