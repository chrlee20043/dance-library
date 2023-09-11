import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { editVideo, fetchSingleVideo } from "../helpers/fetching";

export default function EditVideo() {
  const { videoId } = useParams();

  // SETTING THE STATE
  const [isOpen, setIsOpen] = useState(false);
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");

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
        console.log("editing video result: ", updatedVideo);
        const editedVideo = await editVideo(
          videoId,
          updatedVideo.instructorId,
          updatedVideo.instructorName,
          updatedVideo.style,
          updatedVideo.level,
          updatedVideo.videoURL
        );

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
        <button className="card-button" onClick={handleClick}>
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
