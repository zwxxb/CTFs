const { chromium } = require('playwright');
const Redis = require('ioredis');
const connection = new Redis(6379, "127.0.0.1", {db: 0});

const BASE_URL = 'https://127.0.0.1:1337'
const FLAG = process.env.FLAG || 'flag{DUMMY}';
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;

const wait = r => new Promise(resolve => {
    setTimeout(resolve, r);
});

const visit = async url => {

    console.log('[+] started:', url);

    const browser = await chromium.launch({
        headless: false,
        args: [
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--js-flags="--noexpose_wasm"',
            '--ignore-certificate-errors'
        ]
    });

    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        // visit the bug URL
        await page.goto(`${url}/`);
        await wait(3000)
        // Login as admin
        await page.goto(`${BASE_URL}/login`);
        await page.type('#username', USERNAME);
        await page.type('#password', PASSWORD);
        await page.click('#submit');
        console.log("login done")
        console.log(page.url())
        // Store notes about the bug ;)
        await wait(2000)
        await page.goto(`${BASE_URL}/storage`);
        await page.type('#title', 'Bug Report');
        await page.type('#data', 'A bug was received from an external reporter. Check later');
        await page.type('#password', FLAG);
        await page.click('#encrypt-form > div:nth-child(4) > button');    
        // done!
        await wait(1000);
        await context.close();
    } catch (e) {
        console.error(e);
    }

    await browser.close();

    console.log('[+] done:', url);
};

const handle = async () => {
    console.log(await connection.ping());
    connection.blpop('report', 0, async (err, message) => {
        try {
            console.log(message)
            await visit(message[1]);
            setTimeout(handle, 10);
        } catch (e) {
            console.log("[-] " + e);
        }
    });
};

console.log('[+] running');
handle();