// import React, { useState, useEffect, useContext } from "react";
// import { Grid, TextField, Typography, Select, MenuItem } from "@mui/material";
// import { fetchAllVideos } from "../../helpers/fetching";
// import VideoListName from "./VideoListName";
// import AddNewVideo from "./AddNewVideo";
// import { VideosContext } from "../../context/VideosContext";

// export default function AllVideos({ token, userId }) {
//   const { videos, setVideos } = useContext(VideosContext);
//   const [searchParam, setSearchParam] = useState("");
//   const [selectedStyle, setSelectedStyle] = useState("");
//   const [selectedTypes, setSelectedTypes] = useState([
//     "beginner",
//     "intermediate",
//     "advanced",
//   ]);
//   const [error, setError] = useState("");

//   const renderVideos = async () => {
//     try {
//       const videoArray = await fetchAllVideos();
//       setVideos(videoArray);
//     } catch (error) {
//       setError("Failed to fetch videos. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     renderVideos();
//   }, []);

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

//   const gridContainerSX = {
//     alignItems: "flex-start",
//   };

//   const uniqueStyles = [...new Set(videos.map((video) => video.style))];

//   const videosToDisplay = videos.filter((video) => {
//     const instructorName = video.instructor_name.toLowerCase();
//     const style = video.style.toLowerCase();
//     const level = video.level.toLowerCase();

//     const searchMatch =
//       instructorName.includes(searchParam) ||
//       style.includes(searchParam) ||
//       level.includes(searchParam);

//     const styleMatch =
//       selectedStyle === "" || style === selectedStyle.toLowerCase();
//     const levelMatch =
//       (selectedTypes.includes("beginner") && level === "beginner") ||
//       (selectedTypes.includes("intermediate") && level === "intermediate") ||
//       (selectedTypes.includes("advanced") && level === "advanced");

//     return styleMatch && levelMatch && (searchParam === "" || searchMatch);
//   });

//   const onOptionChange = (e) => {
//     const type = e.target.value;

//     setSelectedTypes((prevSelectedTypes) => {
//       if (prevSelectedTypes.includes(type)) {
//         return prevSelectedTypes.filter((t) => t !== type);
//       } else {
//         return [...prevSelectedTypes, type];
//       }
//     });
//   };

//   const onStyleChange = (e) => {
//     setSelectedStyle(e.target.value);
//   };

//   return (
//     <Grid container spacing={3} sx={gridContainerSX}>
//       <Grid item xs={12}>
//         <Typography variant="h4">Classes</Typography>
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <TextField
//           fullWidth
//           label="Search"
//           variant="outlined"
//           onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
//           sx={textFieldSX}
//         />
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Select
//           value={selectedStyle}
//           onChange={onStyleChange}
//           displayEmpty
//           fullWidth
//           variant="outlined"
//           sx={textFieldSX}
//         >
//           <MenuItem value="">Select Style</MenuItem>
//           {uniqueStyles.map((style) => (
//             <MenuItem key={style} value={style}>
//               {style}
//             </MenuItem>
//           ))}
//         </Select>
//       </Grid>
//       <Grid>
//         <div className="filter-buttons">
//           <label>
//             <input
//               type="checkbox"
//               value="beginner"
//               checked={selectedTypes.includes("beginner")}
//               onChange={onOptionChange}
//             />
//             Beginner
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="intermediate"
//               checked={selectedTypes.includes("intermediate")}
//               onChange={onOptionChange}
//             />
//             Intermediate
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="advanced"
//               checked={selectedTypes.includes("advanced")}
//               onChange={onOptionChange}
//             />
//             Advanced
//           </label>
//         </div>
//       </Grid>
//       {token && (
//         <Grid
//           item
//           xs={12}
//           md={4}
//           sx={{ display: "flex", justifyContent: "center" }}
//         >
//           <AddNewVideo token={token} userId={userId} />
//         </Grid>
//       )}
//       <Grid item xs={12}>
//         {error && <p>{error}</p>}
//         {token ? (
//           <Grid container spacing={3}>
//             {videosToDisplay.map((video) => (
//               <Grid item key={video.video_id} xs={12} md={4}>
//                 <VideoListName video={video} />
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <p>No classes available</p>
//         )}
//       </Grid>
//     </Grid>
//   );
// }

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

  return (
    <Grid container spacing={3} sx={gridContainerSX}>
      <Grid item xs={12}>
        <Typography variant="h4">Classes</Typography>
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
          <MenuItem value="">Select Style</MenuItem>
          {uniqueStyles.map((style) => (
            <MenuItem key={style} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid>
        <div className="filter-buttons">
          <label>
            <input
              type="checkbox"
              value="beginner"
              checked={selectedTypes.includes("beginner")}
              onChange={onOptionChange}
            />
            Beginner
          </label>
          <label>
            <input
              type="checkbox"
              value="intermediate"
              checked={selectedTypes.includes("intermediate")}
              onChange={onOptionChange}
            />
            Intermediate
          </label>
          <label>
            <input
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
