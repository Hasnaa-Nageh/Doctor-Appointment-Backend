const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({ message: "Access Denied" });
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.Secret_Key, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      } else {
        console.log(decoded);
        req.user = decoded;
        next();
      }
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

module.exports = authenticationToken;
