// /fetch requests

// base URL for API

const baseURL = "http://localhost:8080/api";

// fetch all videos

export default async function fetchAllVideos() {
  try {
    const response = await fetch(`${baseURL}/videoclasses`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Cannot get classes", error);
  }
}

// fetch video by id

async function fetchSingleVideo(id) {
  try {
    const response = await fetch(`${baseURL}/videoclasses/${id}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("cannot get single video", error);
  }
}

//   // Retrieve my videos

//   async function myData(token) {
//     try {
//       const response = await fetch(`${API_URL}/users/me`, {
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

//   async function createPost(title, description, price, willDeliver, token) {
//     try {
//       const response = await fetch(`${API_URL}/posts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           post: {
//             title,
//             description,
//             price,
//             willDeliver,
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

//   async function deletePost(id, token) {
//     try {
//       const response = await fetch(`${API_URL}/posts/${id}`, {
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
//     id,
//     title,
//     description,
//     price,
//     location,
//     willDeliver,
//     token
//   ) {
//     try {
//       const response = await fetch(`${API_URL}//posts/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           post: {
//             title,
//             description,
//             price,
//             location,
//             willDeliver,
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
export { fetchAllVideos, fetchSingleVideo };
