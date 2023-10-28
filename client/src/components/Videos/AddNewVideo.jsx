import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addVideoClass, fetchAllInstructors } from "../../helpers/fetching";
import { VideosContext } from "../../context/VideosContext";
import { fetchAllVideos } from "../../helpers/fetching";

export default function AddNewVideo({ token, userId }) {
  const { setVideos, addVideos } = useContext(VideosContext);

  const [instructors, setInstructors] = useState([]);
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [style, setStyle] = useState("");
  const [level, setLevel] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [isInstructorLabelFocused, setIsInstructorLabelFocused] =
    useState(false);
  const [isStyleLabelFocused, setIsStyleLabelFocused] = useState(false);
  const [isLevelLabelFocused, setIsLevelLabelFocused] = useState(false); // State for level label focus

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorList = async () => {
      const instructorList = await fetchAllInstructors();
      setInstructors(instructorList);
    };
    fetchInstructorList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    async function makeAVideo() {
      const result = await addVideoClass(
        instructorId,
        instructorName,
        style,
        level,
        videoURL,
        userId
      );
      console.log(result);
      const updatedVideos = await fetchAllVideos();
      setVideos(updatedVideos);
    }
    makeAVideo();

    setInstructorName("");
    setStyle("");
    setLevel("");
    setVideoURL("");
    navigate("./", { replace: true });
  };

  const gridSX = {
    border: "1px solid rgb(69, 2, 69)",
    padding: "8px",
    borderRadius: "8px",
    marginRight: "10px",
  };

  const textFieldSX = {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid rgb(255, 123, 0)",
      borderColor: "rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const selectSX = {
    mb: 1,
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "2px solid rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const buttonSX = {
    color: "rgb(255, 123, 0)",
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

  const uniqueStyles = [
    ...new Set(instructors.map((instructor) => instructor.style.toUpperCase())),
  ];

  return (
    <Grid container spacing={3} sx={gridSX}>
      {token ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h5">Add New Class</Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset" fullWidth sx={selectSX}>
                    <InputLabel
                      htmlFor="instructor-name"
                      focused={isInstructorLabelFocused}
                    >
                      Instructor
                    </InputLabel>
                    <Select
                      value={instructorName}
                      required
                      onChange={(event) => {
                        const selectedName = event.target.value;
                        setInstructorName(selectedName);

                        const selectedInstructor = instructors.find(
                          (instructor) => instructor.name === selectedName
                        );

                        if (selectedInstructor) {
                          setInstructorId(selectedInstructor.instructor_id);
                        }
                      }}
                      onFocus={() => setIsInstructorLabelFocused(true)}
                      onBlur={() => setIsInstructorLabelFocused(false)}
                      sx={selectSX}
                    >
                      <MenuItem value="" disabled>
                        Select Instructor
                      </MenuItem>
                      {instructors.map((instructor) => (
                        <MenuItem
                          key={instructor.instructor_id}
                          value={instructor.name}
                        >
                          {instructor.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    className="new-btn"
                    onClick={() => {
                      navigate("/instructors");
                    }}
                    sx={buttonSX}
                  >
                    Add an instructor
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset" fullWidth sx={selectSX}>
                    <InputLabel htmlFor="style">Style</InputLabel>
                    <Select
                      value={style}
                      required
                      onChange={(event) => {
                        setStyle(event.target.value);
                      }}
                      onFocus={() => setIsStyleLabelFocused(true)}
                      onBlur={() => setIsStyleLabelFocused(false)}
                      sx={selectSX}
                    >
                      <MenuItem value="" disabled>
                        Select Style
                      </MenuItem>
                      {uniqueStyles.map((styleName) => (
                        <MenuItem key={styleName} value={styleName}>
                          {styleName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Other Style"
                    variant="outlined"
                    required
                    value={style}
                    onChange={(event) => setStyle(event.target.value)}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl component="fieldset" fullWidth sx={selectSX}>
                    <InputLabel htmlFor="level" focused={isLevelLabelFocused}>
                      Level
                    </InputLabel>
                    <Select
                      value={level}
                      onChange={(event) => {
                        setLevel(event.target.value);
                      }}
                      onFocus={() => setIsLevelLabelFocused(true)}
                      onBlur={() => setIsLevelLabelFocused(false)}
                      sx={selectSX}
                    >
                      <MenuItem value="" disabled>
                        Select Level
                      </MenuItem>
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      value={videoURL}
                      required
                      label="Video URL"
                      onChange={(event) => setVideoURL(event.target.value)}
                      sx={textFieldSX}
                    />
                    {videoURL && !videoURL.includes("youtube.com/embed") && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        *Please submit a YouTube embed link
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" sx={submitSX}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">
            Please log in or register to add new classes
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

// import React, { useState, useContext, useEffect } from "react";
// import {
//   Grid,
//   TextField,
//   Typography,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { addVideoClass, fetchAllInstructors } from "../../helpers/fetching";
// import { VideosContext } from "../../context/VideosContext";
// import { fetchAllVideos } from "../../helpers/fetching";

// export default function AddNewVideo({ token, userId }) {
//   const { setVideos, addVideos } = useContext(VideosContext);

//   const [instructors, setInstructors] = useState([]);
//   const [instructorId, setInstructorId] = useState("");
//   const [instructorName, setInstructorName] = useState("");
//   const [style, setStyle] = useState("");
//   const [level, setLevel] = useState("");
//   const [videoURL, setVideoURL] = useState("");
//   const [isInstructorLabelFocused, setIsInstructorLabelFocused] =
//     useState(false);
//   const [isStyleLabelFocused, setIsStyleLabelFocused] = useState(false);

//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchInstructorList = async () => {
//       const instructorList = await fetchAllInstructors();
//       setInstructors(instructorList);
//     };
//     fetchInstructorList();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     async function makeAVideo() {
//       const result = await addVideoClass(
//         instructorId,
//         instructorName,
//         style,
//         level,
//         videoURL,
//         userId
//       );
//       console.log(result);
//       const updatedVideos = await fetchAllVideos();
//       setVideos(updatedVideos);
//     }
//     makeAVideo();

//     setInstructorName("");
//     setStyle("");
//     setLevel("");
//     setVideoURL("");
//     navigate("./", { replace: true });
//   };

//   const gridSX = {
//     border: "1px solid rgb(69, 2, 69)",
//     padding: "8px",
//     borderRadius: "8px",
//     marginRight: "10px",
//   };

//   const textFieldSX = {
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       border: "2px solid rgb(255, 123, 0)",
//       borderColor: "rgb(255, 123, 0)",
//     },
//     "& .MuiFormLabel-root.Mui-focused": {
//       color: "rgb(255, 123, 0)",
//     },
//   };

//   const selectSX = {
//     mb: 1,
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       border: "2px solid rgb(255, 123, 0)",
//     },
//     "& .MuiFormLabel-root.Mui-focused": {
//       color: "rgb(255, 123, 0)",
//     },
//   };

//   const buttonSX = {
//     color: "rgb(255, 123, 0)",
//   };

//   const submitSX = {
//     border: "1px solid rgb(255, 123, 0)",
//     backgroundColor: "white",
//     color: "rgb(255, 123, 0)",
//     "&:hover": {
//       border: "2px solid rgb(255, 123, 0)",
//       backgroundColor: "white",
//       fontWeight: "bold",
//     },
//     "&.MuiButton-containedPrimary": {
//       backgroundColor: "lightorange",
//     },
//   };

//   const uniqueStyles = [
//     ...new Set(instructors.map((instructor) => instructor.style.toUpperCase())),
//   ];

//   return (
//     <Grid container spacing={3} sx={gridSX}>
//       {token ? (
//         <>
//           <Grid item xs={12}>
//             <Typography variant="h5">Add New Class</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                   <FormControl component="fieldset" fullWidth sx={selectSX}>
//                     <InputLabel
//                       htmlFor="instructor-name"
//                       focused={isInstructorLabelFocused}
//                     >
//                       Instructor
//                     </InputLabel>
//                     <Select
//                       value={instructorName}
//                       required
//                       onChange={(event) => {
//                         const selectedName = event.target.value;
//                         setInstructorName(selectedName);

//                         const selectedInstructor = instructors.find(
//                           (instructor) => instructor.name === selectedName
//                         );

//                         if (selectedInstructor) {
//                           setInstructorId(selectedInstructor.instructor_id);
//                         }
//                       }}
//                       onFocus={() => setIsInstructorLabelFocused(true)}
//                       onBlur={() => setIsInstructorLabelFocused(false)}
//                       sx={selectSX}
//                     >
//                       <MenuItem value="" disabled>
//                         Select Instructor
//                       </MenuItem>
//                       {instructors.map((instructor) => (
//                         <MenuItem
//                           key={instructor.instructor_id}
//                           value={instructor.name}
//                         >
//                           {instructor.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <Button
//                     className="new-btn"
//                     onClick={() => {
//                       navigate("/instructors");
//                     }}
//                     sx={buttonSX}
//                   >
//                     Add an instructor
//                   </Button>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl component="fieldset" fullWidth sx={selectSX}>
//                     <InputLabel htmlFor="style">Style</InputLabel>
//                     <Select
//                       value={style}
//                       required
//                       onChange={(event) => {
//                         setStyle(event.target.value);
//                       }}
//                       onFocus={() => setIsStyleLabelFocused(true)}
//                       onBlur={() => setIsStyleLabelFocused(false)}
//                       sx={selectSX}
//                     >
//                       <MenuItem value="" disabled>
//                         Select Style
//                       </MenuItem>
//                       {uniqueStyles.map((styleName) => (
//                         <MenuItem key={styleName} value={styleName}>
//                           {styleName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <TextField
//                     fullWidth
//                     label="Other Style"
//                     variant="outlined"
//                     required
//                     value={style}
//                     onChange={(event) => setStyle(event.target.value)}
//                     sx={textFieldSX}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl component="fieldset" fullWidth sx={selectSX}>
//                     <InputLabel htmlFor="level">Level</InputLabel>
//                     <Select
//                       value={level}
//                       onChange={(event) => {
//                         setLevel(event.target.value);
//                       }}
//                       sx={selectSX}
//                     >
//                       <MenuItem value="" disabled>
//                         Select Level
//                       </MenuItem>
//                       <MenuItem value="beginner">Beginner</MenuItem>
//                       <MenuItem value="intermediate">Intermediate</MenuItem>
//                       <MenuItem value="advanced">Advanced</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth variant="outlined">
//                     <TextField
//                       value={videoURL}
//                       required
//                       label="Video URL"
//                       onChange={(event) => setVideoURL(event.target.value)}
//                       sx={textFieldSX}
//                     />
//                     {videoURL && !videoURL.includes("youtube.com") && (
//                       <Typography variant="body2" sx={{ color: "red" }}>
//                         *Please submit a YouTube embed link
//                       </Typography>
//                     )}
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button type="submit" variant="contained" sx={submitSX}>
//                     Submit
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </Grid>
//         </>
//       ) : (
//         <Grid item xs={12}>
//           <Typography variant="body1">
//             Please log in or register to add new classes
//           </Typography>
//         </Grid>
//       )}
//     </Grid>
//   );
// }
