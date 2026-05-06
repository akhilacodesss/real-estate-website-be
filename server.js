const express= require("express");
const mongoose= require("mongoose")
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT= process.env.PORT || 5004;
const userRoutes =  require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

mongoose.connect(process.env.MONGO_URI)
.then(() =>  console.log("DB CONNECTED"))
.catch((err) => console.log(err))

app.get("/" , (req, res) => {
    res.json("API is working");
})

app.use("/api/users" , userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/favorites", favoriteRoutes);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})