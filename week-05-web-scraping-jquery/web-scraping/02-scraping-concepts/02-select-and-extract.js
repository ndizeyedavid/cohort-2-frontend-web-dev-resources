const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(
    path.join(__dirname, "..", "local-blog", "index.html"),
    "utf8"
);

function matchAll(pattern, source) {
    return Array.from(source.matchAll(pattern), (match) => match[1]);
}

const ids = matchAll(/data-id="([^"]+)"/g, html);
const categories = matchAll(/data-category="([^"]+)"/g, html);
const classes = matchAll(/<article class="([^"]+)/g, html);

console.log("ID selector equivalent:", ids.slice(0, 3));
console.log("Category selector equivalent:", categories.slice(0, 3));
console.log("Class selector equivalent:", classes.slice(0, 3));
console.log("");
console.log("A selector identifies a target. Extraction reads the value inside that target.");
console.log("Cheerio and Playwright make these selectors easier and more reliable than regular expressions.");
