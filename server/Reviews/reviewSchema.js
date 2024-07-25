const mongoose = require("mongoose");
const { Schema } = mongoose;
const rSchema = new Schema(
    {

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customer",
        },
        furnitureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "furnitures",
        },
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'shops',
        },
        date: {
            type: Date,
            required: true,
        },
        review: {
            type: String,
            required: true
        }

    })
const reviews = mongoose.model("reviews", rSchema);
module.exports = reviews;