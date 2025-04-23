const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const BeanchesController = require("../controllers/Branches");
//const { verifyUser } = require('../middlewares/auth');

router.post("/Cashirs", asyncHandler(BeanchesController.getCashirInfo));

module.exports = router;
