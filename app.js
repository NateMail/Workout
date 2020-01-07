const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("DB connected"));

mongoose.connection.on("error", error => {
  console.log(`db connection error: ${error.message}`);
});
// Routes
const authRoutes = require("./routes/authRoutes");
const liftRoutes = require("./routes/liftRoutes");
const bodyRoutes = require("./routes/bodyRoutes");
const cardioRoutes = require("./routes/cardioRoutes");
const userRoutes = require("./routes/user");

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);
app.use("/", liftRoutes);
app.use("/", bodyRoutes);
app.use("/", cardioRoutes);
app.use("/", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8181;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
