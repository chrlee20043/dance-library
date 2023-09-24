const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  createVideoClass,
  getVideoClassesWithInstructorName,
  getVideoClassByInstructorId,
  getVideoClassById,
  getVideoClassBySubmitterId,
  updateVideoClass,
  deleteVideoClass,
} = require("../db/helpers/videoClasses");

const videoClasses = require("../db/seedData");

// GET - api/videoClasses - get all videos

router.get("/", async (req, res, next) => {
  try {
    const videoClasses = await getAllVideos();
    res.send(videoClasses);
  } catch (error) {
    next(error);
  }
});

// GET - api/videoClasses - get videos with instructor name

router.get("/:videoId/:instructorName", async (req, res, next) => {
  try {
    const videoClasses = await getVideoClassesWithInstructorName(
      req.params.videoId,
      req.params.instructorName
    );
    console.log(videoClasses);
    res.send(videoClasses);
  } catch (error) {
    next(error);
  }
});

// GET - /api/videoClasses/:videoId - get video by video id

router.get("/:videoId", async (req, res, next) => {
  try {
    const videoClass = await getVideoClassById(req.params.videoId);
    res.send(videoClass);
  } catch (error) {
    next(error);
  }
});

// GET - /api/videoClasses/:instructorId - get video by instructor id

// router.get("/video/:instructorId", async (req, res, next) => {
//   try {
//     const videoClass = await getVideoClassByInstructorId(
//       req.params.instructorId
//     );
//     res.send(videoClass);
//   } catch (error) {
//     next(error);
//   }
// });

// GET - /api/videoClasses/myprofile/:userId - get my user data and saved videos

router.get("/myvideos/:userId", async (req, res, next) => {
  try {
    const videoClasses = await getVideoClassBySubmitterId(req.params.userId);
    console.log("my user id: ", userId);
    res.send(videoClasses);
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

// DELETE - /api/videoClasses/video:videoId - delete a video (only if saved to my list)

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

module.exports = router;
