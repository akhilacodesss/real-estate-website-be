const Favorite = require("../models/Favorite");

// ADD / REMOVE (toggle)
const toggleFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id;

    const existing = await Favorite.findOne({ userId, propertyId });

    if (existing) {
      await Favorite.findByIdAndDelete(existing._id);
      return res.json({ message: "Removed from wishlist" });
    }

    const favorite = new Favorite({ userId, propertyId });
    await favorite.save();

    res.json({ message: "Added to wishlist" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating wishlist" });
  }
};

// GET USER WISHLIST
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ userId })
      .populate("propertyId");

    res.json(favorites);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching wishlist" });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
};