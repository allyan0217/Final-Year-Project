const mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        
    }
},{
    timestamps:true
})

const User=mongoose.model('userInfo',UserSchema)

module.exports=User