import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavorites } from "../Redux/favoriteSlice";
import {
  fetchVideosWithInstructorName,
  myAddedVideos,
  deleteVideo,
} from "../helpers/fetching";
import FavoriteClass from "./FavoriteClass";
import EditVideo from "./EditVideo";
import { VideosContext } from "../context/VideosContext";

export default function Profile({ token, userId, currentUser }) {
  const { videos } = useContext(VideosContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteClassesData, setFavoriteClassesData] = useState([]);
  const [addedVideos, setAddedVideos] = useState([]);

  const favoriteClasses = useSelector(selectFavorites);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFavoriteClassData() {
      const allClasses = await fetchVideosWithInstructorName();
      const filteredClasses = allClasses.filter((video) =>
        favoriteClasses.some((favorite) => favorite.videoId === video.video_id)
      );
      setFavoriteClassesData(filteredClasses);
    }
    fetchFavoriteClassData();
    fetchUserData();
  }, [favoriteClasses]);

  async function fetchUserData() {
    try {
      const userInfo = await myAddedVideos(userId);
      console.log(userInfo);
      setAddedVideos(userInfo);
    } catch (error) {
      setError("An error occurred while fetching user data");
      console.error(error);
    }
  }

  function handleDetails() {
    setIsOpen(!isOpen);
  }

  const handleDelete = async (videoId) => {
    try {
      const result = await deleteVideo(videoId);
      console.log("deleted video: ", result);
      navigate("./", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(addedVideos);

  return (
    <>
      <div>
        <h2>Welcome {currentUser}!</h2>
        <br />
        <div>My Saved Classes</div>
        <div className="favorites-container">
          {token && favoriteClassesData.length === 0 ? (
            <div className="empty-favorites-page">
              <p className="empty-favorites-title">No favorite classes yet.</p>
              <button
                className="favorite-btn"
                onClick={() => {
                  navigate("/allvideos");
                }}
              >
                Browse Classes
              </button>
            </div>
          ) : (
            <ul>
              {favoriteClassesData.map((video) => (
                <div className="favorites-card" key={video.video_id}>
                  <div className="flex items-center justify-center">
                    {token && (
                      <FavoriteClass
                        userId={userId}
                        videoId={video.video_id}
                        token={token}
                      />
                    )}
                  </div>
                  <h2 className="fav-class">
                    {video.level} {video.style} with {video.instructor_name}
                  </h2>
                  {/* <img src={video.imageURL} alt="Class Image" /> */}
                  <iframe
                    src={video.videoURL}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <button
                    className="favorite-detail-btn"
                    onClick={() => {
                      navigate(`/allvideos/${video.video_id}`);
                    }}
                  >
                    See Details
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>

        <div>Classes I added</div>
        {token && addedVideos.length === 0 ? (
          <div>
            <p>You haven't created any classes yet!</p>
            <button
              onClick={() => {
                navigate("/allvideos");
              }}
            >
              Add new class
            </button>
          </div>
        ) : (
          <div>
            <button className="details-button" onClick={handleDetails}>
              {isOpen ? "See Less" : "See More"}
            </button>
            {addedVideos
              .filter((video) => video.submitted_by === userId)
              .map((video) => (
                <div key={video.video_id} className="my-videos">
                  {isOpen && (
                    <div className="expanded-content">
                      <p>
                        {video.level} {video.style} with {video.instructor_name}
                      </p>
                      <img src={video.imageURL} />
                      <p>{video.instructorBio}</p>
                      <button
                        className="card-button"
                        onClick={() => handleDelete(video.video_id)}
                      >
                        Delete me
                      </button>
                      <div id="editing-card">
                        <EditVideo
                          videoId={video.video_id}
                          onVideoEdit={() => fetchUserData()}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
