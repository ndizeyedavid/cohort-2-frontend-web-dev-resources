const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const ignoredDirectories = new Set([".git", "node_modules", ".github", "scripts"]);

function collectFiles(directory, found = []) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (ignoredDirectories.has(entry.name)) {
                continue;
            }
            collectFiles(path.join(directory, entry.name), found);
        } else if (entry.name.endsWith(".html")) {
            found.push(path.join(directory, entry.name));
        }
    }
    return found;
}

const files = collectFiles(root);
const problems = [];

function report(file, message) {
    problems.push(`${path.relative(root, file).split(path.sep).join("/")}: ${message}`);
}

for (const filePath of files) {
    const contents = fs.readFileSync(filePath, "utf8");
    const base = path.dirname(filePath);

    if (!/<html\s[^>]*lang="[^"]+"/.test(contents)) {
        report(filePath, 'missing lang attribute on <html>');
    }

    if (!/<meta\s+charset=/i.test(contents)) {
        report(filePath, "missing charset meta tag");
    }

    if (!/name="viewport"/.test(contents)) {
        report(filePath, "missing viewport meta tag");
    }

    if (!/<title>[^<]+<\/title>/.test(contents)) {
        report(filePath, "missing or empty <title>");
    }

    for (const image of contents.matchAll(/<img[^>]*>/g)) {
        if (!/\salt="/.test(image[0])) {
            report(filePath, `image without alt attribute: ${image[0].slice(0, 60)}`);
        }
    }

    const references = contents.matchAll(/(?:href|src)="([^"]+)"/g);
    for (const reference of references) {
        const value = reference[1];

        if (/^(https?:|mailto:|data:|#)/.test(value) || value === "") {
            continue;
        }

        const decoded = decodeURIComponent(value.split("#")[0]);
        if (!fs.existsSync(path.join(base, decoded))) {
            report(filePath, `local reference does not exist: ${value}`);
        }
    }
}

console.log(`Checked ${files.length} HTML files.`);

if (problems.length > 0) {
    console.error(`\nFound ${problems.length} issue(s):`);
    for (const problem of problems) {
        console.error(`  ${problem}`);
    }
    process.exit(1);
}

console.log("All HTML files pass the basic checks.");
