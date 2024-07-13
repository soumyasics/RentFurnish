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
    noOfDays: {
        type: Number,
        required:true     
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
    },
    shopApproved:{
        type: String,
        default: 'Pending',
    },
    deliveryDate:{
type:Date

    },orderDate:{
        type:Date
    },
    deliveryCompletion:{
        type: Boolean,
        default: false,
    }
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
