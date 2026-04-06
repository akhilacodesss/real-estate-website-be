const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["apartment" , "house" , "villa" , "Flat" , "plot"],
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

} , {timestamps: true});

module.exports= mongoose.model("Property" , propertySchema);