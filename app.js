require("chromedriver")
const swd = require("selenium-webdriver")
const By = swd.By
const until = swd.until
const credentials = require("./config/credentials.json")
const url = require("./utils/urlBuilder").url

const driver = new swd.Builder().forBrowser("chrome").build()
driver.manage().window().maximize()

let internships = []

driver.get("https://internshala.com")
    .then(() => {
        return driver.findElement(By.className("hidden-xs hidden-sm btn btn-primary home_page_login_button"))
    })
    .then((loginModal) => {
        loginModal.click()
    })
    .then(() => {
        return driver.findElement(By.name("email"))
    })
    .then((email) => {
        email.sendKeys(credentials.email)
        return driver.findElement(By.name("password"))
    })
    .then((pwd) => {
        pwd.sendKeys(credentials.password)
        return driver.findElement(By.id("modal_login_submit"))
    })
    .then((loginButton) => {
        loginButton.click()
    })
    .then(async () => {
        await driver.wait(until.elementLocated(By.className("header_chat_notification link")), 15000);
        await driver.get(url)
    })
    .catch((err) => {
        console.log(err)
        driver.close()
    })