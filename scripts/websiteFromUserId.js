const puppeteer = require('puppeteer')

// const data = [
//     {
//         name: "figma",
//         userId: "figma"
//     },
//     {
//         name: "Figma Academy",
//         userId: "figmaacademy"
//     }
// ]

const websiteFromUserId = async (users) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    })
    const page = await browser.newPage()
    let userData = []

    for (user of users) {

        try {
            await page.goto(`https://twitter.com/${user.userId}`)
            // await page.waitForSelector('.css-4rbku5.css-18t94o4.css-901oao.css-16my406.r-1loqt21.r-4qtqp9.r-poiln3.r-1b7u577.r-bcqeeo.r-qvutc0', { delay: 1000 })

            const web = await page.evaluate(async () => {

                let website = document.querySelector('.css-4rbku5.css-18t94o4.css-901oao.css-16my406.r-1loqt21.r-4qtqp9.r-poiln3.r-1b7u577.r-bcqeeo.r-qvutc0').href
                return website
            })
            userData.push({
                name: user.name,
                userId: user.userId,
                websiteURL: [web]
            })
        } catch (err) {
            console.log(err.message)
        }

    }

    console.log(userData)
    return userData
}

// websiteFromUserId(data)

module.exports = websiteFromUserId