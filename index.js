const express = require("express");
const {
  checkAuth,
  restrictTo
} = require("./middleware/authmiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoute = require("./routes/userRoute");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const mongoose = require("mongoose");


const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
mongoose
  .connect("mongodb://localhost:27017/urlshortner")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkAuth)
 
app.use("/",  staticRouter);
app.use("/url", restrictTo(["normal"]), urlRoute);
app.use("/user", userRoute);
app.use("/login", (req, res) => {
  res.render("login");
});
app.use("/signup", (req, res) => {
  res.render("signup");
});

app.listen(3000, () =>
  console.log("Server is running on port http://localhost:3000")
);
