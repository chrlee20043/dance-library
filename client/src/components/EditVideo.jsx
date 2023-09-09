import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import { editVideo } from "../helpers/fetching";

export default function EditVideo({ video }) {
  //   const { videos } = useContext(VideosContext);
  //   const navigate = useNavigate();

  // FIX THE STATE
  const [isOpen, setIsOpen] = useState(false);
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");

  console.log("hello world");

  function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleEdit(e) {
    e.preventDefault();

    let newVideo = {
      instructor_name,
      style,
      level,
      videoURL,
    };
    try {
      await editVideo(newVideo, video.video_id);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("can't edit this video, error");
    }
  }

  return (
    <>
      <div className="edit-video-form">
        <button onClick={handleClick} className="edit-button">
          Edit Class
        </button>
        {isOpen && (
          <form onSubmit={handleEdit}>
            <h4>Edit Your Class</h4>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instructor Id"
                  value={instructorId}
                  onChange={(event) => setInstructorId(event.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instructor Name"
                  value={instructorName}
                  onChange={(event) => setInstructorName(event.target.value)}
                />
              </div>
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
            <button type="submit">
              {isOpen ? "Save Changes" : "Edit Details"}
            </button>
            {/* <button type="button" onClick={onCancel}>
              Cancel
            </button> */}
          </form>
        )}
      </div>
    </>
  );
}
