const mongoose= require('mongoose')
const userschema =mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        
    },
    phonenumber:{
        type:Number,
    },
},
{collection :"users"}
);
const usermodel =mongoose.model("user",userschema)
module.exports=usermodel;