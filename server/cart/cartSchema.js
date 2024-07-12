const mongoose= require("mongoose");

const cSchema=mongoose.Schema({

   
    custId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required:true
    },
    furnitureId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"furnitures",
        required:true
    },
    date:{
        type:Date
    }


    
      
});

module.exports=mongoose.model('carts',cSchema)