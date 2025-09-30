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


module.exports = { addDepartment };
