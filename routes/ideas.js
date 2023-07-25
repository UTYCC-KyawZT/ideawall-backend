const express = require("express");
const router = express.Router();
const Idea = require("../models/Ideas");
const Wall = require("../models/Walls");

// ** Variables
const message = {
  0: "Ideas retrieved successfully",
  1: "Idea created successfully",
  2: "Idea updated successfully",
  3: "Idea deleted successfully",
  4: "Idea not found",
  5: "Idea not updated",
  6: "Idea not deleted",
  7: "Idea not created",
  8: "Idea not retrieved",
  9: "Wall not found",
};

const result = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

// ** Routes
// Get all the ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(result(true, message[0], ideas));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Get a specific idea
router.get("/:ideaId", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.ideaId);
    res.json(result(true, message[0], idea));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Create an idea
router.post("/", async (req, res) => {
  // Check if wall id exists
  const wall = await Wall.findById(req.body.wall_id);
  if (!wall) return res.json(result(false, message[9], null));

  const idea = new Idea({
    name: req.body.name,
    wall_id: req.body.wall_id,
    notes: req.body.notes,
    share_user: req.body.share_user,
  });

  try {
    const savedIdea = await idea.save();
    res.json(result(true, message[1], savedIdea));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Delete a specific idea
router.delete("/:ideaId", async (req, res) => {
  try {
    const removedIdea = await Idea.deleteOne({ _id: req.params.ideaId });
    res.json(result(true, message[3], removedIdea));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Delete all ideas
router.delete("/", async (req, res) => {
  try {
    const removedIdeas = await Idea.deleteMany();
    res.json(result(true, message[3], removedIdeas));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

// Update a specific idea
router.patch("/:ideaId", async (req, res) => {
  try {
    const updatedIdea = await Idea.updateOne(
      { _id: req.params.ideaId },
      { $set: { name: req.body.name, notes: req.body.notes } }
    );
    res.json(result(true, message[2], updatedIdea));
  } catch (err) {
    res.json(result(false, err, err));
  }
});

module.exports = router;
