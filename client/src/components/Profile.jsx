import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { myUserData } from "../helpers/fetching";
// import VideoCard from "./VideoCard";
import { VideosContext } from "../context/VideosContext";
// import { MyAddedVideos } from "/MyAddedVideos";

export default function Profile({ token, userId, currentUser }) {
  const { videos } = useContext(VideosContext);
  // const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(userId);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userInfo = await myUserData(userId);
        // console.log("profile user id: ", userId);
        console.log(userInfo);
        // console.log("data from API", userInfo);
        // setUser(userInfo);
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
      <h2>Welcome {currentUser}!</h2>
      <button onClick={handleClick}>Browse classes</button>
      {/* <MyAddedVideos token={token} /> */}

      {token ? (
        videos
          .filter((video) => video.submitted_by === userId)
          .map((video) => (
            <div key={video.video_id} className="my-videos">
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
                {isOpen ? "Close" : "My Added Classes"}
              </button>
            </div>
          ))
      ) : (
        <p>No videos here</p>
      )}
    </div>
  );
}
