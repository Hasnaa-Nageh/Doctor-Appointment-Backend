const express = require("express");
const {
  addDoctor,
  getAllDoctors,
  getSingleDoctor,
  CountDoctor,
} = require("../controller/doctor.controller");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/counts", CountDoctor);
router.post("/",  addDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getSingleDoctor);
module.exports = router;
