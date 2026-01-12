const user = require("../modals/user.modal");
const urlModal = require("../modals/url.modal")
async function HandleLogin(req,res){
  const allUrls=await urlModal.find({})
  const {email,password}=req.body;
  if(email==null || password==null){
    res.send("Please provide all the details")
    return;
  }
  const createdUser= await user.findOne({email,password})
  if(createdUser){
   return res.render("home",{allUrls})
  }
  return res.render("login")
}
module.exports={HandleLogin};
