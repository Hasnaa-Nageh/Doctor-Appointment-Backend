const express = require("express");
const {
  addDoctor,
  getAllDoctors,
  getSingleDoctor,
  CountDoctor
} = require("../controller/doctor.controller");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/count",CountDoctor)
router.post("/", upload.single("image"), addDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getSingleDoctor);
module.exports = router;
