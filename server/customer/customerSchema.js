const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
    dropDups: true,

  },
  email: {
    type: String,
    unique: true,
    required: true,

    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("customer", userSchema);
