const express = require("express");
const app = express();
const authRouter = require("./routes/user.routes");
const doctorRouter = require("./routes/doctor.routes");
const AppointmentRouter = require("./routes/appointment.routes");
const DepartmentRouter = require("./routes/department.route");

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/files", express.static("upload"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Running Successfully" });
});
app.use("/api/auth", authRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", AppointmentRouter);
app.use("/api/department", DepartmentRouter);

module.exports = app;
