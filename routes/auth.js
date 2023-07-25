const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ** Variables
let refreshTokens = []; // store refresh tokens in memory for temporary use

const message = {
  0: "Users retrieved successfully",
  1: "User created successfully",
  2: "User updated successfully",
  3: "User deleted successfully",
  4: "User not found",
  5: "User not updated",
  6: "User not deleted",
  7: "User not created",
  8: "User not retrieved",
  9: "User already exists",
  10: "Internal server error",
  11: "Incorrect password",
  12: "User authentication successful",
  13: "User authentication failed",
  14: "Token expired",
  15: "Token revoked",
  16: "Token invalid",
  17: "Token required",
  18: "Token not found",
  19: "Token not refreshed",
  20: "Token refreshed",
  21: "Token not generated",
  22: "User login successful",
  23: "User login failed",
  24: "User logout successful",
  25: "User logout failed",
};

const result = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

// ** Functions
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600s",
  });
}

function refreshAccessToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

// ** Routes
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database based on the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(result(false, message[4], null));
    }

    // Verify the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json(result(false, message[11], null));
    }

    // User authentication successful, generate tokens
    const accessToken = generateAccessToken({ email: user.email });
    const refreshToken = refreshAccessToken({ email: user.email });
    const lastLogin = Date.now();

    // Update the user's tokens in the database
    user["access-token"] = accessToken;
    user["refresh-token"] = refreshToken;
    user["last-login"] = lastLogin;
    await user.save();

    // For this example, we will simply return it in the response
    res.json(result(true, message[22], { userData: user }));
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json(result(false, message[23], null));
  }
});

router.delete("/logout", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json(result(false, message[17], null));
  }

  // update the user's tokens in the database
  try {
    const user = await User.findOne({ "refresh-token": refreshToken });

    // check if the refresh token is in the database
    if (!user) {
      return res.status(401).json(result(false, message[18], null));
    }

    user["access-token"] = null;
    user["refresh-token"] = null;
    user["last-logout"] = Date.now();
    await user.save();

    res.json(result(true, message[24], user));
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json(result(false, message[25], err));
  }
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json(result(false, message[17], null));
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(result(false, message[16], null));
    }
    const accessToken = generateAccessToken({ email: user.email });
    res.json(result(true, message[20], accessToken));
  });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists in the database based on the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(result(false, message[9], null));
    }

    // generate tokens
    const accessToken = generateAccessToken({ email: email });
    const refreshToken = refreshAccessToken({ email: email });

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds as needed

    // Create a new user in the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      "access-token": accessToken,
      "refresh-token": refreshToken,
    });
    await newUser.save();

    // For this example, we will simply return it in the response
    res.json(result(true, message[1], newUser));
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json(result(false, message[10], null));
  }
});

module.exports = router;
