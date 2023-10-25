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
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
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

// INSTRUCTORS QUERIES

// fetch all instructors

async function fetchAllInstructors() {
  try {
    const response = await fetch(`${baseURL}/instructors`);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Cannot get instructors", error);
  }
}

async function addNewInstructor(
  name,
  bio,
  style,
  imageURL,
  submitted_by,
  token
) {
  try {
    // console.log("am i getting this: ");
    const response = await fetch(`${baseURL}/instructors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        bio,
        style,
        imageURL,
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

async function deleteInstructor(instructorId, token) {
  try {
    const response = await fetch(`${baseURL}/instructors/${instructorId}`, {
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

async function editInstructor(
  instructor_id,
  name,
  bio,
  style,
  imageURL,
  token
) {
  try {
    const response = await fetch(`${baseURL}/instructors/${instructor_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        instructor_id,
        name,
        bio,
        style,
        imageURL,
      }),
    });
    const result = await response.json();
    console.log("Updated item", result);
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

// get videos by userId

async function myAddedVideos(userId) {
  try {
    const response = await fetch(
      `${baseURL}/videoclasses/video/user/${userId}`
    );

    // console.log("my user data response: ", response);
    const result = await response.json();
    // console.log("result from myUserData: ", result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//   // Submit a new video

async function addVideoClass(
  // token,
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
        // Authorization: `Bearer ${token}`,
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
  videoId,
  instructor_id,
  instructor_name,
  style,
  level,
  videoURL,
  token
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

// FAVORITES QUERIES

async function fetchAllFavorites() {
  try {
    const response = await fetch(`${baseURL}/favorites`);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Cannot get favorites", error);
  }
}

// fetch favorite video by id

async function fetchFavoriteById(favoriteId) {
  try {
    const response = await fetch(`${baseURL}/favorites/${favoriteId}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("cannot get single rfavorite", error);
  }
}

// fetch favorite video by video id

async function fetchFavoritesByVideoId(videoId) {
  try {
    const response = await fetch(`${baseURL}/favorites/museum/${videoId}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("cannot get favorite by museum name", error);
  }
}

// fetch favorites by user id

async function fetchFavoritesByUserId(userId) {
  try {
    const response = await fetch(`${baseURL}/favorites/user/${userId}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("cannot get favorites by user Id", error);
  }
}

// add a favorite

async function addNewFavorite(userId, videoId, token) {
  try {
    const response = await fetch(`${baseURL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        videoId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("You cannot add a favorite", error);
    throw error;
  }
}

// delete a favorite

async function deleteFavorite(favoriteId, token) {
  try {
    const response = await fetch(`${baseURL}/favorites/${favoriteId}`, {
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
    console.error(`You cannot delete this favorite museum`, error);
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
  myAddedVideos,
  fetchAllInstructors,
  addNewInstructor,
  editInstructor,
  deleteInstructor,
  addVideoClass,
  deleteVideo,
  editVideo,
  fetchAllFavorites,
  fetchFavoriteById,
  fetchFavoritesByUserId,
  fetchFavoritesByVideoId,
  addNewFavorite,
  deleteFavorite,
};
