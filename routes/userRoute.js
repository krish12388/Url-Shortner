const express = require("express");
const router = express.Router();  
const {HandleLogin}=require("../controllers/HandleLogin")
const {HandleSignup}=require("../controllers/handleSignup")
router.post("/",HandleSignup)
router.post("/login",HandleLogin)
module.exports=router