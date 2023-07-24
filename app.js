const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv/config");

// Import Routes
const wallsRoute = require("./routes/walls");
const ideasRoute = require("./routes/ideas");

app.use(bodyParser.json());
app.use("/walls", wallsRoute);
app.use("/ideas", ideasRoute);

app.get("/", (req, res) => {
  res.send("This is home baby!");
});

// Connect DB
mongoose.connect(process.env.DB_CONNECTION);

app.listen(8000);
