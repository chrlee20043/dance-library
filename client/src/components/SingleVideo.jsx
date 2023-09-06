import React from "react";

export default function SingleVideo({ video }) {
  return (
    <div>
      <div id="container" key={video.video_id}>
        <div id="single-video-card">
          <h2></h2>
          <h4>Instructor: {video.instructor_id}</h4>
          <p>Style: {video.style} </p>
          <p>Level: {video.level} </p>
          <p>Class URL: {video.videoURL} </p>
        </div>
      </div>
    </div>
  );
}
