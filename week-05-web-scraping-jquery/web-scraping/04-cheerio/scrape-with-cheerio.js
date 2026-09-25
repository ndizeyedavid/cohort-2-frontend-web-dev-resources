const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const sourcePath = path.join(__dirname, "..", "local-blog", "index.html");
const html = fs.readFileSync(sourcePath, "utf8");
const $ = cheerio.load(html);

const posts = $(".post")
    .map((index, element) => {
        const post = $(element);

        return {
            position: index + 1,
            id: post.attr("data-id"),
            title: post.find(".post-title").text().trim(),
            url: post.find(".post-link").attr("href"),
            category: post.attr("data-category"),
            author: post.attr("data-author").replace(/^By /, ""),
            publishedAt: post.attr("data-date"),
            readTime: post.attr("data-read-time"),
            score: Number(post.attr("data-score")),
            tags: post.find(".tag").map((tagIndex, tag) => $(tag).text().trim()).get(),
            excerpt: post.find(".post-excerpt").text().replace(/\s+/g, " ").trim()
        };
    })
    .get();

const categoryCounts = posts.reduce((counts, post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
    return counts;
}, {});

console.log("Cheerio extraction");
console.log("=================");
console.log("Source:", sourcePath);
console.log("Articles:", posts.length);
console.log("Categories:", categoryCounts);
console.log("");

posts.forEach((post) => {
    console.log(`${String(post.position).padStart(2, "0")}. ${post.title}`);
    console.log(`    ${post.category} | ${post.author} | ${post.publishedAt}`);
});

console.log("");
console.log("High-scoring Web Engineering posts:");
posts
    .filter((post) => post.category === "Web Engineering" && post.score >= 90)
    .forEach((post) => console.log(`- ${post.title} (${post.score})`));
