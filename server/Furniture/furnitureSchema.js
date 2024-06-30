const mongoose = require("mongoose");

const fSchema = mongoose.Schema({
name: {
    type: String,
    required: true,
  },
  shopId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'shops',
    required:true
  },
 
  category: {
    type: String,
    required: true,
  },
 
  description: {
    type: String,
    required: true,
  },
  condition:{
    type: String,
    required: true,
  },
  roomType:{
    type: String,
    required: true,
  },
  dimension:{
    type: String,
    required: true,
  },
  quantity:{
    type: String,
    required: true,
  },
 
  image1:{
    type:Object,
    required: true
  },
   
  image2:{
    type:Object,
    
  },
   
  image3:{
    type:Object,
 
  },
   
  image4:{
    type:Object,
    
  }
  
});
module.exports = mongoose.model("furnitures", fSchema);
