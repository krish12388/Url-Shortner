const nanoId = require("nano-id");
const url = require("../modals/url.modal");

const HandleurlCreate=async (req, res) => {
  const allUrls=await url.find({})
  const body = req.body;
  const originalUrl = body.url;
  if (!body) {
    return res.status(400).json({ message: "No data" });
  } else {
    const shortId = nanoId(8);
    await url.create({
      shorturl: shortId,
      redirectUrl: originalUrl,
      visithistory: [],
    });
    const result = "http://localhost:3000/url/" + shortId;
    return res
      .status(201)
      .render("home",{"shortenUrl":result,"allUrls":allUrls});
  }
}

const HandleurlRedirect =async (req, res) => {
  const { shorturl } = req.params;

  const entry = await url.findOneAndUpdate(
    { shorturl },
    { $push: { visithistory: { timestamp: Date.now() } } },
    { new: true }
  );
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  const redirectLink = "http://" + entry.redirectUrl;
  return res.redirect(redirectLink);
}

const HandleurlAnalytics=async (req, res) => {
  const { shorturl } = req.params;

  const entry = await url.findOneAndUpdate({ shorturl });
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  return res.status(200).json({ "total clicks": entry.visithistory.length });
}


module.exports={
  HandleurlCreate,
  HandleurlRedirect,
  HandleurlAnalytics
}