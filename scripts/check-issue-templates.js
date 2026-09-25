const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const templateDir = path.join(root, ".github", "ISSUE_TEMPLATE");

const validTypes = new Set([
    "markdown",
    "input",
    "textarea",
    "dropdown",
    "checkboxes"
]);

const failures = [];

function report(message) {
    failures.push(message);
}

if (!fs.existsSync(templateDir)) {
    console.log("No issue template folder found. Skipping.");
    process.exit(0);
}

const files = fs.readdirSync(templateDir).filter((name) => name.endsWith(".md"));

if (files.length === 0) {
    report("no .md issue templates found in .github/ISSUE_TEMPLATE");
}

/**
 * Issue form files are YAML documents. GitHub requires the YAML keys to
 * start on the very first line. A stray HTML anchor or blank line at the
 * top silently breaks the template, so check that explicitly.
 */
function parseTemplate(name, contents) {
    const lines = contents.split(/\r?\n/);

    if (lines[0].trim() !== "" && !lines[0].startsWith("name:")) {
        report(
            `${name}: first line must be the "name:" key. Found: "${lines[0].slice(0, 40)}". ` +
                "A blank line or HTML before the YAML makes GitHub ignore the template."
        );
    }

    const bodyStart = contents.indexOf("\nbody:");
    if (bodyStart === -1) {
        report(`${name}: no "body:" key found`);
        return null;
    }

    return contents;
}

// A very small YAML reader that is enough for the fields we care about.
function readScalar(contents, key) {
    const match = contents.match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"));
    if (!match) {
        return null;
    }
    return match[1].trim().replace(/^["']|["']$/g, "");
}

function readList(contents, key) {
    const match = contents.match(new RegExp(`^${key}:[ \\t]*\\[(.*)\\]$`, "m"));
    if (!match) {
        return [];
    }
    return match[1]
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
}

function readBlockTypes(contents) {
    const types = [];
    const pattern = /^[ \t]*-[ \t]+type:[ \t]*([a-z]+)[ \t]*$/gm;
    let match;

    while ((match = pattern.exec(contents)) !== null) {
        types.push(match[1]);
    }

    return types;
}

for (const fileName of files) {
    const filePath = path.join(templateDir, fileName);
    const contents = fs.readFileSync(filePath, "utf8");

    if (!parseTemplate(fileName, contents)) {
        continue;
    }

    const name = readScalar(contents, "name");
    const description = readScalar(contents, "description");

    if (!name) {
        report(`${fileName}: missing "name"`);
    }
    if (!description) {
        report(`${fileName}: missing "description"`);
    }

    const title = readScalar(contents, "title");
    if (title) {
        report(
            `${fileName}: "title" is set to ${JSON.stringify(title)}. ` +
                "GitHub ignores a title prefix on issue forms, so it is not applied. Remove it to avoid confusion."
        );
    }

    const labels = readList(contents, "labels");
    if (labels.length === 0) {
        report(`${fileName}: no labels declared, so new issues get no triage label`);
    }

    const types = readBlockTypes(contents);

    if (types.length === 0) {
        report(`${fileName}: body has no fields, so the form would be blank`);
    }

    for (const type of types) {
        if (!validTypes.has(type)) {
            report(`${fileName}: unsupported field type "${type}"`);
        }
    }

    const fields = types.filter((type) => type !== "markdown");
    if (fields.length < 2) {
        report(`${fileName}: only ${fields.length} input field(s) found, which is not enough for a useful form`);
    }

    console.log(`ok  ${fileName}: "${name}" with ${types.length} block(s), labels [${labels.join(", ")}]`);
}

const configPath = path.join(templateDir, "config.yml");

if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, "utf8");

    if (!/^blank_issues_enabled:[ \t]*(true|false)[ \t]*$/m.test(config)) {
        report("config.yml: missing a valid blank_issues_enabled key");
    } else {
        const enabled = /blank_issues_enabled:[ \t]*true/.test(config);
        if (enabled) {
            report("config.yml: blank_issues_enabled is true, so the empty form is still offered");
        }
    }

    console.log("ok  config.yml");
} else {
    report("config.yml is missing");
}

console.log(`\nChecked ${files.length} issue template(s).`);

if (failures.length > 0) {
    console.error(`\nFound ${failures.length} problem(s):`);
    for (const failure of failures) {
        console.error(`  ${failure}`);
    }
    process.exit(1);
}

console.log("All issue templates are wired correctly.");
