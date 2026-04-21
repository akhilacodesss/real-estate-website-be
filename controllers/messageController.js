const Message = require("../models/Message");


//  Send Message
const sendMessage = async (req, res) => {
  try {
    const { text, propertyId, receiver } = req.body;

    if (!text || !propertyId || !receiver) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newMessage = new Message({
      text,
      propertyId,
      sender: req.user.id, // from token
      receiver,
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json(err);
  }
};


//  Get messages for logged-in user (agent)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      receiver: req.user.id,
    })
      .populate("sender", "name email")
      .populate("propertyId", "title");

    res.json(messages);

  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { sendMessage, getMessages };