import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import { editVideo, fetchSingleVideo } from "../helpers/fetching";

export default function EditVideo() {
  const { videos } = useContext(VideosContext);
  const navigate = useNavigate();
  const { videoId } = useParams();

  // FIX THE STATE
  const [isOpen, setIsOpen] = useState(false);
  // const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  // const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSingleVideo(videoId);
      console.log(response);

      // setInstructorId(response.instructor_id);
      setInstructorName(response.instructor_name);
      setStyle(response.style);
      setLevel(response.level);
      // videoURL(response.videoURL);
    };
    fetchData();
  }, []);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleEdit(e) {
    e.preventDefault();

    const result = await editVideo(instructorName, style, level);
    try {
      console.log("editing video result: ", result);
      // setIsOpen(!isOpen);
      navigate(`/allvideos/${videoId}`);
      return result;
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
              {/* <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instructor Id"
                  value={instructorId}
                  onChange={(event) => setInstructorId(event.target.value)}
                /> */}
              {/* </div> */}
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
              {/* <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Video URL"
                  value={videoURL}
                  onChange={(event) => setVideoURL(event.target.value)}
                />
              </div> */}
            </div>
            <button type="submit">
              {isOpen ? "Save Changes" : "Edit Details"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
