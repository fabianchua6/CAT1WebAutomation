const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.worldskills.sg/skills/skill-areas');


  const result = await page.evaluate(() => {
    let skillsFromWeb = document.querySelectorAll(".title");
    const skillsList = [...skillsFromWeb];
    return skillsList.map(s => s.innerHTML);
  });


  console.log(result);


  await browser.close();
})();