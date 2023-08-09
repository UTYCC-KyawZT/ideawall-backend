const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcryptjs = require("bcryptjs");

// ** Variables
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
  9: "All users deleted successfully",
};

const result = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

// ** Routes
// Get all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(result(true, message[0], users));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Get a specific user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(result(true, message[0], user));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Create a user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const savedUser = await user.save();
    res.json(result(true, message[1], savedUser));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Update a user
router.patch("/:userId", async (req, res) => {
  const hashedPassword = await bcryptjs.hash(req.body.password, 10);
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json(result(false, message[4], null));
    }
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          "access-token": req.body["access-token"],
          "refresh-token": req.body["refresh-token"],
          "last-modified": Date.now(),
        },
      }
    );
    res.json(result(true, message[2], updatedUser));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Delete all users
router.delete("/", async (req, res) => {
  try {
    const removedUsers = await User.deleteMany();
    res.json(result(true, message[9], removedUsers));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Delete a user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(result(true, message[3], removedUser));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

module.exports = router;
