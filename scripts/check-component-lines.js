const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "UI", "src");
const LIMIT = 150;

if (!fs.existsSync(srcDir)) {
  console.log("UI/src not found. Skipping component line check.");
  process.exit(0);
}

const violations = [];
let checked = 0;

function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath);
            continue;
        }
        if (!entry.name.endsWith(".jsx")) continue;
        checked += 1;
        const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/).length;
        if (lines > LIMIT) {
            violations.push({
                file: path.relative(root, fullPath).split(path.sep).join("/"),
                lines,
            });
        }
    }
}

walk(srcDir);

console.log(`Checked ${checked} component file(s) against the ${LIMIT} line limit.`);

if (violations.length > 0) {
    console.error(`\n${violations.length} file(s) exceed ${LIMIT} lines:`);
    for (const violation of violations) {
        console.error(`  ${violation.file}: ${violation.lines} lines`);
    }
    console.error("\nSplit the file or move logic into a hook or service. See UI/AGENTS.md.");
    process.exit(1);
}

console.log("All components are within the line limit.");
