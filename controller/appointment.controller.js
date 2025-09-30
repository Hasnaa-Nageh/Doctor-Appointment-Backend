const Appointment = require("./../models/appointment.model");

const addAppointment = async (req, res) => {
  try {
    const { doctor, date, reason } = req.body;
    if (!doctor || !date || !reason) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }
    const appointment = await Appointment.create({
      user: req.user.id,
      doctor,
      date,
      reason,
    });
    res
      .status(201)
      .json({ message: "Appointment Added Successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const getMyAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.find({ user: req.user.id }).populate("doctor");

    if (!appointment) {
      return res.status(401).json({ message: "No Appointments Found" });
    }
    res.status(201).json({ message: "All Appointments", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const deleteAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndDelete(id);
    if (!appointment) {
      return res.status(401).json({ message: "No Appointments Found" });
    }
    res
      .status(201)
      .json({ message: "Appointments Deleted Successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = { addAppointment, getMyAppointment, deleteAppointments };
