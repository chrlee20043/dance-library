import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { fetchAllVideos } from "../helpers/fetching";
import VideoListName from "./VideoListName";
import AddNewVideo from "./AddNewVideo";
import { VideosContext } from "../context/VideosContext";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function AllVideos({ token, userId }) {
  const { videos, setVideos } = useContext(VideosContext);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState("");

  // const theme = createTheme();

  // const useStyles = {
  //   customInput: {
  //     "& fieldset": {
  //       border: "2px solid black",
  //       borderColor: "rgb(255, 123, 0)",
  //     },
  //   },
  // };

  // const classes = useStyles;

  const renderVideos = async () => {
    try {
      const videoArray = await fetchAllVideos();
      setVideos(videoArray);
    } catch (error) {
      setError("Failed to fetch videos. Please try again later.");
    }
  };

  useEffect(() => {
    renderVideos();
  }, []);

  const videosToDisplay = searchParam
    ? videos.filter(
        (video) =>
          video.instructor_name.toLowerCase().includes(searchParam) ||
          video.style.toLowerCase().includes(searchParam) ||
          video.level.toLowerCase().includes(searchParam)
      )
    : videos;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Classes</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          // placeholder="Search by instructor, style, or level"
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "rgb(255, 123, 0)",
              },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "rgb(255, 123, 0)",
            },
          }}
        />
      </Grid>
      {token && (
        <Grid item xs={12} md={4}>
          <AddNewVideo token={token} userId={userId} />
        </Grid>
      )}
      <Grid item xs={12}>
        {error && <p>{error}</p>}
        {token ? (
          <Grid container spacing={3}>
            {videosToDisplay.map((video) => (
              <Grid item key={video.video_id} xs={12} md={4}>
                <VideoListName video={video} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No classes available</p>
        )}
      </Grid>
    </Grid>
  );
}
