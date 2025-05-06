const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // required field
  },
  lastName: {
    type: String,
    required: true, // required field
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures email uniqueness
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
