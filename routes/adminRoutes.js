const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const {
  getUsers,
  deleteUser,
  getProperties,
  deleteProperty,
  getLeads
} = require("../controllers/adminController");

console.log(__dirname);

router.get("/users", authMiddleware, isAdmin, getUsers);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);

router.get("/properties", authMiddleware, isAdmin, getProperties);
router.delete("/properties/:id", authMiddleware, isAdmin, deleteProperty);

router.get("/leads", authMiddleware, isAdmin, getLeads);

module.exports = router;