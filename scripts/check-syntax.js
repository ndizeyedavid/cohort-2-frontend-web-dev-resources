const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.join(__dirname, "..");
const ignoredDirectories = new Set([".git", "node_modules", ".github"]);

function collectFiles(directory, found = []) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (ignoredDirectories.has(entry.name)) {
                continue;
            }
            collectFiles(path.join(directory, entry.name), found);
        } else if (entry.name.endsWith(".js") && entry.name !== "jquery-3.7.1.min.js") {
            found.push(path.join(directory, entry.name));
        }
    }
    return found;
}

const files = collectFiles(root);
const failures = [];

for (const filePath of files) {
    try {
        execFileSync(process.execPath, ["--check", filePath], { stdio: "pipe" });
    } catch (error) {
        failures.push({
            file: path.relative(root, filePath).split(path.sep).join("/"),
            message: String(error.stderr).split("\n").slice(0, 3).join(" ").trim()
        });
    }
}

console.log(`Checked syntax of ${files.length} JavaScript files.`);

if (failures.length > 0) {
    console.error(`\nSyntax errors in ${failures.length} file(s):`);
    for (const failure of failures) {
        console.error(`  ${failure.file}: ${failure.message}`);
    }
    process.exit(1);
}

console.log("All JavaScript files parse cleanly.");
