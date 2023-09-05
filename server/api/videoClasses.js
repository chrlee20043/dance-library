const express = require("express");
const router = express.Router();

const {
  getVideoClasses,
  getVideoClassById,
  createVideoClass,
  deleteVideo,
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
    const { instructor_id, style, level, videoURL } = req.body;
    const existingVideo = await getVideoClassById(instructor_id);
    if (existingVideo) {
      res.send(existingVideo);
      console.log(existingVideo);
    } else {
      const newVideo = await createVideoClass({
        instructor_id,
        style,
        level,
        videoURL,
      });
      if (newVideo) {
        res.send(newVideo);
        console.log(newVideo);
        å;
      } else {
        console.log("error adding video");
        next({
          name: "createVideoError",
          message: "There was an error adding a video",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/videoClasses/:videoId - delete a video (only if saved to my list)

router.delete("/:videoId", async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const videoToUpdate = await getVideoClassById(videoId);
    if (!videoToUpdate) {
      next({
        name: "NotFound",
        message: `No video by ID ${videoId}`,
      });
    } else if (req.user.id !== videoToUpdate.creatorId) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who added this video",
      });
    } else {
      const deletedVideo = await deleteVideo(videoId);
      res.send({ success: true, ...deletedVideo });
    }
  } catch (error) {
    throw error;
  }
});

// PATCH - /api/videoClasses/:videoId - edit video form (only if you added it)

router.patch("/:videoId", async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const existingVideo = await getVideoClassById(videoId);
    if (!existingVideo) {
      next({
        name: "NotFound",
        message: `No video by ID ${videoId}`,
      });
    } else {
      const { instructor_id, style, level, videoURL } = req.body;
      const updatedVideo = await updateVideo({ id: req.body });
      if (updatedVideo) {
        res.send(updatedVideo);
      } else {
        next({
          name: "FailedToUpdate",
          message: "There was an error updating your activity",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
