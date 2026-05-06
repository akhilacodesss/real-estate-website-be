const User = require("../models/User");
const Property = require("../models/Property");
const Message = require("../models/Message");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting user" });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch {
    res.status(500).json({ message: "Error fetching properties" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting property" });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Message.find()
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .populate("propertyId", "title");

    res.json(leads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching leads" });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getProperties,
  deleteProperty,
  getLeads
};