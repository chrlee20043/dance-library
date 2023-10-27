import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editVideo, fetchSingleVideo } from "../../helpers/fetching";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditVideo({ videoId, onVideoEdit }) {
  // SETTING THE STATE
  const [isOpen, setIsOpen] = useState(false);
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const navigate = useNavigate();

  // FETCH SINGLE VIDEO DATA

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSingleVideo(videoId);
      console.log(response);

      // SET THE STATE to the current info, this will show up in the form

      setInstructorId(response.instructor_id);
      setInstructorName(response.instructor_name);
      setStyle(response.style);
      setLevel(response.level);
      setVideoURL(response.videoURL);
    };
    fetchData();
  }, []);

  // Toggle form

  function handleClick() {
    setIsOpen(!isOpen);
  }

  // Function to edit the video

  const handleEdit = (e) => {
    e.preventDefault();
    async function updatingVideos() {
      const updatedVideo = {
        instructorId,
        instructorName,
        style,
        level,
        videoURL,
      };
      try {
        // console.log("editing video result: ", updatedVideo);
        const editedVideo = await editVideo(
          videoId,
          updatedVideo.instructorId,
          updatedVideo.instructorName,
          updatedVideo.style,
          updatedVideo.level,
          updatedVideo.videoURL
        );

        setIsOpen(false);

        if (onVideoEdit) {
          onVideoEdit();
        }

        navigate("./", { replace: true });
        return editedVideo;
      } catch (error) {
        console.error("can't edit this video, error");
      }
    }
    updatingVideos();
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
            <h4>Edit Your Class</h4>
            <div className="form-row">
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
                  label="Level"
                  variant="outlined"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  label="Video URL"
                  variant="outlined"
                  value={videoURL}
                  onChange={(event) => setVideoURL(event.target.value)}
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
