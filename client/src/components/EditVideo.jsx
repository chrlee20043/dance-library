import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editVideo, fetchSingleVideo } from "../helpers/fetching";

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
      <div className="edit-video-form">
        <button className="card-toggle-button" onClick={handleClick}>
          {isOpen ? "Cancel" : "Edit Details"}
        </button>
        {isOpen && (
          <form onSubmit={handleEdit}>
            <h4>Edit Your Class</h4>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Style"
                  value={style}
                  onChange={(event) => setStyle(event.target.value)}
                />
              </div>
              <div className="col">
                <input
                  id="edit-level-input"
                  type="text"
                  className="form-control"
                  placeholder="Level"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                />
              </div>
              <div className="col">
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
              Save Changes
            </button>
          </form>
        )}
      </div>
    </>
  );
}
