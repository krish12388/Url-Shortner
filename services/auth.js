const jwt = require("jsonwebtoken");
const secretKey="krish@123";
function setUserSession( user) {
    const payload={
        id:user._id,
        email:user.email,
        name:user.userName
    }
    const token=jwt.sign(payload,secretKey)
    return token;
}
function getUserSession(token) {
    try{
        if(!token){
        return null;
    }
    return jwt.verify(token,secretKey);
    }catch(err){
        return null;
    }
}
function removeUserSession(sessionId) {
    
}
module.exports={setUserSession,getUserSession,removeUserSession}
