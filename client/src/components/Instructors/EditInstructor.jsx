import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSingleInstructor, editInstructor } from "../../helpers/fetching";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditInstructor({
  userId,
  instructor_id,
  onInstructorEdit,
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

  // Toggle form

  function handleClick() {
    setIsOpen(!isOpen);
  }

  // Function to edit the video

  const handleEdit = (e) => {
    e.preventDefault();
    async function updatingInstructors() {
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

        if (onInstructorEdit) {
          onInstructorEdit();
        }

        navigate("./", { replace: true });

        return editedInstructor;
      } catch (error) {
        console.error("can't edit this video, error");
      }
    }
    updatingInstructors();
  };

  return (
    <>
      {/* EDIT FORM! */}
      <div className="edit-container">
        <Button variant="contained" color="primary" onClick={handleClick}>
          {isOpen ? "Cancel" : "Edit Details"}
        </Button>
        {isOpen && (
          <form className="edit-video-form" onSubmit={handleEdit}>
            <h4>Edit Instructor Info</h4>
            <div className="form-row">
              <div className="col">
                <TextField
                  label="Instructor Name"
                  variant="outlined"
                  value={instructorName}
                  onChange={(event) => setInstructorName(event.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  label="Bio"
                  variant="outlined"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  label="Style"
                  variant="outlined"
                  value={style}
                  onChange={(event) => setStyle(event.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  label="Image URL"
                  variant="outlined"
                  value={imageURL}
                  onChange={(event) => setImageURL(event.target.value)}
                />
              </div>
            </div>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
