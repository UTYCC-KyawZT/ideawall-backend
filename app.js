const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/Users");
const morgan = require("morgan");
const fs = require("fs");
const port = 8000;
require("dotenv/config");

// ** Variables
const message = {
  0: "Authorized",
  1: "Unauthorized",
  2: "Token expired",
  3: "Token not found",
  4: "Internal server error",
  5: "This is home baby!",
  6: "Token invalid",
};

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  "./logs/" + getFormattedDate() + "_access.log",
  {
    flags: "a",
  }
);

const result = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

// ** Import Routes
const usersRoute = require("./routes/users");
const wallsRoute = require("./routes/walls");
const ideasRoute = require("./routes/ideas");
const authRoute = require("./routes/auth");

// ** Middleware
app.use(morgan("combined", { stream: accessLogStream })); // logger
app.use(cors());
app.use(bodyParser.json());
app.use("/users", authenticateToken, usersRoute);
app.use("/walls", authenticateToken, wallsRoute);
app.use("/ideas", authenticateToken, ideasRoute);
app.use("/auth", authRoute);

// ** Routes
app.get("/", (req, res) => {
  res.send("<h1>This is home baby!</h1>");
});

// ** Functions
function getFormattedDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Validation
  if (token == null) {
    // return res.sendStatus(401);
    return res.status(401).json(result(false, message[3], null));
  }
  // Check if the token is valid in the database
  try {
    const user = await User.findOne({ "access-token": token });

    // check if the refresh token is in the database
    if (!user) {
      return res.status(401).json(result(false, message[3], null));
    }
  } catch (err) {
    console.error("Error during token verification:", err);
    return res.status(500).json(result(false, message[4], null));
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // return res.sendStatus(403);
      return res.status(403).json(result(false, message[6], null));
    }
    req.user = user;
    console.log("User:", user, "Request user:", req.user);

    next();
  });
}

// ** Connect DB
mongoose.connect(process.env.DB_CONNECTION);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
