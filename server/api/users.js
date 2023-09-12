const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_SECRET } = require("../secrets");
const SALT_ROUNDS = 10;
const express = require("express");
const router = express.Router();

const {
  registerNewUser,
  loginUser,
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

// POST - api/users/register - register an account

// router.post("/register", async (req, res, next) => {
//   try {
//     const newUser = await registerNewUser(req.body);
//     res.send(newUser);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password, name } = req.body;
    console.log(typeof password);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log(hashedPassword);
    const user = await createUser({
      username,
      password: hashedPassword,
      name,
    });
    console.log(user);
    delete user.password;

    const token = jwt.sign(user, JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    delete user.password;

    res.send({ user });
  } catch (error) {
    next(error);
  }
});

// POST - api/users/login - log in to your account

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });
    const user = await getUserByUsername(username);
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      delete user.password;

      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

// router.post("/login", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const loggedInUser = await loginUser(username, password);
//     res.send({ loggedInUser });
//   } catch (error) {
//     next(error);
//   }
// });

//  - api/users/logout - logout of account
router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
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
