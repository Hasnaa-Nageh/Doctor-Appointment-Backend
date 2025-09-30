const express = require("express");
const {
  addAppointment,
  getMyAppointment,
  deleteAppointments,
} = require("../controller/appointment.controller");
const authenticationToken = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create-appointment", authenticationToken, addAppointment);
router.get("/my-appointment", authenticationToken, getMyAppointment);
router.delete("/delete-appointment", authenticationToken, deleteAppointments);
module.exports = router;
