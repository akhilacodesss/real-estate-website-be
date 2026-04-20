const User= require("../models/User");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const createUser= async (req,res) => {
    try{
        const { name, password, email, phone, role } = req.body;

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({message: "user already exists, Please Login"});
        }

        const hashedPassword =  await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            role,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser)
    } catch (err) {
        return res.status(400).json(err)
    }
}

const loginUser= async (req,res) => {
    try{
        const {email , password} = req.body;

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: "invalid credentials"});
        }

        const token= jwt.sign(
            {id: user._id,
            name: user.name,
            role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        return res.status(200).json({message: "LOGIN SUCCESS" , token})
    
    } catch (err) {
        return res.status(401).json(err)
    }
}
module.exports = {createUser , loginUser}