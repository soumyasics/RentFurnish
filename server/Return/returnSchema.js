const mongoose = require("mongoose");
const { Schema } = mongoose;

const returnSchema = new Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true,
    },
    furnitureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "furnitures",
        required: true,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shops",
        required: true,
    },
    deliveryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deliveryagents",
    },
    returnDate: {
        type: Date,
    },
    returnStatus: {
        type: String,
        default: "Pending",
    },
    fineAmount: {
        type: Number,
        // required: true,
    },
    paymentStatus: {
        type: Boolean,
        default: false,
    },
    paymentDate: {
        type: Date
    },
    deliveryDate: {
        type: Date,
    },
    confirmedDate: {
        type: Date,
    },
    inspectionStatus: {
        type: String,
    },
    inspectionDate: {
        type: Date,
    },
    completionDate: {
        type: Date
    },
    completionStatus: {
        type: Boolean
    },
    totalRentDays:{
        type:Number

    },
    
    totalRentAmount:{
        type:Number
    },
    deviatedAmt:{
        type:Number
    },

});

const Return = mongoose.model("returns", returnSchema);
module.exports = Return;