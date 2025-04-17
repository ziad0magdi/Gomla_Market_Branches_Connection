// routes/departmentRoutes.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const UsersController = require("../controllers/User");
//const { verifyUser } = require('../middlewares/auth'); // Assuming you have an auth middleware

router.post("/Users", asyncHandler(UsersController.getAllUsers));
router.post("/User", asyncHandler(UsersController.addUser));

module.exports = router;
