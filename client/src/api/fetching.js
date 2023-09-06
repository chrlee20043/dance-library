// /fetch requests

// base URL for API

const baseURL = "http://localhost:8080/api";

// GET

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

//   // DELETE

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

//   // Edit posts

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

//   const postMessage = async (token, id) => {
//     try {
//       const response = await fetch(`${API_URL}/posts/${id}/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           message: {
//             content: "Do you still have this?  Would you take $10 less?",
//           },
//         }),
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   //export functions
export { fetchAllVideos };
