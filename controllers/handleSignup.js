const user = require("../modals/user.modal");
const urlModal = require("../modals/url.modal")
async function HandleSignup(req, res) {
  const allUrls=await urlModal.find({})
  const { userName, email, password } = req.body;
  if (userName == null || email == null) {
    res.send("Please provide all the details");
    return;
  }
  if (password.length < 8) {
    res.send("Password should be at least 8 characters long");
    return;
  }
  const createduser =await user.create({
    userName: userName,
    email: email,
    password: password,
  });
  if(createduser){
    return res.render("home",{allUrls});
  }
}
module.exports = { HandleSignup };
