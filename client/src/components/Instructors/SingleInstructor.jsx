import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleInstructor,
  fetchVideosbyInstructorId,
} from "../../helpers/fetching";
import { VideosContext } from "../../context/VideosContext";

export default function SingleInstructor() {
  const { videos, setVideos } = useContext(VideosContext);
  const [instructor, setInstructor] = useState({});
  const [error, setError] = useState(null);

  const { instructorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleInstructor = async () => {
      try {
        const response = await fetchSingleInstructor(instructorId);
        console.log("Single Instructor: ", response);
        if (response) {
          setInstructor(response);
        } else {
          setError("Cannot get this instructor");
        }
      } catch (error) {
        console.error(error);
      }
    };

    async function videosByInstructorId(instructorId) {
      try {
        const response = await fetchVideosbyInstructorId(instructorId);
        setVideos(response);
        console.log("videos", response);
      } catch (error) {
        console.error("Error fetching videos by instructor ID:", error);
      }
    }

    getSingleInstructor();
    videosByInstructorId(instructorId);
  }, [instructorId]);

  return (
    <>
      <div className="single-instructor-card">
        <h1>{instructor.name}</h1>
        <div>
          <img src={instructor.imageURL} alt={instructor.name} />
          <p>{instructor.bio}</p>
          <button
            className="card-button"
            onClick={() => navigate("/allvideos")}
          >
            Return to Instructors
          </button>
        </div>
      </div>
      <div className="instructor-classes">
        <h2>Classes</h2>
        {videos.length === 0 ? (
          <div className="empty-favorites-page">
            <p className="empty-favorites-title">No classes yet.</p>
            <button
              className="card-button"
              onClick={() => {
                navigate("/allvideos");
              }}
            >
              Add a class
            </button>
          </div>
        ) : (
          videos.map((video) => (
            <div key={video.video_id} className="class-card">
              <p className="class-title">
                {video.level} {video.style}
              </p>
              <iframe
                src={video.videoURL}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <button
                className="card-button"
                onClick={() => {
                  navigate(`/allvideos/${video.video_id}`);
                }}
              >
                Class Details
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
