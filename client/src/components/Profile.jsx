import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavorites } from "../Redux/favoriteSlice";
import { fetchAllVideos } from "../helpers/fetching";
import FavoriteClass from "./FavoriteClass";
import { VideosContext } from "../context/VideosContext";

export default function Profile({ token, userId, currentUser }) {
  const { videos } = useContext(VideosContext);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteClassesData, setFavoriteClassesData] = useState([]);

  const favoriteClasses = useSelector(selectFavorites);
  console.log(favoriteClasses);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFavoriteClassData() {
      const allClasses = await fetchAllVideos();
      const filteredClasses = allClasses.filter((video) =>
        favoriteClasses.some((favorite) => favorite.video_id === video.video_id)
      );
      setFavoriteClassesData(filteredClasses);
    }
    fetchFavoriteClassData();
  }, [favoriteClasses]);

  async function handleDetails() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <h2>Welcome {currentUser}!</h2>
      <br />
      <div>My Saved Classes</div>
      <div className="favorites-container">
        {favoriteClassesData.length === 0 ? (
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
                <h2 className="fav-class">{video.instructor_name}</h2>
                <p>{video.style}</p>
                <p>{video.level}</p>
                <iframe
                  src={video.videoURL}
                  title="YouTube video player"
                  frameborder="0"
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
    </div>
  );
}

{
  /* //  async function fetchUserData() {
//        try {
//         const userInfo = await myUserData(userId);
//         // console.log("profile user id: ", userId);
//         console.log(userInfo);
//         // console.log("data from API", userInfo);
//         // setUser(userInfo);
//       } catch (error) {
//         setError("An error occurred while fetching user data");
//         console.error(error);
//       }
//     }
//     fetchUserData();  */
}

{
  /* {token ? (
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
      )} */
}
