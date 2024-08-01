const mongoose = require("mongoose")

const inspectionSchema = mongoose.Schema({
    returnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'returns',
        required: true
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
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true,
    },
    image1: {
        type: Object,
    },

    image2: {
        type: Object,

    },

    image3: {
        type: Object,

    },

    image4: {
        type: Object,

    },
    image5: {
        type: Object,

    },
    image6: {
        type: Object,

    },
    prodCondition: {
        type: String,
        required: true
    },
    inspectionStatus: {
        type: String,
        default: "pending",
        required: true
    },

    fineAmount: {
        type: Number,
    },
   
    deviatedAmt:{
        type:Number
    },
    finalAmt:{
        type:Number
    },
    payableAmt:{
            type:Number
        
    },adminProfit:{
        type:Number,
        
    }

})

const Inspection = mongoose.model("inspection", inspectionSchema)
module.exports = Inspection