const mongoose = require("mongoose");
const user = require("../modals/user.modal");
const urlSchema = new mongoose.Schema(
  {
    shorturl: {
      type: String,
      unique: true,
    },
    redirectUrl: {
      type: String,
    },
    visithistory: [
      {
        timestamp: { type: Number },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
const url = mongoose.model("Url", urlSchema);

module.exports = url;
