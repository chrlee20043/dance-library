const express = require("express");
const router = express.Router();

const {
  getAllInstructors,
  getInstructorsById,
} = require("../db/helpers/instructors");

const instructors = require("../db/seedData");

// GET - api/instructors - get all instructors

router.get("/", async (req, res, next) => {
  try {
    const instructors = await getAllInstructors();
    res.send(instructors);
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/:instructorId - get instructor by id

router.get("/instructors:instructorId", async (req, res, next) => {
  try {
    const instructor = await getInstructorsById(req.params.instructorId);
    res.send(instructor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
