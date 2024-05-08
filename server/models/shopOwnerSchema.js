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
    }
});
module.exports=mongoose.model('shops',schema)

