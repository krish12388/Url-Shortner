const { getUserSession } = require("../services/auth");
function checkAuth(req, res, next) {
  const tokenCookie = req.cookies?.token;
  console.log(tokenCookie);
  if (!tokenCookie) {
    req.user = null;
    next();
    return;
  }
  const user = getUserSession(tokenCookie);
  req.user = user;
  next();
}
function restrictTo(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user.role)) {
      return res.end("unauthorised");
    }

    next();
  };
}

module.exports = { checkAuth, restrictTo };
