const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../db/helpers/users");

const { users } = require("../db/seedData");

// Get - api/users - get all users

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.log("error", error);
    res.send([]);
    next(error);
  }
});

module.exports = router;
