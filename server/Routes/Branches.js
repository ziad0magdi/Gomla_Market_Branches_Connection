const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const BeanchesController = require("../controllers/Branches");
//const { verifyUser } = require('../middlewares/auth');

router.post("/Report1", asyncHandler(BeanchesController.getCashirInfo));
router.post(
  "/Report2",
  asyncHandler(BeanchesController.TotalCashierDeficitsAndIncreases)
);

module.exports = router;
