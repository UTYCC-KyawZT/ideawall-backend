const mongoose = require("mongoose");

const WallSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  share_user: {
    type: String,
  },
  "created-date": {
    type: Date,
    default: Date.now,
  },
  "last-modified": {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Walls", WallSchema);
