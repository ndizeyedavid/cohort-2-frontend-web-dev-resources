const fs = require("node:fs");
const path = require("node:path");

const sourcePath = path.join(__dirname, "..", "local-blog", "index.html");
const html = fs.readFileSync(sourcePath, "utf8");

function cleanText(value) {
    return value
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim();
}

function firstMatch(source, pattern) {
    const match = source.match(pattern);
    return match ? cleanText(match[1]) : null;
}

function getAttribute(source, attribute) {
    return firstMatch(source, new RegExp(`${attribute}="([^"]+)"`));
}

function getTags(articleHtml) {
    return Array.from(articleHtml.matchAll(/<span class="tag">([^<]+)<\/span>/g), (match) => cleanText(match[1]));
}

function toIsoDate(value) {
    return value ? new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) : null;
}

const articlePattern = /<article class="post[\s\S]*?<\/article>/g;
const posts = Array.from(html.matchAll(articlePattern), (match, index) => {
    const articleHtml = match[0];
    const excerptHtml = firstMatch(articleHtml, /<p class="post-excerpt">([\s\S]*?)<\/p>/) || "";

    return {
        position: index + 1,
        id: getAttribute(articleHtml, "data-id"),
        title: firstMatch(articleHtml, /<h3 class="post-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/),
        url: firstMatch(articleHtml, /<h3 class="post-title">[\s\S]*?<a class="post-link" href="([^"]+)"/),
        category: getAttribute(articleHtml, "data-category"),
        author: getAttribute(articleHtml, "data-author").replace(/^By /, ""),
        publishedAt: toIsoDate(getAttribute(articleHtml, "data-date")),
        readTime: getAttribute(articleHtml, "data-read-time"),
        score: Number(getAttribute(articleHtml, "data-score")),
        tags: getTags(articleHtml),
        excerpt: cleanText(excerptHtml)
    };
});

const categoryCounts = posts.reduce((counts, post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
    return counts;
}, {});

const authors = [...new Set(posts.map((post) => post.author))].sort();
const averageScore = Math.round(
    posts.reduce((total, post) => total + post.score, 0) / posts.length
);

console.log("Stacktrace Journal extraction");
console.log("=============================");
console.log("Source:", sourcePath);
console.log("Articles:", posts.length);
console.log("Authors:", authors.length);
console.log("Average editorial score:", averageScore);
console.log("Categories:", categoryCounts);
console.log("");

posts.forEach((post) => {
    console.log(`${String(post.position).padStart(2, "0")}. [${post.category}] ${post.title}`);
    console.log(`    ${post.author} | ${post.publishedAt} | ${post.readTime} | ${post.tags.join(", ")}`);
});

console.log("");
console.log("First article as structured data:");
console.log(posts[0]);
