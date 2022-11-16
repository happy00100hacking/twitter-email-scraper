const delay = ms => new Promise(res => setTimeout(res, ms));
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs/promises')

const login = async (name, password) => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        const page = await browser.newPage()
        await page.goto('https://twitter.com/i/flow/login')
        await page.waitForSelector('input[autocomplete="username"]', { delay: 10000 })
        await page.type('input[autocomplete="username"]', name)
        await page.click('.css-18t94o4.css-1dbjc4n.r-sdzlij.r-1phboty.r-rs99b7.r-ywje51.r-usiww2.r-2yi16.r-1qi8awa.r-1ny4l3l.r-ymttw5.r-o7ynqc.r-6416eg.r-lrvibr.r-13qz1uu')
        await page.waitForSelector('input[autocomplete="current-password"]', { delay: 10000 })
        await page.type('input[autocomplete="current-password"]', password, { delay: 200 })
        await page.click('div[data-testid="LoginForm_Login_Button"]')
        await delay(2000)
        const cookies = await page.cookies()
        console.log(cookies)
        await fs.writeFile(path.join(__dirname, "cookies.json"), JSON.stringify(cookies))
        console.log("completed")
    } catch (err) {
        console.log(err.message)
    }
}

// login()