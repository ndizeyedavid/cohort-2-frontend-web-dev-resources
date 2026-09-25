const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

async function scrapeDynamicPosts() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const fileUrl = pathToFileURL(path.join(__dirname, "dynamic-blog.html")).href;

    await page.goto(fileUrl);

    const initialPosts = page.locator(".post");
    await initialPosts.first().waitFor();
    console.log("Initial reports:", await initialPosts.count());

    await page.getByRole("button", { name: "Load more reports" }).click();
    await page.waitForFunction(() => document.querySelectorAll(".post").length === 9);
    console.log("Status:", await page.locator("#status").textContent());

    const reports = await page.locator(".post").evaluateAll((elements) => {
        return elements.map((element) => ({
            title: element.querySelector(".title")?.textContent.trim(),
            author: element.querySelector(".author")?.textContent.trim().replace(/^By /, ""),
            category: element.querySelector(".category")?.textContent.trim()
        }));
    });

    console.table(reports);
    await browser.close();
}

scrapeDynamicPosts().catch((error) => {
    console.error("Scrape failed:", error.message);
    process.exitCode = 1;
});
