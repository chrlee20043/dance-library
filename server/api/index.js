const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send("OK");
});

// ROUTER: /api/users
router.use("/users", require("./users"));

// ROUTER: /api/instructors
router.use("/instructors", require("./instructors"));

// ROUTER: /api/videoClasses
router.use("/videoclasses", require("./videoClasses"));

// ROUTER: /api/subscriptions

router.use("/subscriptions", require("./subscriptions"));

module.exports = router;
