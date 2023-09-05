const express = require("express");
const router = express.Router();

const {
  createSubscription,
  getAllSubscriptions,
  getSubByUserId,
  deleteSubscription,
  updateSubscription,
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

// GET - /api/subscriptions/:userId - get subscription by USER id

router.get("/:userId", async (req, res, next) => {
  try {
    console.log("hello");
    const subscription = await getSubByUserId(req.params.userId);
    res.send(subscription);
  } catch (error) {
    next(error);
  }
});

// POST - /api/subscription - add new subscription

router.post("/", async (req, res, next) => {
  try {
    const newSubscription = await createSubscription(req.body);
    res.send(newSubscription);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/subscription/:userId - delete my subscription (only if it is mine)

router.delete("/:userId", async (req, res, next) => {
  try {
    const deletedSubscription = await deleteSubscription(req.params.userId);
    res.send(deletedSubscription);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/subscription/:userId - edit my subscription (only if it is mine)

router.put("/:userId", async (req, res, next) => {
  try {
    const subscription = await updateSubscription(req.params.userId, req.body);
    res.send(subscription);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
