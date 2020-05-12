const fs = require("fs")
require("chromedriver")
const swd = require("selenium-webdriver")
const By = swd.By
const until = swd.until
const credentials = require("./config/credentials.json")
const answers = require("./config/answers.json")
const url = require("./utils/urlBuilder").url

const driver = new swd.Builder().forBrowser("chrome").build()
driver.manage().window().maximize()

let internships = []

driver.get("https://internshala.com")
    .then(async () => {
        await driver.get(url)
        try {
            await driver.wait(until.elementLocated(By.className("subscription_alert")), 5000);
            await (await driver.findElement(By.id("no_thanks"))).click()
        }
        catch (err) {
            console.log(err)
        }
        finally {
            let companies = await driver.findElements(By.css('.company > h4 > a'))
            for (let i = 0; i < companies.length; i = i + 2) {
                let link = await companies[i].getAttribute("href")
                let profile = await companies[i].getText()
                let companyName = await companies[i + 1].getText()
                await internships.push({
                    "profile": profile,
                    "link": link,
                    "company": companyName,
                    "applied": "false"
                })
            }
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
                    await driver.wait(until.elementLocated(By.className("header_chat_notification link")), 15000)
                    for (let i = 0; i < internships.length; i++) {
                        if (internships[i].profile == "Web Development") {
                            await driver.get(internships[i].link)
                            await (await driver.findElement(By.className("btn btn-primary internship_detail_btn"))).click()
                            await (await driver.findElement(By.className("btn btn-primary education_incomplete"))).click()
                            await driver.wait(until.elementLocated(By.id("cover_letter")), 15000)
                            let assesmentQuestion1 = await driver.findElement(By.id('cover_letter'))
                            assesmentQuestion1.sendKeys(answers["1"])
                            let assesmentQuestion2 = await driver.findElement(By.css('textarea[placeholder="e.g. I am available full time in Pune for the next 6 months, but will have exams for 15 days in June."]'))
                            assesmentQuestion2.sendKeys(answers["2"])
                            await (await driver.findElement(By.css('input[type="submit"]'))).click()
                            console.log("Applied")
                        }
                    }
                })
        }
    })
    .catch((err) => {
        console.log(err)
        driver.close()
    })