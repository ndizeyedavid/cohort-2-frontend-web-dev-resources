const fs = require("node:fs");
const path = require("node:path");

const sourcePath = path.join(__dirname, "..", "local-blog", "index.html");

function readHtml(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Source file not found: ${filePath}`);
    }

    return fs.readFileSync(filePath, "utf8");
}

const html = readHtml(sourcePath);

console.log("Source file:", sourcePath);
console.log("Characters:", html.length);
console.log("Lines:", html.split("\n").length);
console.log("Contains <article>:", html.includes("<article"));
console.log("First 80 characters:");
console.log(html.slice(0, 80));
