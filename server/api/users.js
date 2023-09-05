const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("../db/helpers/users");

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

// GET - api/users/:username - get user by username

router.get("/:username", async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.params.username);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
// POST - /api/users - add new user

router.post("/", async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/users/:userId - delete a user (only if it is me)

router.delete("/:userId", async (req, res, next) => {
  try {
    const deletedUser = await deleteUser(req.params.userId);
    res.send(deletedUser);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/userse/:userId - edit user (only if it is me)

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await updateUser(req.params.userId, req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
