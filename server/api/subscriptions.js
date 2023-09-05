const express = require("express");
const router = express.Router();

const {
  createSubscription,
  getAllSubscriptions,
  getSubByUserId,
} = require("../db/helpers/subscriptions");

const subscriptions = require("../db/seedData");

// GET - api/subscriptions - get all subscriptions

router.get("/", async (req, res, next) => {
  try {
    const subscriptions = await getAllSubscriptions();
    res.send(subscriptions);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

// GET - /api/:userId/subscription - get subscription by USER id

router.get("/:userId/subscription", async (req, res, next) => {
  try {
    const user = await getSubByUserId(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
