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
    } catch (error) {
      setError("Failed to fetch instructors. Please try again later.");
    }
  };

  useEffect(() => {
    renderInstructors();
  }, []);

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
    "& .MuiSelect-outlined": {
      borderColor: "rgb(255, 123, 0)",
      "& .MuiFormLabel-root.Mui-focused": {
        color: "rgb(255, 123, 0)",
      },
    },
  };

  const uniqueStyles = [
    ...new Set(instructors.map((instructor) => instructor.style)),
  ];

  const instructorsToDisplay = instructors.filter((instructor) => {
    const instructorName = instructor.name.toLowerCase();
    const style = instructor.style.toLowerCase();

    const searchMatch =
      instructorName.includes(searchParam) || style.includes(searchParam);

    const styleMatch =
      selectedStyle === "" || style === selectedStyle.toLowerCase();

    return styleMatch && (searchParam === "" || searchMatch);
  });

  const onStyleChange = (e) => {
    const style = e.target.value;
    setSelectedStyle(style);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Instructors</Typography>
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
          <MenuItem value="">Select Style</MenuItem>{" "}
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
                <InstructorListName
                  onInstructorEdit={renderInstructors}
                  instructor={instructor}
                  userId={userId}
                  token={token}
                />
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
