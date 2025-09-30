const connectDB = require("./config/db");
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
