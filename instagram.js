const fs = require('fs');
const puppeteer = require('puppeteer');
const BASE_URL = 'https://instagram.com';
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`
module.exports =  instagram = {
    browser: null,
    page: null,
    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless: false
        })
        instagram.page = await instagram.browser.newPage();

        await instagram.page.goto(BASE_URL, {waitUntil: 'networkidle2'})

    },
    login: async (username, password) => {
        await instagram.page.goto(BASE_URL, {waitUntil: 'networkidle2'})
        await instagram.page.waitFor(1000)
         let accbtn = await instagram.page.$x('//button[contains(text(), "Akceptuję")]')
         accbtn[0].click()
         await instagram.page.waitFor(1000)
        await instagram.page.type('input[name="username"]', username, {delay:50})
        await instagram.page.type('input[name="password"]', password, {delay:50})

        //Click on login button
        let loginbtn= await instagram.page.$x('//div[contains(text(), "Zaloguj się")]')
        loginbtn[0].click()
        await instagram.page.waitFor(1000)
        const stream = fs.createWriteStream("messages.txt", {flags:'a'})
        stream.write("LOGGED IN"+'\n');
    },
    likeTagsProcess: async (tags=[], likes) => {
       
            await instagram.page.goto(`https://www.instagram.com/explore/tags/l4l/`)
            await instagram.page.waitFor(1000)
            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]')
        
        for (let i = 0; i < 3; i++) {
           
            likes += 1;
                let post = posts[i]

                await post.click()

                // await instagram.page.waitFor('span[id="react-root"][aria-hidden="true"]')
                await instagram.page.waitFor('svg[aria-label="Lubię to!"]')
                await instagram.page.waitFor(2000)
                await instagram.page.click('svg[aria-label="Lubię to!"]')
                await instagram.page.waitFor(2000)
                await instagram.page.click('svg[aria-label="Zamknij"]')   
                const stream = fs.createWriteStream("messages.txt", {flags:'a'})
        stream.write("LIKED" +'\n');         
        }
    }

}
