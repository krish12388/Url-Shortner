const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true
  },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true,
      unique:true
    },
    role:{
      type:String,
      default:"normal"
    }
    
})
const user = mongoose.model("users",userSchema)
module.exports=user;