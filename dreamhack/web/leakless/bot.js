const puppeteer = require('puppeteer-core');

const visit = async (url, ADMIN_ID, ADMIN_PS, FLAG) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
			executablePath: '/usr/bin/google-chrome',
			args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--incognito', '--js-flags=--noexpose_wasm,--jitless',]
		});
		
        let page = await browser.newPage();
		
		await page.goto('http://localhost/login', { timeout: 1000, waitUntil: 'domcontentloaded' });
		await page.evaluate((ADMIN_ID, ADMIN_PS) => {
			document.querySelector('#username').value = ADMIN_ID;
			document.querySelector('#password').value = ADMIN_PS;
            document.querySelector("#submit").click();
        }, ADMIN_ID, ADMIN_PS);
		await page.waitForTimeout(1000);
		
		await page.evaluate((FLAG) => {
			document.querySelector('#content').value = FLAG;
            document.querySelector("#submit").click();
        }, FLAG);
		await page.waitForTimeout(1000);
		
		await page.evaluate(() => {
            document.querySelector("#logoutButton").click();
        });
		await page.waitForTimeout(1000);
		
		let page2 = await browser.newPage();
		await page.close();
		
		await page2.goto(url, { timeout: 5000, waitUntil: 'domcontentloaded' })
		await page2.waitForTimeout(5000);
		
		await page2.close();
        await browser.close();
        browser = null;
    } catch (err) {
        console.log('bot error', err);
    } finally {
        if (browser) await browser.close();
    }
};

if (process.argv?.length === 6)
	visit(
		Buffer.from(process.argv[2], 'base64').toString('utf8'),
		Buffer.from(process.argv[3], 'base64').toString('utf8'),
		Buffer.from(process.argv[4], 'base64').toString('utf8'),
		Buffer.from(process.argv[5], 'base64').toString('utf8')
	);