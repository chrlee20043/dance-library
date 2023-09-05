const express = require("express");
const router = express.Router();

const {
  createInstructor,
  getAllInstructors,
  getInstructorsById,
  updateInstructor,
  deleteInstructor,
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

router.get("/:instructorId", async (req, res, next) => {
  try {
    const instructor = await getInstructorsById(req.params.instructorId);
    res.send(instructor);
  } catch (error) {
    next(error);
  }
});

// POST - /api/instructors - add new instructor

router.post("/", async (req, res, next) => {
  try {
    const newInstructor = await createInstructor(req.body);
    res.send(newInstructor);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/instructors/:instructorId - delete an instructor (only if I added them)

router.delete("/:instructorId", async (req, res, next) => {
  try {
    const deletedInstructor = await deleteInstructor(req.params.instructorId);
    res.send(deletedInstructor);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/instructors/:instructorId - edit instructor (only if you added it)

router.put("/:instructorId", async (req, res, next) => {
  try {
    const instructor = await updateInstructor(
      req.params.instructorId,
      req.body
    );
    res.send(instructor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
