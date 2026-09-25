const rawRecords = [
    { title: "  CSS Grid   Patterns  ", category: "Web Engineering", readTime: "7 min" },
    { title: "A node scraper", category: "Developer Tools", readTime: "5 min" },
    { title: "SQL indexing", category: "Data Systems", readTime: "9 min" }
];

function cleanText(value) {
    return value.replace(/\s+/g, " ").trim();
}

function toSlug(value) {
    return value
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function toNumber(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
}

const normalizedRecords = rawRecords.map((record) => ({
    ...record,
    title: cleanText(record.title),
    slug: toSlug(record.title),
    readMinutes: toNumber(record.readTime)
}));

console.table(normalizedRecords);
console.log("Cleaning changes raw page text into predictable application data.");
