const user = require("../modals/user.modal");
const { v4: uuidv4 } = require('uuid');
const urlModal = require("../modals/url.modal")
const {setUserSession} = require("../services/auth")
async function HandleLogin(req,res){
  const allUrls=await urlModal.find({})
  const {email,password}=req.body;
  if(email==null || password==null){
    res.send("Please provide all the details")
    return;
  }
  const createdUser= await user.findOne({email,password})
  if(createdUser){
    const sessionId=uuidv4()
    setUserSession(sessionId,createdUser)
    res.cookie("cookie",sessionId)
    console.log(sessionId)
   return res.render("home",{allUrls})
  }
  return res.render("login")
}
module.exports={HandleLogin};
