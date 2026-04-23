const jwt = require("jsonwebtoken");

const authMiddleware = (req,res, next) => {
    try{
        const authHeader = req.headers.authorization;

         if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

       if (!authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "Invalid token format" });
}

        const token = authHeader.split(" ")[1];

        const  decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded){
            return res.status(401).json({message: "invalid token"});
        }

        req.user = decoded;
        next();
        
    } catch (err) {
       return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports= authMiddleware;