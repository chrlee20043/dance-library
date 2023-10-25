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
  const [submittedBy, setSubmittedBy] = useState(userId);
  const [isInstructorLabelFocused, setIsInstructorLabelFocused] =
    useState(false);
  const [isStyleLabelFocused, setIsStyleLabelFocused] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch the list of instructors when the component mounts
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

    setInstructorId("");
    setInstructorName("");
    setStyle("");
    setLevel("");
    setVideoURL("");
    setSubmittedBy("");
    navigate("./", { replace: true });
  };

  const gridSX = {
    borderColor: "rgb(69, 2, 69)",
    padding: "16px",
  };

  const textFieldSX = {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const selectSX = {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(255, 123, 0)",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgb(255, 123, 0)",
    },
  };

  const buttonSX = {
    color: "rgb(255, 123, 0)",
  };

  return (
    <Grid container spacing={3} sx={gridSX}>
      {token ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h4">Add New Video Class</Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined" sx={selectSX}>
                    <InputLabel
                      htmlFor="instructor-name"
                      focused={isInstructorLabelFocused}
                    >
                      Instructor
                    </InputLabel>
                    <Select
                      value={instructorName}
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
                  <FormControl fullWidth variant="outlined" sx={selectSX}>
                    <InputLabel htmlFor="style">Style</InputLabel>
                    <Select
                      value={style}
                      onChange={(event) => {
                        setStyle(event.target.value);
                      }}
                      onFocus={() => setIsStyleLabelFocused(true)}
                      onBlur={() => setIsStyleLabelFocused(false)}
                    >
                      <MenuItem value="" disabled>
                        Select Style
                      </MenuItem>
                      {instructors.map((instructor) => (
                        <MenuItem
                          key={instructor.instructor_id}
                          value={instructor.style}
                        >
                          {instructor.style}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Add Style"
                    variant="outlined"
                    value={style}
                    onChange={(event) => setStyle(event.target.value)}
                    sx={textFieldSX}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className="col">
                    <Typography variant="body1">Level:</Typography>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="beginner"
                          checked={level === "beginner"}
                          onChange={() => setLevel("beginner")}
                        />
                        Beginner
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="intermediate"
                          checked={level === "intermediate"}
                          onChange={() => setLevel("intermediate")}
                        />
                        Intermediate
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="advanced"
                          checked={level === "advanced"}
                          onChange={() => setLevel("advanced")}
                        />
                        Advanced
                      </label>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      value={videoURL}
                      label="Video URL"
                      onChange={(event) => setVideoURL(event.target.value)}
                      sx={textFieldSX}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
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
//   InputLabel,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { addVideoClass, fetchAllInstructors } from "../../helpers/fetching";
// import { VideosContext } from "../../context/VideosContext";
// import { fetchAllVideos } from "../../helpers/fetching";
// import AddNewInstructor from "../Instructors/AddNewInstructor";

// export default function AddNewVideo({ token, userId }) {
//   const { setVideos, addVideos } = useContext(VideosContext);

//   const [instructors, setInstructors] = useState([]);
//   const [instructorId, setInstructorId] = useState("");
//   const [instructorName, setInstructorName] = useState("");
//   const [style, setStyle] = useState("");
//   const [level, setLevel] = useState("");
//   const [videoURL, setVideoURL] = useState("");
//   const [submittedBy, setSubmittedBy] = useState(userId);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // Fetch the list of instructors when the component mounts
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

//     setInstructorId("");
//     setInstructorName("");
//     setStyle("");
//     setLevel("");
//     setVideoURL("");
//     setSubmittedBy("");
//     navigate("./", { replace: true });
//   };

//   const gridSX = {
//     borderColor: "rgb(69, 2, 69)",
//     padding: "16px",
//   };

//   const textFieldSX = {
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgb(255, 123, 0)",
//     },
//     "& .MuiFormLabel-root.Mui-focused": {
//       color: "rgb(255, 123, 0)",
//     },
//     "& .MuiOutlinedInput-root.Mui-focused": {
//       color: "rgb(255, 123, 0)",
//     },
//   };

//   const selectSX = {
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgb(255, 123, 0)",
//     },
//     "& .MuiFormLabel-root.Mui-focused": {
//       color: "rgb(255, 123, 0)",
//     },
//   };

//   const buttonSX = {
//     color: "rgb(255, 123, 0)",
//   };

//   return (
//     <Grid container spacing={3} sx={gridSX}>
//       {token ? (
//         <>
//           <Grid item xs={12}>
//             <Typography variant="h4">Add New Video Class</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                   <InputLabel htmlFor="instructor-name">Instructor</InputLabel>
//                   <Select
//                     fullWidth
//                     label="Instructor"
//                     variant="outlined"
//                     value={instructorName}
//                     onChange={(event) => {
//                       const selectedName = event.target.value;
//                       setInstructorName(selectedName);

//                       const selectedInstructor = instructors.find(
//                         (instructor) => instructor.name === selectedName
//                       );

//                       if (selectedInstructor) {
//                         setInstructorId(selectedInstructor.instructor_id);
//                       }
//                     }}
//                     sx={selectSX}
//                   >
//                     <MenuItem value="" disabled>
//                       Select Instructor
//                     </MenuItem>
//                     {instructors.map((instructor) => (
//                       <MenuItem
//                         key={instructor.instructor_id}
//                         value={instructor.name}
//                       >
//                         {instructor.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
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
//                   <InputLabel htmlFor="style">Style</InputLabel>

//                   <Select
//                     fullWidth
//                     label="Style"
//                     variant="outlined"
//                     value={style}
//                     onChange={(event) => {
//                       setStyle(event.target.value);
//                     }}
//                     sx={selectSX}
//                   >
//                     <MenuItem value="" disabled>
//                       Select Style
//                     </MenuItem>
//                     {instructors.map((instructor) => (
//                       <MenuItem
//                         key={instructor.instructor_id}
//                         value={instructor.style}
//                       >
//                         {instructor.style}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <TextField
//                     fullWidth
//                     label="Add Style"
//                     variant="outlined"
//                     value={style}
//                     onChange={(event) => setStyle(event.target.value)}
//                     sx={textFieldSX}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <div className="col">
//                     <Typography variant="body1">Level:</Typography>
//                     <div>
//                       <label>
//                         <input
//                           type="radio"
//                           value="beginner"
//                           checked={level === "beginner"}
//                           onChange={() => setLevel("beginner")}
//                         />
//                         Beginner
//                       </label>
//                     </div>
//                     <div>
//                       <label>
//                         <input
//                           type="radio"
//                           value="intermediate"
//                           checked={level === "intermediate"}
//                           onChange={() => setLevel("intermediate")}
//                         />
//                         Intermediate
//                       </label>
//                     </div>
//                     <div>
//                       <label>
//                         <input
//                           type="radio"
//                           value="advanced"
//                           checked={level === "advanced"}
//                           onChange={() => setLevel("advanced")}
//                         />
//                         Advanced
//                       </label>
//                     </div>
//                   </div>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     fullWidth
//                     label="Video URL"
//                     variant="outlined"
//                     value={videoURL}
//                     onChange={(event) => setVideoURL(event.target.value)}
//                     sx={textFieldSX}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button type="submit" variant="contained" color="primary">
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
