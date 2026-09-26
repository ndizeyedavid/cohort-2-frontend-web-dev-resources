const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "UI", "src", "data");

const failures = [];

function fail(message) {
    failures.push(message);
}

function read(name) {
    const filePath = path.join(dataDir, name);
    if (!fs.existsSync(filePath)) {
        fail(`missing file: ${name}`);
        return null;
    }
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        fail(`${name}: not valid JSON (${error.message})`);
        return null;
    }
}

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

const modules = read("modules.json");
const quizzes = read("quizzes.json");
const links = read("links.json");
const badges = read("badges.json");
const videos = read("videos.json");
const icebreakers = read("icebreakers.json");

const moduleIds = new Set();

if (Array.isArray(modules)) {
    const lessonIds = new Map();
    for (const module of modules) {
        if (!isNonEmptyString(module.id)) fail("a module is missing an id");
        else if (moduleIds.has(module.id)) fail(`duplicate module id: ${module.id}`);
        else moduleIds.add(module.id);

        if (typeof module.week !== "number") fail(`${module.id}: week must be a number`);
        if (!isNonEmptyString(module.title)) fail(`${module.id}: missing title`);
        if (!isNonEmptyString(module.summary)) fail(`${module.id}: missing summary`);
        if (!Array.isArray(module.lessons) || module.lessons.length === 0) {
            fail(`${module.id}: needs at least one lesson`);
            continue;
        }

        const seen = new Set();
        for (const lesson of module.lessons) {
            const key = `${module.id}/${lesson.id}`;
            if (!isNonEmptyString(lesson.id)) fail(`${key}: missing lesson id`);
            if (seen.has(lesson.id)) fail(`${key}: duplicate lesson id in module`);
            seen.add(lesson.id);
            if (!isNonEmptyString(lesson.title)) fail(`${key}: missing title`);
            if (!isNonEmptyString(lesson.summary)) fail(`${key}: missing summary`);
            if (typeof lesson.minutes !== "number" || lesson.minutes <= 0) {
                fail(`${key}: minutes must be a positive number`);
            }
            if (!isNonEmptyString(lesson.content)) fail(`${key}: missing content`);
        }
        lessonIds.set(module.id, seen);
    }
} else if (modules !== null) {
    fail("modules.json must be an array");
}

function checkModuleId(item, label) {
    if (!isNonEmptyString(item.moduleId)) fail(`${label}: missing moduleId`);
    else if (moduleIds.size && !moduleIds.has(item.moduleId)) {
        fail(`${label}: moduleId "${item.moduleId}" does not match any module`);
    }
}

if (Array.isArray(quizzes)) {
    const questionTypes = new Set(["mcq", "short", "code"]);
    for (const quiz of quizzes) {
        checkModuleId(quiz, `quiz ${quiz.id || "?"}`);
        if (!isNonEmptyString(quiz.id)) fail("a quiz is missing an id");
        if (!isNonEmptyString(quiz.title)) fail(`quiz ${quiz.id}: missing title`);
        if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
            fail(`quiz ${quiz.id}: needs questions`);
            continue;
        }
        const seen = new Set();
        for (const question of quiz.questions) {
            const label = `quiz ${quiz.id} question ${question.id || "?"}`;
            if (seen.has(question.id)) fail(`${label}: duplicate question id`);
            seen.add(question.id);
            if (!questionTypes.has(question.type)) {
                fail(`${label}: type must be mcq, short, or code`);
                continue;
            }
            if (!isNonEmptyString(question.prompt)) fail(`${label}: missing prompt`);
            if (!isNonEmptyString(question.explanation)) fail(`${label}: missing explanation`);
            if (question.type === "mcq") {
                if (!Array.isArray(question.options) || question.options.length < 2) {
                    fail(`${label}: mcq needs at least 2 options`);
                } else if (
                    !Number.isInteger(question.answer) ||
                    question.answer < 0 ||
                    question.answer >= question.options.length
                ) {
                    fail(`${label}: mcq answer must be a valid option index`);
                }
            } else if (!isNonEmptyString(String(question.answer ?? ""))) {
                fail(`${label}: needs an answer`);
            }
        }
    }
} else if (quizzes !== null) {
    fail("quizzes.json must be an array");
}

const linkKinds = new Set(["docs", "practice", "tool"]);

if (Array.isArray(links)) {
    for (const link of links) {
        checkModuleId(link, `link ${link.id || "?"}`);
        if (!isNonEmptyString(link.id)) fail("a link is missing an id");
        if (!isNonEmptyString(link.title)) fail(`link ${link.id}: missing title`);
        if (!isNonEmptyString(link.url) || !/^https?:\/\//.test(link.url)) {
            fail(`link ${link.id}: url must start with http(s)://`);
        }
        if (!linkKinds.has(link.kind)) fail(`link ${link.id}: kind must be docs, practice, or tool`);
        if (!isNonEmptyString(link.description)) fail(`link ${link.id}: missing description`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(link.verifiedOn || "")) {
            fail(`link ${link.id}: verifiedOn must be YYYY-MM-DD`);
        }
    }
} else if (links !== null) {
    fail("links.json must be an array");
}

if (badges && typeof badges === "object") {
    const ruleTypes = new Set(["lessonsCompleted", "quizzesPassed", "streakDays", "moduleCompleted"]);
    if (!Array.isArray(badges.badges)) fail("badges.json: badges must be an array");
    else {
        const seen = new Set();
        for (const badge of badges.badges) {
            if (seen.has(badge.id)) fail(`duplicate badge id: ${badge.id}`);
            seen.add(badge.id);
            if (!isNonEmptyString(badge.name)) fail(`badge ${badge.id}: missing name`);
            if (!isNonEmptyString(badge.description)) fail(`badge ${badge.id}: missing description`);
            if (!badge.rule || !ruleTypes.has(badge.rule.type)) {
                fail(`badge ${badge.id}: unknown rule type`);
            }
            if (
                badge.rule?.type === "moduleCompleted" &&
                moduleIds.size &&
                !moduleIds.has(badge.rule.target)
            ) {
                fail(`badge ${badge.id}: rule targets unknown module ${badge.rule.target}`);
            }
        }
    }
    if (!Array.isArray(badges.levels) || badges.levels.length === 0) {
        fail("badges.json: levels must be a non-empty array");
    } else {
        let previous = -1;
        for (const level of badges.levels) {
            if (typeof level.xp !== "number" || level.xp <= previous) {
                fail(`level ${level.level}: xp must increase with each level`);
            }
            previous = level.xp;
            if (!isNonEmptyString(level.name)) fail(`level ${level.level}: missing name`);
        }
    }
} else if (badges !== null) {
    fail("badges.json must be an object with badges and levels");
}

for (const [name, list] of [
    ["videos", videos],
    ["icebreakers", icebreakers],
]) {
    if (list === null) continue;
    if (!Array.isArray(list)) {
        fail(`${name}.json must be an array`);
        continue;
    }
    for (const item of list) {
        if (!isNonEmptyString(item.id)) fail(`a ${name} item is missing an id`);
        if (!isNonEmptyString(item.title)) fail(`${name} ${item.id}: missing title`);
        if (name === "videos") {
            checkModuleId(item, `video ${item.id}`);
            if (!isNonEmptyString(item.youtubeId)) fail(`video ${item.id}: missing youtubeId`);
        } else if (!isNonEmptyString(item.canvaEmbedUrl)) {
            fail(`icebreaker ${item.id}: missing canvaEmbedUrl`);
        }
    }
}

if (failures.length > 0) {
    console.error(`Found ${failures.length} data problem(s):`);
    for (const failure of failures) console.error(`  ${failure}`);
    process.exit(1);
}

console.log(
    `Data OK: ${modules.length} modules, ${quizzes.length} quizzes, ${links.length} links, ` +
        `${badges.badges.length} badges, ${badges.levels.length} levels, ` +
        `${videos.length} videos, ${icebreakers.length} icebreakers.`,
);
