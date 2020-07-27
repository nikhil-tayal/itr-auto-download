const puppeteer = require("puppeteer");
const $ = require("cheerio");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

const puppeteerOTPTrigger = async ({ username, password }) => {
  this.username = username;
  this.password = password;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www1.incometaxindiaefiling.gov.in/e-FilingGS/Registration/RegistrationHome.html?lang=eng");
  await Promise.all([page.waitForNavigation(), page.click(".personalDetails>div>a")]);
  await page.$eval(
    "#Login_userName",
    (el, username) => {
      return (el.value = username);
    },
    username
  );
  await page.$eval("#Login_password", (el, password) => (el.value = password), password);
  await page.evaluate(() => {
    document.querySelector("#otpLogin").checked = true;
  });
  this.page = page;
  // await page.screenshot({ path: "example.png" });
  await Promise.all([page.waitForNavigation(), page.click("#button1")]);
  await Promise.all([page.waitForNavigation(), page.click(".btnOrange")]); // it will generate the otp
  // let otp = await getOtpInput();
  //   await browser.close();
};

const puppeteerOTPVerification = async ({ otp }) => {
  let page = this.page;
  await page.$eval("#OTPLoginValidate_otp", (el, otp) => (el.value = otp), otp);
  await Promise.all([page.waitForNavigation(), page.click(".btnOrange")]);
  if ((await page.$(".btnOrange")) !== null) {
    await Promise.all([page.waitForNavigation(), page.click(".btnOrange")]);
  }
  const [myAccountButton] = await page.$x("//span[contains(., 'My Account')]");
  if (myAccountButton) {
    await myAccountButton.hover();
  }

  const [button] = await page.$x("//a[contains(., 'Download Pre-filled XML')]");
  if (button) {
    // await button.click();
    await Promise.all([page.waitForNavigation(), button.click()]);
  }
  await page.select('select[name="asYear"]', "2019"); // ITR YEAR selected 
  await page.select('select[name="formId"]', "ITR-1"); // ITR TYPE selected 

  
  await Promise.all([page.waitForNavigation(), page.click("#continueButton")]);  // Continue button to open POPUP

  await page.click("#UpdateContactDtls_0");  // Download XML 
  // await Promise.all([page.waitForNavigation(), page.click("#UpdateContactDtls_0")]);

  await page.waitFor(500);
  await page.click("#prefillConcentFlag"); // Check Box click
  let selector = 'input[name="CntinueBtn"]';
  await page.evaluate((selector) => document.querySelector(selector).click(), selector); 



  await page.screenshot({ path: "example.png" });
};

module.exports = {
  puppeteerOTPTrigger,
  puppeteerOTPVerification,
};
