const sessionIdToUserMap = new Map();
function setUserSession(sessionId, user) {
    sessionIdToUserMap.set(sessionId, user);
}
function getUserSession(sessionId) {
    return sessionIdToUserMap.get(sessionId);
}
function removeUserSession(sessionId) {
    sessionIdToUserMap.delete(sessionId);
}
module.exports={setUserSession,getUserSession,removeUserSession}
