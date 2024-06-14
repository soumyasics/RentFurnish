const mongoose = require("mongoose");

const deliveryAgentSchema = mongoose.Schema({
name: {
    type: String,
    required: true,
  },
  shopId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'shops',
    required:true
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
  address:{
    type: String,
    required: true,
  },
  vehicleType:{
    type: String,
    required: true,
  },
  vehicleNumber:{
    type: String,
    required: true,
  },
  deliveryArea:{
    type: String,
    required: true,
  },
  deliveryDistrict:{
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean,
    default:true
  },
  licenceNumber:{
    type: String,
    required: true,
  },
  image:{
    type:Object,
    required: true
  }
  
});
module.exports = mongoose.model("deliveryagents", deliveryAgentSchema);
