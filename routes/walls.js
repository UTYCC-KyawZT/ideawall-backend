const express = require("express");
const router = express.Router();
const Wall = require("../models/Walls");

const message = {
  0: "Walls retrieved successfully",
  1: "Wall created successfully",
  2: "Wall updated successfully",
  3: "Wall deleted successfully",
  4: "Wall not found",
  5: "Wall not updated",
  6: "Wall not deleted",
  7: "Wall not created",
  8: "Wall not retrieved",
};

const result = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

// Get all the walls
router.get("/", async (req, res) => {
  try {
    const walls = await Wall.find();
    res.json(result(true, message[0], walls));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Get a specific wall
router.get("/:wallId", async (req, res) => {
  try {
    const wall = await Wall.findById(req.params.wallId);
    res.json(result(true, message[0], wall));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Create a wall
router.post("/", async (req, res) => {
  console.log(req.body);
  const wall = new Wall({
    name: req.body.name,
    description: req.body.description,
    share_user: req.body.share_user,
  });

  try {
    const savedWall = await wall.save();
    res.json(result(true, message[1], savedWall));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Delete a specific wall
router.delete("/:wallId", async (req, res) => {
  try {
    const removedWall = await Wall.deleteOne({ _id: req.params.wallId });
    res.json(result(true, message[3], removedWall));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Delete all walls
router.delete("/", async (req, res) => {
  try {
    const removedWalls = await Wall.deleteMany();
    res.json(result(true, message[3], removedWalls));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Update a specific wall
router.patch("/:wallId", async (req, res) => {
  try {
    const updatedWall = await Wall.updateOne(
      { _id: req.params.wallId },
      { $set: { name: req.body.name, description: req.body.description } }
    );
    res.json(result(true, message[2], updatedWall));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

module.exports = router;
