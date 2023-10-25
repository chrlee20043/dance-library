import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addNewInstructor, fetchAllInstructors } from "../../helpers/fetching";

export default function AddNewInstructor({ token, userId }) {
  const [instructors, setInstructors] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [style, setStyle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchInstructors() {
  //     const updatedInstructors = await fetchAllInstructors();
  //     setInstructors(updatedInstructors);
  //   }
  //   fetchInstructors();
  // }, [instructors]);

  const submitHandler = async (e) => {
    e.preventDefault();

    async function newInstructor() {
      const result = await addNewInstructor(
        name,
        bio,
        style,
        imageURL,
        userId,
        token
      );
      console.log(result);

      const updatedInstructors = await fetchAllInstructors();
      setInstructors(updatedInstructors);
    }
    newInstructor();

    setName("");
    setBio("");
    setStyle("");
    setImageURL("");
    setError(null);

    navigate("./", { replace: true });
  };

  const textfieldSX = {
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

  return (
    <Grid container spacing={3} className="new-instructor">
      <Grid item xs={12}>
        <Typography variant="h4" className="new-instructor-title">
          Add New Instructor
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={submitHandler}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={textfieldSX}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Biography"
              variant="outlined"
              size="small"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              sx={textfieldSX}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Style"
              variant="outlined"
              size="small"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              sx={textfieldSX}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              size="small"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              sx={textfieldSX}
            />
          </Grid>
          <Grid item xs={12}>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
