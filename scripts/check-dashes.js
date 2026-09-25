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
        } else if (entry.name.endsWith(".js")) {
            found.push(path.join(directory, entry.name));
        }
    }

    return found;
}

const disallowed = [
    { character: "—", name: "em dash" },
    { character: "–", name: "en dash" }
];

const extensions = new Set([".md", ".html", ".css", ".js", ".json"]);

function collectContentFiles(directory, found = []) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (ignoredDirectories.has(entry.name)) {
                continue;
            }
            collectContentFiles(path.join(directory, entry.name), found);
        } else if (extensions.has(path.extname(entry.name))) {
            if (entry.name === "jquery-3.7.1.min.js") {
                continue;
            }
            found.push(path.join(directory, entry.name));
        }
    }

    return found;
}

const files = collectContentFiles(root);
const violations = [];

for (const filePath of files) {
    const contents = fs.readFileSync(filePath, "utf8");

    for (const { character, name } of disallowed) {
        let index = contents.indexOf(character);
        while (index !== -1) {
            const lineNumber = contents.slice(0, index).split("\n").length;
            const line = contents.split("\n")[lineNumber - 1];
            violations.push({
                file: path.relative(root, filePath).split(path.sep).join("/"),
                name,
                lineNumber,
                line: line.trim()
            });
            index = contents.indexOf(character, index + 1);
        }
    }
}

console.log(`Scanned ${files.length} files for em dashes and en dashes.`);

if (violations.length > 0) {
    console.error(`\nFound ${violations.length} disallowed character(s):`);
    for (const violation of violations) {
        console.error(`  ${violation.file}:${violation.lineNumber} [${violation.name}] ${violation.line}`);
    }
    process.exit(1);
}

console.log("No em dashes or en dashes found.");
