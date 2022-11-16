const path = require('path')
const fs = require('fs/promises')
const userIdFromPost = require('./../../scripts/userIdFromPost')
const websiteFromUserId = require('../../scripts/websiteFromUserId')
const emailsFromWebsite = require('../../scripts/emailsFromWebsite')

const twitterEmailScraper = async(search, limit) => {
    const userId = await userIdFromPost(search, limit)
    const websites = await websiteFromUserId(userId)
    const emails = await emailsFromWebsite(websites)
    await fs.writeFile(path.join(__dirname, 'results', 'figma-100.json'), JSON.stringify(emails))
    console.log("Completed")

}

twitterEmailScraper('figma', 100)