const { getUserSession } = require("../services/auth");
function checkAuth(req, res, next) {
  const tokenCookie = req.cookies?.token;
  console.log(tokenCookie);
  if (!tokenCookie) {
    req.user = null;
    next();
    return;
  }
  const token = tokenCookie
  const user = getUserSession(tokenCookie);
  req.user = user;
  next();
}
function restrictTo(roles){
  return (req, res, next) => {
    console.log(req.user);
    
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user.role)) {
      return res.end("unauthorised");
    }
    console.log(roles.includes(req.user.role));
    
    next();
  };
}

module.exports = { checkAuth,restrictTo };
