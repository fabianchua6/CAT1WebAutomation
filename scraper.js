const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#user_login';
const PASSWORD_SELECTOR = '#pwd';
const CTA_SELECTOR = '#wp-submit';
const DOTENV = require('dotenv');

async function startBrowser() {
    const browser = await puppeteer.launch({slowMo:30 }); //slowmo 30ms to ensure credentials are entered in a timely manner
    const page = await browser.newPage();
    return { browser, page };
}

async function closeBrowser(browser) {
    return browser.close();
}

async function playTest(url) {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 1020 });
    await page.goto(url);
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(C.username);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(C.password);
    await page.click(CTA_SELECTOR);
    await page.goto(C.scrap_url);

    await page.screenshot({ path: 'weather.png' });
    await closeBrowser(browser);



    //await browser.waitForTarget(()=> false);
}

(async () => {
    DOTENV.config();
    await playTest(C.login_url);
    process.exit(1);
})();