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
  const existingUser = await users.findOne({ email, password });
  if (existingUser) {
    
    const token = setUserSession(existingUser);
    res.cookie("token", token);
    
    res.redirect("/url");
    return;
    
  }
  else {return res.render("login");}
}
module.exports = { HandleLogin };
