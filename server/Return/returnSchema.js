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
    completionDate: {
        type: String,
        default:"Not Returned",
    }
});

const Return = mongoose.model("returns", returnSchema);
module.exports = Return;