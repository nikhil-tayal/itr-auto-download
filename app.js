const express = require("express");
const cors = require("cors");
const app = express();
const { puppeteerOTPTrigger, puppeteerOTPVerification } = require("./src/puppeteer");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hi");
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on Port${PORT}`);
});

app.post("/username-password", (req, res) => {
  puppeteerOTPTrigger(req.body);
});
app.post("/otp-verification", (req, res) => {
  puppeteerOTPVerification(req.body);
});
