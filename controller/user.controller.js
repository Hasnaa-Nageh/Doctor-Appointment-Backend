const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    const userSchema = await User.findOne({ email });
    if (userSchema) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    let token = jwt.sign(
      { email, id: newUser._id, role: newUser.role },
      process.env.Secret_Key,
      {
        expiresIn: "1w",
      }
    );
    return res
      .status(201)
      .json({ message: "user Registered successfully", token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password is not correct" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.Secret_Key,
      {
        expiresIn: "1w",
      }
    );
    res
      .status(201)
      .json({ message: "user Logged In successfully", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
module.exports = { signup, login };
