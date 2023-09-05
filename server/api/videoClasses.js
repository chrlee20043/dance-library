const express = require("express");
const router = express.Router();

const {
  getVideoClasses,
  getVideoClassById,
  createVideoClass,
  updateVideoClass,
  deleteVideoClass,
} = require("../db/helpers/videoClasses");

const videoClasses = require("../db/seedData");

// GET - api/videoClasses - get all videos

router.get("/", async (req, res, next) => {
  try {
    const videoClasses = await getVideoClasses();
    res.send(videoClasses);
  } catch (error) {
    next(error);
  }
});

// GET - /api/videoClasses/:videoId - get video by id

router.get("/:videoId", async (req, res, next) => {
  try {
    const videoClass = await getVideoClassById(req.params.videoId);
    res.send(videoClass);
  } catch (error) {
    next(error);
  }
});

// POST - /api/videoClasses - add new video

router.post("/", async (req, res, next) => {
  try {
    const videoClass = await createVideoClass(req.body);
    res.send(videoClass);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/videoClasses/:videoId - delete a video (only if saved to my list)

router.delete("/:videoId", async (req, res, next) => {
  try {
    const videoClass = await deleteVideoClass(req.params.videoId);
    res.send(videoClass);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/videoClasses/:videoId - edit video form (only if you added it)

router.put("/:videoId", async (req, res, next) => {
  try {
    const videoClass = await updateVideoClass(req.params.videoId, req.body);
    res.send(videoClass);
  } catch (error) {
    next(error);
  }
});

// router.patch("/:videoId", async (req, res, next) => {
//   try {
//     const { videoId } = req.params;
//     const existingVideo = await getVideoClassById(videoId);
//     if (!existingVideo) {
//       next({
//         name: "NotFound",
//         message: `No video by ID ${videoId}`,
//       });
//     } else {
//       const { instructor_id, style, level, videoURL } = req.body;
//       const updatedVideo = await updateVideo({ id: req.body });
//       if (updatedVideo) {
//         res.send(updatedVideo);
//       } else {
//         next({
//           name: "FailedToUpdate",
//           message: "There was an error updating your activity",
//         });
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
