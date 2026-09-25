const fs = require("node:fs");
const path = require("node:path");

const sourcePath = path.join(__dirname, "..", "local-blog", "index.html");
const html = fs.readFileSync(sourcePath, "utf8");

function cleanText(value) {
    return value
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim();
}

const titlePattern = /<h3 class="post-title">\s*<a[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/g;
const titles = [];

for (const match of html.matchAll(titlePattern)) {
    titles.push(cleanText(match[1]));
}

console.log(`Source: ${sourcePath}`);
console.log(`Titles found: ${titles.length}`);
console.log("");

titles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
});
