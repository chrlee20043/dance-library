const express = require("express");
const router = express.Router();

const { getAllUsers, getUserById } = require("../db/helpers/users");

const users = require("../db/seedData");

// GET - api/users - get all users

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.log("error", error);
    // res.send([]);
    next(error);
  }
});

// GET - /api/users/:userId - get user by id

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
