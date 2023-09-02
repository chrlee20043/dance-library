const express = require("express");
const router = express.Router();

const {
  getVideoClasses,
  getVideoClassById,
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

// GET - /api/users/:videoId - get video by id

router.get("/:videoId", async (req, res, next) => {
  try {
    const videoClass = await getVideoClassById(req.params.videoId);
    res.send(videoClass);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
