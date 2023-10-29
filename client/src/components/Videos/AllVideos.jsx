import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Typography, Select, MenuItem } from "@mui/material";
import { fetchAllVideos } from "../../helpers/fetching";
import VideoListName from "./VideoListName";
import AddNewVideo from "./AddNewVideo";
import { VideosContext } from "../../context/VideosContext";

export default function AllVideos({ token, userId }) {
  const { videos, setVideos } = useContext(VideosContext);
  const [searchParam, setSearchParam] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [error, setError] = useState("");

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

  const uniqueStyles = [
    ...new Set(videos.map((video) => video.style.toUpperCase())),
  ];

  const videosToDisplay = videos.filter((video) => {
    const instructorName = video.instructor_name.toLowerCase();
    const style = video.style.toLowerCase();
    const level = video.level.toLowerCase();
    const searchMatch =
      instructorName.includes(searchParam) ||
      style.includes(searchParam) ||
      level.includes(searchParam);

    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(level);
    const styleMatch =
      selectedStyle === "" || style === selectedStyle.toLowerCase();

    return typeMatch && styleMatch && (searchParam === "" || searchMatch);
  });

  const onOptionChange = (e) => {
    const type = e.target.value;

    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };

  const onStyleChange = (e) => {
    const style = e.target.value;
    setSelectedStyle(style);
  };

  const textFieldSX = {
    ml: 2,
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const selectStyle = {
    width: "50%",
    mt: 2,
    ml: 2,
    mb: 2,
    textAlign: "left",
    pl: 2,
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Classes</Typography>
      </Grid>
      <Grid container item xs={12} md={8} direction="column">
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          sx={{ ...textFieldSX, width: "50%" }}
        />

        <Select
          value={selectedStyle}
          onChange={onStyleChange}
          displayEmpty
          fullWidth
          variant="outlined"
          size="small"
          sx={selectStyle}
        >
          <MenuItem value="">Select Style</MenuItem>
          {uniqueStyles.map((style) => (
            <MenuItem key={style} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>

        <div className="filter-buttons" style={{ marginTop: 2, width: "50%" }}>
          <label>
            <input
              className="class-level"
              type="checkbox"
              value="beginner"
              checked={selectedTypes.includes("beginner")}
              onChange={onOptionChange}
            />
            Beginner
          </label>
          <label>
            <input
              className="class-level"
              type="checkbox"
              value="intermediate"
              checked={selectedTypes.includes("intermediate")}
              onChange={onOptionChange}
            />
            Intermediate
          </label>
          <label>
            <input
              className="class-level"
              type="checkbox"
              value="advanced"
              checked={selectedTypes.includes("advanced")}
              onChange={onOptionChange}
            />
            Advanced
          </label>
        </div>
      </Grid>
      {token && (
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
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
