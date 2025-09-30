const express = require("express");
const {
  addDepartment,
  CountDepartment,
} = require("../controller/Department.controller");
const authenticationToken = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middle");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/counts", CountDepartment);
router.post(
  "/add-department",
  upload.single("image"),
  authenticationToken,
  authorize("admin"),
  addDepartment
);

module.exports = router;
