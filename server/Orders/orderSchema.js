const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
      
    },
    address: {
        type: String,
      
    },
    contact: {
        type: String,
     
    },
    furnitureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "furnitures",
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    deliveryStatus:{
        type: Boolean,
        default: false,
    }
    ,
    paymentStatus:{
        type: Boolean,
        default: false,
    }
    ,
    deliveryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "deliveryagents",
    },
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "shops",
        required: true,
    },
    amount:{
        type:Number,
        required:true 
    }
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
