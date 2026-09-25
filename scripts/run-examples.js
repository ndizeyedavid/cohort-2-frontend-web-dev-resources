const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.join(__dirname, "..");
const target = process.argv[2];

if (!target) {
    console.error("Usage: node scripts/run-examples.js <week-folder>");
    process.exit(1);
}

const ignoredDirectories = new Set([
    ".git",
    "node_modules",
    ".github",
    "scripts",
    "testing",
    "shared"
]);

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

function resolveStartDir(name) {
    const exact = path.join(root, name);
    if (fs.existsSync(exact)) {
        return exact;
    }

    const match = fs
        .readdirSync(root, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name.startsWith(name))
        .map((entry) => entry.name);

    if (match.length === 1) {
        return path.join(root, match[0]);
    }

    return null;
}

const startDir = resolveStartDir(target);

if (!startDir) {
    console.error(`Could not resolve a single folder for: ${target}`);
    process.exit(1);
}

// Scripts that need a browser or a live page, so they cannot run under Node.
const browserOnly = [
    "week-04-javascript/03-dom-manipulation",
    "week-05-web-scraping-jquery/01-jquery-selectors",
    "week-05-web-scraping-jquery/02-jquery-manipulation",
    "week-05-web-scraping-jquery/03-method-chaining",
    "week-05-web-scraping-jquery/04-event-handling",
    "week-05-web-scraping-jquery/web-scraping/05-playwright"
];

// Scripts covered by their own workflow step.
const handledSeparately = ["week-05-web-scraping-jquery/web-scraping/04-cheerio"];

function toRelative(filePath) {
    return path.relative(root, filePath).split(path.sep).join("/");
}

const candidates = collectFiles(startDir).filter((filePath) => {
    const relative = toRelative(filePath);

    if (browserOnly.some((folder) => relative.startsWith(`${folder}/`))) {
        return false;
    }

    if (handledSeparately.some((folder) => relative.startsWith(`${folder}/`))) {
        return false;
    }

    if (path.basename(filePath) === "demo.js") {
        return false;
    }

    return true;
});

let failed = 0;

for (const filePath of candidates) {
    const relative = path.relative(root, filePath).split(path.sep).join("/");
    const result = spawnSync(process.execPath, [filePath], { encoding: "utf8" });

    if (result.status !== 0) {
        failed += 1;
        console.error(`FAILED  ${relative}`);
        const firstLine = String(result.stderr).split("\n").find((line) => line.trim().length > 0);
        if (firstLine) {
            console.error(`        ${firstLine.trim()}`);
        }
    } else {
        console.log(`ok      ${relative}`);
    }
}

console.log(`\nRan ${candidates.length} example(s) in ${target}. ${failed} failed.`);

if (failed > 0) {
    process.exit(1);
}
