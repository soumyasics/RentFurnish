const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age:{
    type:Number,
          required:true,
       },
  phone: {
    type: Number,

    required: true,

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
  image: {
    type: Object,
  },
  imgurl: {
    type: String,
  },
});
module.exports = mongoose.model("customers", userSchema);
