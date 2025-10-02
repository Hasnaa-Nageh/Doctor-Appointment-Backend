const Doctor = require("./../models/doctor.model");

const addDoctor = async (req, res) => {
  try {
    const { name, experienceYears, description, specialty } = req.body;

    const image = req.file ? req.file.filename : null;
    if (!name || !description || !specialty || !experienceYears || !image) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const newDoctor = new Doctor({
      name,
      specialty,
      description,
      experienceYears,
      image: req.file?.filename,
    });

    const saveDoctor = await newDoctor.save();
    res.status(201).json({ message: "Doctor Added Successfully", saveDoctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors) {
      return res.status(400).json({ message: "Doctor Not Found" });
    }
    res.status(200).json({ message: "All Doctor", doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const getSingleDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctors = await Doctor.findById(id);
    if (!doctors) {
      return res.status(400).json({ message: "Doctor Not Found" });
    }
    res.status(200).json({ message: "Doctor Found", doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const CountDoctor = async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    if (!count) {
      return res.status(400).json({ message: "No Doctors Found" });
    }
    res.status(201).json({ message: "Count Doctors", count });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = { addDoctor, getAllDoctors, getSingleDoctor, CountDoctor };
