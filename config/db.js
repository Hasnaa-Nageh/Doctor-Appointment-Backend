const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose Connected Successfully");
  } catch (err) {
    console.log(`Connected Error${err}`);
  }
};
module.exports = connectDB;
