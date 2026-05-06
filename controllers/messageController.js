const Message = require("../models/Message");
const User = require("../models/User");
const Property = require("../models/Property");

//  Send Message
const sendMessage = async (req, res) => {
  try {
    const { text, propertyId } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Message text required" });
    }

    let receiverId;

     if (propertyId) {
      const property = await Property.findById(propertyId);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      receiverId = property.agent;
    }  else {
      const admin = await User.findOne({ role: "admin" });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      receiverId = admin._id;
    }

    const newMessage = new Message({
      text,
      propertyId: propertyId || null,
      sender: req.user.id, 
      receiver: receiverId ,
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

const getConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name")
      .populate("propertyId", "title");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching conversation" });
  }
};

module.exports = { sendMessage, getMessages, getConversation };