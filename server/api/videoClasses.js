const express = require("express");
const router = express.Router();

const {
  getVideoClasses,
  getVideoClassById,
  createVideoClass,
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

router.post("/", async (req, res, next) => {
  try {
    const videoClass = await createVideoClass(req.body);
    const existingVideo = await getVideoClassById(videoClass.videoId);
    if (existingVideo) {
      res.send(existingVideo);
    } else {
      const newVideo = await createVideoClass(videoClass);
      if (newVideo) {
        res.status(201).json(newVideo);
        // res.send(newVideo);
      } else {
        console.log("error adding video");
        // next({
        //   name: "createVideoError",
        //   message: "There was an error adding a video",
        // });
      }
    }
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/videoClasses/:videoId - delete a video (only if saved to my list)

// PATCH - /api/videoClasses/:videoId - edit video form (only if you added it)

module.exports = router;
