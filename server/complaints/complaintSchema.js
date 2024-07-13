const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema(
    {
       
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shops",
            required: true,
            },
            userId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: "customer",
              required: true
            
            },
          date:{
              type: Date,
              required: true,
            },
        
        complaint: {
            type: String,
            required:true

        },
        actionTaken: {
            type: String
           
        }
    })
const complaint = mongoose.model("complaints", complaintSchema);
module.exports = complaint;