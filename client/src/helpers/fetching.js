// /fetch requests

// base URL for API

const baseURL = "http://localhost:8080/api";

// USERS QUERIES

// Register user

async function createUser(username, password, name) {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        name,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Please enter valid credentials", error);
  }
}

// Login user
async function loginToAccount(username, password) {
  try {
    // console.log("fetching log in");
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    });
    // console.log("this is my fetched response: ", response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Logout user

async function logoutUser(username, password) {
  try {
    const response = await fetch(`${baseURL}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    });
    console.log("logging out", response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Retrieve my videos - video objects made by user

async function myUserData(token, userId) {
  try {
    console.log("FETCHING TOKEN", token);
    const response = await fetch(`${baseURL}/users/myprofile/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("my user data response: ", response);
    const result = await response.json();
    console.log("result from myUserData: ", result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

// VIDEOCLASSES QUERIES

// fetch all videos

async function fetchAllVideos() {
  try {
    const response = await fetch(`${baseURL}/videoclasses`);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Cannot get classes", error);
  }
}

export default async function fetchVideosWithInstructorName(
  videoId,
  instructorName
) {
  try {
    const response = await fetch(
      `${baseURL}/videoclasses/${videoId}/${instructorName}`
    );
    const result = await response.json();
    // console.log("Fetched videos", result);
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

//   // Submit a new video

async function addVideoClass(
  token,
  instructor_id,
  instructor_name,
  style,
  level,
  videoURL,
  submitted_by
) {
  try {
    // console.log("am i getting this: ");
    const response = await fetch(`${baseURL}/videoclasses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        instructor_id,
        instructor_name,
        style,
        level,
        videoURL,
        submitted_by,
      }),
    });
    // console.log(response)
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error(`You cannot create me`, error);
  }
}

//   // DELETE a video from my list

async function deleteVideo(videoId, token) {
  try {
    const response = await fetch(`${baseURL}/videoclasses/${videoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

async function editVideo(
  token,
  videoId,
  instructor_id,
  instructor_name,
  style,
  level,
  videoURL
) {
  try {
    const response = await fetch(`${baseURL}/videoclasses/${videoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        instructor_id,
        instructor_name,
        style,
        level,
        videoURL,
      }),
    });
    const result = await response.json();
    console.log("Updated item", result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//export functions
export {
  fetchAllVideos,
  fetchVideosWithInstructorName,
  fetchSingleVideo,
  createUser,
  loginToAccount,
  logoutUser,
  myUserData,
  addVideoClass,
  deleteVideo,
  editVideo,
};
