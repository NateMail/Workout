const express = require("express");
// const mongoose = require('mongoose')
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 8181;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
