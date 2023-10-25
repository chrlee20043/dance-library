import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Typography, Select, MenuItem } from "@mui/material";
import { fetchAllInstructors } from "../../helpers/fetching";
import AddNewInstructor from "./AddNewInstructor";
import InstructorListName from "./InstructorListName";
import { VideosContext } from "../../context/VideosContext";

export default function AllInstructors({ token, userId }) {
  const { videos, setVideos } = useContext(VideosContext);
  const [instructors, setInstructors] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  const [error, setError] = useState("");

  const renderInstructors = async () => {
    try {
      const instructorArray = await fetchAllInstructors();
      setInstructors(instructorArray);
      console.log(instructorArray);
    } catch (error) {
      setError("Failed to fetch instructors. Please try again later.");
    }
  };

  useEffect(() => {
    renderInstructors();
  }, []);

  const textFieldSX = {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const gridContainerSX = {
    alignItems: "flex-start",
  };

  const uniqueStyles = [...new Set(videos.map((video) => video.style))];

  const instructorsToDisplay = instructors.filter((instructor) => {
    const instructorName = instructor.name.toLowerCase();
    const style = instructor.style.toLowerCase();

    const typeMatch = selectedStyle !== ""; // Check if a style is selected

    const searchMatch =
      instructorName.includes(searchParam) || style.includes(searchParam);

    return (
      typeMatch &&
      (searchParam === "" || searchMatch) &&
      (selectedStyle === "" || style === selectedStyle)
    );
  });

  const onStyleChange = (e) => {
    const style = e.target.value;
    setSelectedStyle(style);
  };

  return (
    <Grid container spacing={3} sx={gridContainerSX}>
      <Grid item xs={12}>
        <Typography variant="h4">Instructors</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          sx={textFieldSX}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Select
          value={selectedStyle}
          onChange={onStyleChange}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={textFieldSX}
        >
          <MenuItem value="">Search by Style</MenuItem>
          {uniqueStyles.map((style) => (
            <MenuItem key={style} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      {token && (
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <AddNewInstructor token={token} userId={userId} />
        </Grid>
      )}

      <Grid item xs={12}>
        {error && <p>{error}</p>}
        {token ? (
          <Grid container spacing={3}>
            {instructorsToDisplay.map((instructor) => (
              <Grid item key={instructor.instructor_id} xs={12} md={4}>
                <InstructorListName instructor={instructor} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No instructors available</p>
        )}
      </Grid>
    </Grid>
  );
}
