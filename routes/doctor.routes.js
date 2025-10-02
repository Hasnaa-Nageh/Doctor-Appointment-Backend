const express = require("express");
app.use("/upload", express.static("upload"));

const {
  addDoctor,
  getAllDoctors,
  getSingleDoctor,
  CountDoctor,
} = require("../controller/doctor.controller");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/counts", CountDoctor);
router.post("/add-doctor", upload.single("image"), addDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getSingleDoctor);
module.exports = router;
