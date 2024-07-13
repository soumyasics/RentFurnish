const mongoose = require("mongoose");

const deliveryUpdates = mongoose.Schema({
update: {
    type: String,
    required: true,
  },
  orderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'orders',
    required:true
  },
 
  custId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'customer',
    required:true
  },
  delAgentId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'deliveryagents',
    required:true
  },
  
  
},{timeStamps:true});
module.exports = mongoose.model("deliveryUpdates", deliveryUpdates);
