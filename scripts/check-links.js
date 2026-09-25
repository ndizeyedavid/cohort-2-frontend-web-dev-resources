const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

const ignoredDirectories = new Set([".git", "node_modules", ".github"]);

function collectFiles(directory, matcher, found = []) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (ignoredDirectories.has(entry.name)) {
                continue;
            }
            collectFiles(path.join(directory, entry.name), matcher, found);
        } else if (matcher.test(entry.name)) {
            found.push(path.join(directory, entry.name));
        }
    }

    return found;
}

function toRelative(filePath) {
    return path.relative(root, filePath).split(path.sep).join("/");
}

const files = collectFiles(root, /\.(md|html|css|js|json)$/);

const failures = [];
let checked = 0;

for (const filePath of files) {
    if (filePath.endsWith("jquery-3.7.1.min.js")) {
        continue;
    }

    const contents = fs.readFileSync(filePath, "utf8");
    const linkPattern = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

    for (const match of contents.matchAll(linkPattern)) {
        const link = match[1];

        if (/^(https?:|mailto:|data:|#)/.test(link)) {
            continue;
        }

        const withoutAnchor = link.split("#")[0];
        if (withoutAnchor === "") {
            continue;
        }

        let decoded = withoutAnchor;
        try {
            decoded = decodeURIComponent(withoutAnchor);
        } catch {
            failures.push(`${toRelative(filePath)} -> ${link} (invalid encoding)`);
            continue;
        }

        const target = path.join(path.dirname(filePath), decoded);
        checked += 1;

        if (!fs.existsSync(target)) {
            failures.push(`${toRelative(filePath)} -> ${link}`);
        }
    }
}

console.log(`Checked ${checked} relative links across ${files.length} files.`);

if (failures.length > 0) {
    console.error("\nBroken relative links:");
    for (const failure of failures) {
        console.error(`  ${failure}`);
    }
    process.exit(1);
}

console.log("All relative links resolve.");
