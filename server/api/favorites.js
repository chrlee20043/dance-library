const express = require("express");
const router = express.Router();

const {
  getAllFavorites,
  createFavorite,
  deleteFavorite,
  getFavoriteById,
  getFavoritesByUserId,
  getFavoritesByVideoId,
} = require("../db/helpers/favorites");

router.use(express.json());

// GET favorites  - api/favorites
router.get("/", async (req, res, next) => {
  try {
    const favorites = await getAllFavorites();
    res.send(favorites);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

// GET favorite by id = api/favorites/:favoriteId

router.get("/:favoriteId", async (req, res, next) => {
  try {
    const favorite = await getFavoriteById(req.params.favoriteId);
    res.send(favorite);
  } catch (error) {
    next(error);
  }
});

// GET favorites by museum id - api/favorites/museum/:museumId
router.get("/museum/:museumId", async (req, res, next) => {
  try {
    const favorites = await getFavoritesByVideoId(req.params.museumId);
    res.send(favorites);
  } catch (error) {
    next(error);
  }
});

// GET favorites by User ID - api/favorites/user/:userId
router.get("/user/:userId", async (req, res, next) => {
  try {
    const favorites = await getFavoritesByUserId(req.params.userId);
    res.send(favorites);
  } catch (error) {
    next(error);
  }
});

// POST favorites - api/favorites
router.post("/", async (req, res, next) => {
  try {
    const favorite = await createFavorite(req.body);
    res.send(favorite);
  } catch (error) {
    next(error);
  }
});

// DELETE favorites - api/favorites
router.delete("/:favoriteId", async (req, res, next) => {
  try {
    const favorite = await deleteFavorite(req.params.favoriteId);
    res.send(favorite);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
