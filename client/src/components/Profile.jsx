import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myUserData } from "../helpers/fetching";
// import VideoCard from "./VideoCard";
import { VideosContext } from "../context/VideosContext";

export default function Profile({ video }) {
  const { videos } = useContext(VideosContext);
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      // if (!authToken) {
      //   setError("No authentication token available");
      //   return;

      try {
        const myAPIData = await myUserData();
        console.log("Response from myData API:", myAPIData);

        // setUserPosts(myAPIData.data.posts || []);
        // setUserMessages(myAPIData.data.messages || []);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div>
      <ul>See your saved classes here</ul>
      <p>Account info(subscription & user info)</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );
}

// import React from "react";
// import VideoCard from "./VideoCard"; // Import the VideoCard component

// export default function Profile({ videos, onSavedVideo }) {
//   const savedVideo = videos.filter((video) => video.saved);

//   const savedVideoCard = savedVideo.map((video) => (
//     <VideoCard
//       key={video.id}
//       video={video}
//       onSavedVideo={onSavedVideo}
//       isSaved={true}
//     />
//   ));

//   const notSavedVideoCard = videos
//     .filter((video) => !video.saved)
//     .map((video) => (
//       <VideoCard
//         key={video.id}
//         video={video}
//         onSavedVideo={onSavedVideo}
//         isSaved={false}
//       />
//     ));

//   return (
//     <div>
//       <h2>Saved Videos</h2>
//       <ul className="saved-container">{savedVideoCard}</ul>
//       <h2>Not Saved Videos</h2>
//       <ul className="not-saved-container">{notSavedVideoCard}</ul>
//     </div>
//   );
// }
