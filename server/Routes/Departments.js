// routes/departmentRoutes.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const DepartmentController = require("../controllers/Departments");
//const { verifyUser } = require('../middlewares/auth'); // Assuming you have an auth middleware

router.post(
  "/departments",
  asyncHandler(DepartmentController.getAllDepartments)
);

module.exports = router;
