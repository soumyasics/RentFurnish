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
    returnAmount: {
        type: Number,
        // required: true,
    },
    paymentStatus: {
        type: Boolean,
        default: false,
    },
    deliveryDate: {
        type: Date,
    },
    confirmedDate:{
        type:Date,
    },
    inspectionStatus:{
        type:Boolean,
    },
    completionDate: {
        type: Date
    },
    completionStatus:{
        type: Boolean
    }
});

const Return = mongoose.model("returns", returnSchema);
module.exports = Return;