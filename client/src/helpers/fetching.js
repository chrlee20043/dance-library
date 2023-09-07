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
    // console.log(result);
    return result;
  } catch (error) {
    console.error("You can't watch this, sorry");
  }
}

// fetch video by id

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

//   async function createPost() {
//     try {
//       const response = await fetch(`${baseURL}/videoclasses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           video: {
//
//           },
//         }),
//       });
//       // console.log(response)
//       const result = await response.json();
//       // console.log(result);
//       return result;
//     } catch (error) {
//       console.error(`You cannot create me`, error);
//     }
//   }

//   // DELETE a video from my list

//   async function deleteVideo(id) {
//     try {
//       const response = await fetch(`${baseURL}/videoclasses/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response);
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (error) {
//       console.error(`You cannot delete me`, error);
//     }
//   }

//   // Edit video from my list

//   async function editPost(
//
//   ) {
//     try {
//       const response = await fetch(`${baseURL}//videoclasses/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           post: {
//
//           },
//         }),
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   }

//export functions
export { fetchVideosWithInstructorName, fetchSingleVideo };
