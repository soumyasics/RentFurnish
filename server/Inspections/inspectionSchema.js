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
    
    image1: {
        type: Object,
        // required: true
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
    }

})

const Inspection = mongoose.model("inspection", inspectionSchema)
module.exports = Inspection