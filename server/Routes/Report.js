const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const ReportController = require("../controllers/Report");
//const { verifyUser } = require('../middlewares/auth'); // Assuming you have an auth middleware

router.post("/Reports", asyncHandler(ReportController.getAllReports));
router.post("/UserReports", asyncHandler(ReportController.getUserReports));
router.post("/ReportToUser", asyncHandler(ReportController.addReportToUser));

module.exports = router;
