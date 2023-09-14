import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myUserData } from "../helpers/fetching";
import VideoCard from "./VideoCard";
import { VideosContext } from "../context/VideosContext";

export default function Profile({ token }) {
  const { videos } = useContext(VideosContext);
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (token) {
          // const userId = user.userId;
          const myAPIData = await myUserData(token);
          console.log("token in profile: ", token);
          console.log("data from API", myAPIData);
          setUser(myAPIData);
        }
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }
    fetchUserData();
  }, []);

  async function handleDetails() {
    setIsOpen(!isOpen);
  }

  async function handleClick() {
    navigate("/allvideos");
  }

  return (
    <div>
      <h1>Account info (subscription & user info)</h1>
      {token ? ( // Check if user data is available
        <div>
          {/* <h2>Welcome {user.username}</h2> */}
          <button onClick={handleClick}>Browse classes</button>

          {/* Other user information can be displayed here */}
        </div>
      ) : (
        <></>
      )}

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
