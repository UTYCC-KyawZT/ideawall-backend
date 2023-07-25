const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  "created-date": {
    type: Date,
    default: Date.now,
  },
  "last-login": {
    type: Date,
    default: Date.now,
  },
  "last-logout": {
    type: Date,
    default: Date.now,
  },
  "last-modified": {
    type: Date,
    default: Date.now,
  },
  "access-token": {
    type: String,
  },
  "refresh-token": {
    type: String,
  },
});

module.exports = mongoose.model("Users", UserSchema);
