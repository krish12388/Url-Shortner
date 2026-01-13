const {getUserSession} = require("../services/auth")
async function restrictLoginUserOnly(req,res,next){
    const sessionId=req.cookies.cookie;
    const user=await getUserSession(sessionId);
    if(!sessionId){
      res.redirect("/login");
      return;
    }
    if(!user){
        return res.redirect("/login");
    }
    req.user=user;
    next();
}
async function checkAuth(req,res,next){
    const sessionId=req.cookies.cookie;
    const user=await getUserSession(sessionId);
    req.user=user;
    next();
}
module.exports={restrictLoginUserOnly,checkAuth};
