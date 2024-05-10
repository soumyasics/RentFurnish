const mongoose= require("mongoose");

const schema=mongoose.Schema({
    shopname:{
        type:String,
              required:true,
           },
    phone:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    regno:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    buildingname:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        required:true,     
    },
    city:{
        type:String,
        required:true,     
    },
    state:{
        type:String,
        required:true,     
    },
    pincode:{
        type:Number,
        required:true,     
    },
    image:{
        type:Object,
        required: true
    },

   
});
module.exports=mongoose.model('shops',schema)

