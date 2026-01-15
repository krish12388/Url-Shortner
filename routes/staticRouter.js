const express = require("express");
const router = express.Router();
const { restrictTo } = require("../middleware/authmiddleware");
const urlModal = require("../modals/url.modal");
router.get("/",  restrictTo(["normal"]),async (req, res) => {
  const allUrls = await urlModal.find({ createdBy: req.user._id });
  return res.render("home", { allUrls });
});

module.exports = router;
