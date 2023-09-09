// /fetch requests

// base URL for API

const baseURL = "http://localhost:8080/api";

// fetch all videos

// export default async function fetchAllVideos() {
//   try {
//     const response = await fetch(`${baseURL}/videoClasses`);
//     const result = await response.json();
//     // console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Cannot get classes", error);
//   }
// }

export default async function fetchVideosWithInstructorName() {
  try {
    const response = await fetch(`${baseURL}/videoclasses`);
    const result = await response.json();
    console.log("Fetched videos", result);
    return result;
  } catch (error) {
    console.error("You can't watch this, sorry");
  }
}

// fetch single video by id

async function fetchSingleVideo(videoId) {
  try {
    const response = await fetch(`${baseURL}/videoclasses/${videoId}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("cannot get single video", error);
  }
}

// Register user

async function registerNewUser(username, password, name) {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
          name: `${name}`,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Please enter valid credentials", error);
  }
}

// Login user
async function loginToAccount(username, password) {
  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

//   // Retrieve my videos

//   async function myProfile() {
//     try {
//       const response = await fetch(`${baseURL}/users/myprofile`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   // Submit a new video

async function addVideoClass({
  instructor_id,
  instructor_name,
  style,
  level,
  videoURL,
}) {
  try {
    const response = await fetch(`${baseURL}/videoclasses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instructor_id,
        instructor_name,
        style,
        level,
        videoURL,
      }),
    });
    // console.log(response)
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(`You cannot create me`, error);
  }
}

//   // DELETE a video from my list

async function deleteVideo(videoId) {
  try {
    const response = await fetch(`${baseURL}/videoclasses/${videoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(`You cannot delete me`, error);
  }
}

//   // Edit video from my list

async function editVideo(video_id, instructor_name, style, level, videoURL) {
  try {
    const response = await fetch(`${baseURL}//videoclasses/${video_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video: { instructor_name, style, level, videoURL },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//export functions
export {
  fetchVideosWithInstructorName,
  fetchSingleVideo,
  registerNewUser,
  loginToAccount,
  addVideoClass,
  deleteVideo,
  editVideo,
};
