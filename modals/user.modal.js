const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true},
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true,
      unique:true
    },
    
})
const user = mongoose.model("users",userSchema)
module.exports=user;