const Property = require("../models/Property");

const createProperty = async (req, res) => {
    try {
        const { title, price, location, type, rooms, image, description, agent } = req.body;

        const newProperty = new Property({
            title,
            price,
            location,
            type,
            rooms,
            image,
            description,
            agent: req.user.id
        })

        const saveProperty = await newProperty.save();
        return res.status(201).json(saveProperty)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const getAllProperties = async (req, res) => {
    try {
        const { location, type, price } = req.query

        const filter = {}
        if (location) {
            filter.location = location
        }
        if (type) {
            filter.type = type
        }
        if (price) {
            filter.price = { $lte: price };
        }

        const result = await Property.find(filter).populate("agent")
        return res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await Property.findById(id).populate("agent");
        if (!result) {
            return res.status(404).json({ message: "property not found" })
        }

        return res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateProperty = async (req, res) => {
    try {
        const id = req.params.id
        const property = await Property.findById(id)
        if (!property) {
            return res.status(404).json({ message: "property not found" })
        }

        if (property.agent.toString() !== req.user.id) {
            return res.status(403).json({ message: "not authorized" })
        }

        const { title, price, location, type, rooms, image, description } = req.body;

        const result = await Property.findByIdAndUpdate(id, { title, price, location, type, rooms, image, description }, { new: true })
        return res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const deleteProperty = async (req, res) => {
    try {
        const id = req.params.id

        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "property not found" })
        }

        if (property.agent.toString() !== req.user.id) {
            return res.status(403).json({ message: "not authorized" })
        }

        const result = await Property.findByIdAndDelete(id)
        return res.status(200).json({ message: "property deleted" })
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createProperty, getAllProperties, getById, updateProperty, deleteProperty }