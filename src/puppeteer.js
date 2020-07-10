const puppeteer = require("puppeteer");
const $ = require("cheerio");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www1.incometaxindiaefiling.gov.in/e-FilingGS/Registration/RegistrationHome.html?lang=eng");
  await Promise.all([page.waitForNavigation(), page.click(".personalDetails>div>a")]);
  await page.screenshot({ path: "example.png" });
  await page.$eval("#Login_userName", (el) => (el.value = "BDIPT4002P"));
  await page.$eval("#Login_password", (el) => (el.value = "Tayal@741852@"));
  await page.evaluate(() => {
    document.querySelector("#otpLogin").checked = true;
  });
  await Promise.all([page.waitForNavigation(), page.click("#button1")]);
  await Promise.all([page.waitForNavigation(), page.click(".btnOrange")]);
  
  //   await browser.close();
})();

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.incometaxindiaefiling.gov.in/home");
//   let html = await page.evaluate(() => document.body.innerHTML);
//   await page.click(".ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-icon-only.ui-dialog-titlebar-close");
//   await Promise.all([page.waitForNavigation(),  page.click(".sec_btn")]);
//   await page.screenshot({ path: "example.png" });

//   await browser.close();
// })();
