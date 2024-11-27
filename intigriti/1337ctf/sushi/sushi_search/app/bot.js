const puppeteer = require("puppeteer");

let browser;

const FLAG = process.env.FLAG || "INTIGRITI{fake_flag}";
const URL_HOST = process.env.URL_HOST || "http://127.0.0.1";

async function startBrowser() {
    if (browser) return;

    browser = await puppeteer.launch({
        headless: true,
        args: [
            "--disable-dev-shm-usage",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--no-gpu",
            "--disable-default-apps",
            "--disable-translate",
            "--disable-device-discovery-notifications",
            "--disable-software-rasterizer",
            "--disable-xss-auditor",
        ],
    });
}

async function visit(url) {
    if (!url) {
        return "URL is required.";
    }

    if (!url.startsWith(URL_HOST + "/")) {
        return `Only URLs starting with ${URL_HOST} are allowed.`;
    }

    await startBrowser();

    const context = await browser.createBrowserContext();
    const page = await context.newPage();

    const cookie = {
        name: "FLAG",
        value: FLAG,
        domain: new URL(URL_HOST).hostname,
        httpOnly: false,
    };

    try {
        await page.setCookie(cookie);
        await page.goto(url, { waitUntil: "networkidle2" });
        await context.close();
        return `Visited ${url} successfully.`;
    } catch (error) {
        await context.close();
        throw new Error(`Failed to visit ${url}: ${error.message}`);
    }
}

module.exports = { visit };
