// import React, { useState, useEffect } from "react";
// import { TextField, Button, Grid, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { addNewInstructor, fetchAllInstructors } from "../../helpers/fetching";

// export default function AddNewInstructor({ token, userId, renderInstructors }) {
//   const [instructors, setInstructors] = useState([]);
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [style, setStyle] = useState("");
//   const [imageURL, setImageURL] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     async function newInstructor() {
//       const result = await addNewInstructor(
//         name,
//         bio,
//         style,
//         imageURL,
//         userId,
//         token
//       );
//       console.log(result);

//       if (renderInstructors) {
//         renderInstructors();
//       }
//     }
//     newInstructor();

//     setName("");
//     setBio("");
//     setStyle("");
//     setImageURL("");
//     setError(null);

//     navigate("./", { replace: true });
//   };

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addNewInstructor, fetchAllInstructors } from "../../helpers/fetching";

export default function AddNewInstructor({ token, userId, renderInstructors }) {
  const [instructors, setInstructors] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [style, setStyle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const instructorList = await fetchAllInstructors();
      setInstructors(instructorList);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if an instructor with the same name already exists
    const instructorExists = instructors.some(
      (instructor) => instructor.name.toLowerCase() === name.toLowerCase()
    );

    if (instructorExists) {
      setError("An instructor with the same name already exists.");
    } else {
      // If no instructor with the same name exists, proceed to add the new instructor
      setError(null);

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

        if (renderInstructors) {
          renderInstructors();
        }
      }
      newInstructor();

      setName("");
      setBio("");
      setStyle("");
      setImageURL("");
      navigate("./", { replace: true });
    }
  };

  const gridSX = {
    border: "1px solid rgb(69, 2, 69)",
    padding: "8px",
    borderRadius: "8px",
    marginRight: "10px",
  };

  const textfieldSX = {
    padding: "3px",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid rgb(255, 123, 0)",
      borderColor: "rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const submitSX = {
    border: "1px solid rgb(255, 123, 0)",
    backgroundColor: "white",
    color: "rgb(255, 123, 0)",
    "&:hover": {
      border: "2px solid rgb(255, 123, 0)",
      backgroundColor: "white",
      fontWeight: "bold",
    },
    "&.MuiButton-containedPrimary": {
      backgroundColor: "lightorange",
    },
  };

  return (
    <Grid container spacing={3} sx={gridSX} className="new-instructor">
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
              required
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
              required
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
              required
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
              required
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={submitSX}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
