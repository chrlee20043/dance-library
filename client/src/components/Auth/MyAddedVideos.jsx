// import React from "react";

// export default function MyAddedVideos({ token }) {
//   async function getMyVideos() {
//     const submittedVideos = await fetchVideosBySubmittedId();
//   }

//   return (
//     <>
//       {token ? (
//         videos
//           .filter((video) => video.submitted_by === userId)
//           .map((video) => (
//             <div key={video.video_id} className="my-videos">
//               {isOpen && (
//                 <div className="expanded-content">
//                   <p>{video.instructor_name}</p>
//                   <p>{video.imageURL}</p>
//                   <p>{video.instructorBio}</p>
//                   <p>{video.style}</p>
//                   <p>{video.level}</p>
//                 </div>
//               )}

//               <button className="details-button" onClick={handleDetails}>
//                 {isOpen ? "Close" : "My Added Classes"}
//               </button>
//             </div>
//           ))
//       ) : (
//         <p>No videos to see here</p>
//       )}
//     </>
//   );
}
