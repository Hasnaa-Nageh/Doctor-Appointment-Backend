const Department = require("./../models/department.model");

const addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!name) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }
    const department = await Department.create({
      name,
      description,
      image: req.file?.filename,
    });
    res
      .status(201)
      .json({ message: "Department Added Successfully", department });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const CountDepartment = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    res.status(200).json({
      success: true,
      message: "Count Department",
      count: count || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const department = await Department.find();
    if (!department) {
      return res.status(400).json({ message: "No Department Found" });
    }
    res.status(201).json({ message: "All Departments", department });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const getSingleDepartments = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(400).json({ message: "No Department Found" });
    }
    res.status(201).json({ message: "Department Found", department });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  CountDepartment,
  addDepartment,
  getAllDepartments,
  getSingleDepartments,
};
