const initialPosts = [
    { title: "Rendering a page is a negotiation", author: "Amina K.", category: "Browsers" },
    { title: "What a network trace reveals", author: "Jean B.", category: "Networking" },
    { title: "Queues make time visible", author: "Moses K.", category: "Architecture" },
    { title: "A practical guide to web workers", author: "Diane A.", category: "JavaScript" },
    { title: "Observability starts with boundaries", author: "Eric N.", category: "Operations" },
    { title: "Designing resilient retries", author: "Sandrine U.", category: "Reliability" }
];

const morePosts = [
    { title: "The browser event loop", author: "Yannick I.", category: "JavaScript" },
    { title: "Headless browsers as test tools", author: "Claudine M.", category: "Testing" },
    { title: "Measuring Core Web Vitals", author: "Alice R.", category: "Performance" }
];

function createPost(post) {
    const article = document.createElement("article");
    article.className = "post";

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = post.category;

    const title = document.createElement("h2");
    title.className = "title";
    title.textContent = post.title;

    const author = document.createElement("p");
    author.className = "author";
    author.textContent = `By ${post.author}`;

    article.append(category, title, author);
    return article;
}

function addPosts(posts) {
    const list = document.getElementById("post-list");
    posts.forEach((post) => list.appendChild(createPost(post)));
}

window.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(() => {
        addPosts(initialPosts);
        document.getElementById("status").textContent = `${initialPosts.length} reports loaded.`;
    }, 500);

    document.getElementById("load-more").addEventListener("click", () => {
        document.getElementById("status").textContent = "Loading more reports...";
        window.setTimeout(() => {
            addPosts(morePosts);
            document.getElementById("status").textContent = `${initialPosts.length + morePosts.length} reports loaded.`;
        }, 500);
    });
});
