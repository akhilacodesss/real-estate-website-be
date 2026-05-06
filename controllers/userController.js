const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const { name, password, email, phone, } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ message: "user already exists, Please Login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const allowedRoles = ["user", "agent"];
        const finalRole = allowedRoles.includes(role) ? role : "user";

        const newUser = new User({
            name,
            email,
            phone,
            role: finalRole,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}
module.exports = { createUser, loginUser }