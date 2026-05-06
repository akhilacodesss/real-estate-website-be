const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  toggleFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

// ADD / REMOVE
router.post("/", authMiddleware, toggleFavorite);

// GET ALL
router.get("/", authMiddleware, getFavorites);

module.exports = router;