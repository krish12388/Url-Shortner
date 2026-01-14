const users = require("../modals/user.modal");
const { v4: uuidv4 } = require("uuid");
const urlModal = require("../modals/url.modal");
const { setUserSession } = require("../services/auth");
async function HandleLogin(req, res) {
  const { email, password } = req.body;
  if (email == null || password == null) {
    res.send("Please provide all the details");
    return;
  }
  const createdUser = await users.findOne({ email, password }); 
  if (createdUser) {
    const allUrls = await urlModal.find({ createdBy:createdUser._id }); 
    const token = setUserSession(createdUser);
    res.cookie("cookie", token);
    return res.render("home", { allUrls });
  }
  return res.render("login");
}
module.exports = { HandleLogin };
