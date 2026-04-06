const express= require("express");
const router= express.Router();
const  {createProperty , getAllProperties, getById , updateProperty, deleteProperty} = require("../controllers/propertyController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/" , authMiddleware, createProperty);
router.put("/:id" ,authMiddleware,  updateProperty);
router.delete("/:id" , authMiddleware, deleteProperty);
router.get("/", getAllProperties);
router.get("/:id", getById)

module.exports = router;