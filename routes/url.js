const express = require("express");
const { HandleurlCreate, HandleurlRedirect, HandleurlAnalytics } = require("../controllers/Handleurl");
const router = express.Router();
router.use(express.json());
router.post("/", HandleurlCreate);
router.get("/:shorturl", HandleurlRedirect);
router.get("/analytics/:shorturl", HandleurlAnalytics);
module.exports = router;
