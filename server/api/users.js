const express = require("express");
const router = express.Router();

const {
  registerNewUser,
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
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

// POST - api/users/register - register an account

router.post("/register", async (req, res, next) => {
  try {
    const newUser = await registerNewUser(req.body);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

// POST - api/users/login - log in to your account

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const loggedInUser = await loginUser(username, password);
    res.send({ loggedInUser });
  } catch (error) {
    next(error);
  }
});

//  - api/users/logout - logout of account

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
