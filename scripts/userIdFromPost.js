const fs = require('fs/promises')
const path = require('path')
// const puppeteer = require('puppeteer-extra')
const puppeteer = require('puppeteer')
const delay = require('./delay')


const uidFromPost = async (search, limit) => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })
    const page = await browser.newPage()
    const URL = 'https://twitter.com/search?q=' + encodeURIComponent(search) + '&src=typed_query'
    console.log('OPENED SUCCESSFULLY :', URL)
    await page.goto(URL)
    let users = []
    let scrollTo = 1000
    let userPrevLength = 0
    let repeatValue = 0
    while (limit > users.length) {
        console.log(users.length, "users scraped")
        tmpUsers = await page.evaluate(() => {
            let tmpData = []
            let arr = Array.from(document.querySelectorAll('.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l'))
            for (x of arr) {


                tmpData.push({
                    name: x.textContent,
                    userId: x.href.split('/')[3]
                })
            }
            return tmpData
        })

        users = [...users, ...tmpUsers]

        if (users.length > 0) {
            users = users.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.userId === value.userId
                ))
            )
        }


        await page.evaluate(`window.scrollTo(0, ${scrollTo})`)
        scrollTo += 1000
        await delay(2000)

       
        console.log("Repeat Value :", repeatValue)
      
        if(userPrevLength == users.length){
            repeatValue++
        }else{
            repeatValue = 0
            userPrevLength = users.length
        }

        if (repeatValue == 7) return
    }
    browser.close()
    console.log("Users Scraped :",users.length)
    return users
}




// uidFromPost('figma', 1000)


module.exports = uidFromPost