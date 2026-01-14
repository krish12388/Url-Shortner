const { getUserSession } = require("../services/auth");

async function restrictLoginUserOnly(req, res, next) {
  const sessionId = req.headers["authorization"];
const token = sessionId?.split("Bearer")[1];
  const user = await getUserSession(token);
  if (!sessionId) {
    res.redirect("/login");
    return;
  }
  if (!user) {
    return res.redirect("/login");
  }
  
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const sessionId = req.headers["authorization"];
  const token = sessionId?.split("Bearer")[1];
  const user = await getUserSession(token);
  req.user = user;
  next();
}
module.exports = { restrictLoginUserOnly, checkAuth };
