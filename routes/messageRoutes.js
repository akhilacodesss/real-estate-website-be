const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware")
const { getConversation} = require("../controllers/messageController");

router.post("/", authMiddleware, sendMessage);
router.get("/", authMiddleware, getMessages);
router.get("/conversation/:userId", authMiddleware, getConversation);

module.exports = router;