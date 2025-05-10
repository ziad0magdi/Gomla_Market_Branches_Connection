// routes/departmentRoutes.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const DatabasesController = require("../controllers/Databases");
//const { verifyUser } = require('../middlewares/auth'); // Assuming you have an auth middleware

router.post("/Databases", asyncHandler(DatabasesController.getAllDatabases));
router.post(
  "/UserDatabases",
  asyncHandler(DatabasesController.getAllUserDatabases)
);
router.post(
  "/UserAvailableDatabases",
  asyncHandler(DatabasesController.getUserAvailableDatabases)
);
router.post(
  "/UserAvailableDatabasesManager",
  asyncHandler(DatabasesController.getUserAvailableDatabasesForManager)
);
router.post(
  "/SelectedDatabase",
  asyncHandler(DatabasesController.getSelectedUserDatabase)
);
router.post(
  "/DatabaseToUser",
  asyncHandler(DatabasesController.addDatabaseToUser)
);

module.exports = router;
