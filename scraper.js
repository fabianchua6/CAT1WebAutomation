const puppeteer = require('puppeteer'); // main library for web scrapping
const C = require('./constants'); //contains all the environmental variables

//CSS SELECTOR for username, password textbox and login button on targeted website
const USERNAME_SELECTOR = '#user_login'; 
const PASSWORD_SELECTOR = '#pwd';
const CTA_SELECTOR = '#wp-submit';


async function startBrowser() {
    const browser = await puppeteer.launch({ slowMo: 30 }); //slowmo 30ms to ensure credentials are entered in a timely manner
    const page = await browser.newPage();
    return { browser, page };
}

async function closeBrowser(browser) {
    return browser.close();
}

// core function to scrap CAT 1 details
async function scrapWeb(url) {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 1020 });

    // perform series of automation for login
    await page.goto(url);
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(C.username);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(C.password);
    await page.click(CTA_SELECTOR);

    // go to CAT 1 related URL upon logging in successfully
    await page.goto(C.scrap_url);

    // snap a screenshot of the CAT 1 overview
    await page.screenshot({ path: 'weather.png' });

    // ends the scrapping session
    await closeBrowser(browser);


    //await browser.waitForTarget(()=> false);
}

(async () => {
    // start scraping by logging in
    await scrapWeb(C.login_url);
    process.exit(1);
})();