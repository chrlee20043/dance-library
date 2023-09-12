import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myUserData } from "../helpers/fetching";
import VideoCard from "./VideoCard";
import { VideosContext } from "../context/VideosContext";

export default function Profile(token) {
  const { videos } = useContext(VideosContext);
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const myAPIData = await myUserData(token);
        console.log("Response from myData API:", myAPIData);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }
    fetchUserData();
  }, [token]);

  async function handleDetails() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <h2>My Saved Classes</h2>
      {videos
        .filter((video) => video.video_id)
        .map((video) => {
          <div key={video.video_id} className="my-saved-video">
            {isOpen && (
              <div className="expanded-content">
                <p>{video.instructor_name}</p>
                <p>{video.imageURL}</p>
                <p>{video.instructorBio}</p>
                <p>{video.style}</p>
                <p>{video.level}</p>
              </div>
            )}

            <button className="details-button" onClick={handleDetails}>
              {isOpen ? "See Less" : "See Details"}
            </button>
          </div>;
        })}
    </div>
  );
}

{
  /* <p>Account info(subscription & user info)</p>
      <p>{user.name}</p>
      <p>{user.username}</p>*/
}
