const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const BranchesController = require("../controllers/Branches");
//const { verifyUser } = require('../middlewares/auth');

router.post("/Branches", asyncHandler(BranchesController.getAllBranches));
router.post("/Report1", asyncHandler(BranchesController.getCashirInfo));
router.post(
  "/Report2",
  asyncHandler(BranchesController.TotalCashierDeficitsAndIncreases)
);

module.exports = router;
