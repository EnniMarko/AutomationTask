const fs = require("fs");
const { Options } = require("selenium-webdriver/chrome");
const { pathToFileURL } = require("url");
const webdriver = require('selenium-webdriver'),
    By = webdriver.By;
const driver = new webdriver.Builder()
    .forBrowser('chrome').setChromeOptions(Options)
    .build();
var y = driver.getExecutor();
let x = driver.get('http://www.google.com');
Promise.all([x.then(console.log("onGoogleNow!!"))]);
const googleLogoId = "hplogo"
function Run(screenshotPath) {
    try {
        driver.get('http://www.google.com').then(function () {
            let logoElement = driver.findElement(By.id(googleLogoId));
            logoElement.isDisplayed().then((isDisplayed) => {
                driver.takeScreenshot().
                then((base64EncodedPng) =>
                 SaveStringToFile(screenshotPath,base64EncodedPng));
                return isDisplayed;
            });
        });
    }
    finally { driver.close().then(() => console.log("The driver was closed")) }
}

function SaveStringToFile(filePath, encodedStr) {
fs.writeFile(filePath, encodedStr);
};
module.exports = {Run}