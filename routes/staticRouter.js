const express = require("express");
const router = express.Router();
const urlModal = require("../modals/url.modal");
router.get("/", async (req, res) => {
  console.log(req.user);
  if (!req.user) {
    return res.redirect("/login");
  }
  const allUrls = await urlModal.find({ createdBy: req.user._id });
  console.log(req.user._id);
  return res.render("home", { allUrls });
});

module.exports = router;
