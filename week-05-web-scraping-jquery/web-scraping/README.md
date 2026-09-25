<a id="top"></a>

# Week 05 - Web Scraping Activities

**Prerequisites:** Week 04 - JavaScript Deep Dive

Web scraping is the process of collecting structured data from HTML, XML, JSON, or other machine-readable sources. The browser is a good place to inspect how a page is organized. A scraper then requests or opens that page, identifies useful elements, extracts their values, and cleans the values for an application.

The first four activities use a fictional local tech publication. This keeps the exercises safe, repeatable, and available without internet access. The Playwright activity is provided for local testing but was not installed or executed while preparing this repository.

---

## Scraping Structure

| #   | Folder                                               | What You Learn                                                              | How to Run                             |
| --- | ---------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------- |
| 1   | [01-simple-scraping](01-simple-scraping)             | Read a local HTML file and extract text with a regular expression           | `node simple-scraper.js`               |
| 2   | [02-scraping-concepts](02-scraping-concepts)         | Sources, selectors, extraction, cleaning, rate limits, and responsible use  | Run each small file with Node          |
| 3   | [03-blog-scraping-example](03-blog-scraping-example) | Turn a complete blog page into structured article records                   | `node scrape-blog.js`                  |
| 4   | [04-cheerio](04-cheerio)                             | Use CSS selectors with Cheerio instead of large regular expressions         | `npm install` then `npm run scrape`    |
| 5   | [05-playwright](05-playwright)                       | Use a real Chromium browser for JavaScript-rendered content and interaction | Install locally using the folder guide |

The shared practice site is [`local-blog/index.html`](local-blog/index.html). It contains 12 detailed technology articles with stable `data-*` attributes and reusable classes.

---

## The Practice Blog

Open [`local-blog/index.html`](local-blog/index.html) directly in a browser.

Stacktrace Journal is a fictional publication with articles about:

- Artificial Intelligence
- Web Engineering
- Security
- Data Systems
- Developer Tools

Each article includes stable scraping hooks:

```html
<article
  class="post"
  data-id="st-002"
  data-category="Web Engineering"
  data-author="David Nizeye"
  data-read-time="7 min"
  data-date="2026-09-22"
  data-score="94"
>
  <h3 class="post-title">
    <a class="post-link" href="#article-002">Article title</a>
  </h3>
  <p class="post-excerpt">Article summary</p>
  <span class="tag">Scraping</span>
</article>
```

The class names describe what the elements are. The `data-*` attributes hold useful values. This separation makes the page realistic and gives scrapers stable targets.

---

## 01 - Simple Scraping

**Folder:** [`01-simple-scraping`](01-simple-scraping)

**Run:**

```bash
cd week-05-web-scraping-jquery/web-scraping/01-simple-scraping
node simple-scraper.js
```

The script performs four basic actions:

```js
const fs = require("node:fs");
const path = require("node:path");

const sourcePath = path.join(__dirname, "..", "local-blog", "index.html");
const html = fs.readFileSync(sourcePath, "utf8");

const titles = Array.from(
  html.matchAll(/<h3 class="post-title">\s*<a[^>]*>([\s\S]*?)<\/a>/g),
);
```

1. Import Node's built-in file system module.
2. Build a path to the local HTML file.
3. Read the file as UTF-8 text.
4. Find all article titles and print them.

This example uses a regular expression because the target pattern is small and predictable. Regular expressions become difficult when you extract many fields from deeply nested HTML.

### What to learn

- A scraper does not need a browser to read an existing local HTML file.
- `matchAll()` returns every match of a global regular expression.
- Capture group `([\s\S]*?)` stores the useful value inside each match.
- The capture group should be as small as possible. A pattern that matches the whole page is difficult to maintain.

---

## 02 - Scraping Concepts

**Folder:** [`02-scraping-concepts`](02-scraping-concepts)

This folder separates the scraping pipeline into small files.

### `01-read-source.js`

Shows the source stage:

```js
const html = fs.readFileSync(sourcePath, "utf8");
```

In a real scraper, the source could come from a local file, an HTTP response, a saved API payload, or a browser-rendered page.

### `02-select-and-extract.js`

Shows the difference between selection and extraction:

- A selector identifies the target.
- Extraction reads the target's text or attribute.
- One target can contain several fields.

For example, the `.post` element contains the title, excerpt, tags, author, date, and category.

### `03-clean-and-normalize.js`

Raw page values are not always ready for an application.

The script demonstrates:

```js
"  CSS Grid   Patterns  " -> "CSS Grid Patterns"
"9 min" -> 9
"A node scraper" -> "a-node-scraper"
```

Cleaning includes:

- trimming whitespace
- collapsing repeated spaces
- converting numbers
- creating slugs
- handling missing values consistently

### `04-responsible-scraping.js`

Shows the idea of delay between tasks without making network requests.

A responsible scraper should:

1. Read the terms and permission rules.
2. Prefer an official API when one exists.
3. Collect only necessary data.
4. Delay between requests.
5. Identify the crawler when required.
6. Stop when access is denied.
7. Avoid bypassing authentication, paywalls, or technical restrictions.

Publicly visible content is not automatically free for unrestricted collection.

### Run the concept files

```bash
cd week-05-web-scraping-jquery/web-scraping/02-scraping-concepts

node 01-read-source.js
node 02-select-and-extract.js
node 03-clean-and-normalize.js
node 04-responsible-scraping.js
```

---

## 03 - Blog Scraping Example

**Folder:** [`03-blog-scraping-example`](03-blog-scraping-example)

**Run:**

```bash
cd week-05-web-scraping-jquery/web-scraping/03-blog-scraping-example
node scrape-blog.js
```

The script extracts 12 complete article records:

```js
{
    position: 1,
    id: "st-001",
    title: "The hidden cost of an always-on AI product",
    url: "#article-001",
    category: "Artificial Intelligence",
    author: "Nadia Uwimana",
    publishedAt: "2026-09-24",
    readTime: "9 min",
    score: 98,
    tags: ["LLM", "Cost", "Operations"],
    excerpt: "Inference bills do not tell the whole story..."
}
```

The pipeline is:

```text
Read HTML -> Find article blocks -> Extract fields -> Clean values -> Build records -> Print results
```

The script also calculates:

- total article count
- category counts
- number of authors
- average editorial score

### Try changing it

- Extract only `Artificial Intelligence` articles.
- Sort posts by `data-score`.
- Create a URL from the article title.
- Save the records as `posts.json`.
- Print posts published in September.

### Important limitation

This script demonstrates the full extraction process with regular expressions, but regex is not the best tool for deeply nested HTML. The next activity uses Cheerio and CSS selectors.

---

## 04 - Using Cheerio

**Folder:** [`04-cheerio`](04-cheerio)

Cheerio parses HTML into a structure that can be queried with CSS selectors. It is useful when the needed data is already present in the HTML source.

### Install and run

```bash
cd week-05-web-scraping-jquery/web-scraping/04-cheerio
npm install
npm run scrape
```

The `package.json` already declares Cheerio, so `npm install` downloads the locked dependencies.

### The main difference

Regex asks for text patterns:

```js
/<h3 class="post-title">([\s\S]*?)<\/h3>/;
```

Cheerio describes elements:

```js
const $ = cheerio.load(html);
$(".post");
$(".post-title").text();
$(".post").attr("data-category");
```

### Mapping the blog fields

| Blog target   | Cheerio code                               |
| ------------- | ------------------------------------------ |
| Every article | `$(".post")`                               |
| Title         | `post.find(".post-title").text().trim()`   |
| Link          | `post.find(".post-link").attr("href")`     |
| Category      | `post.attr("data-category")`               |
| Author        | `post.attr("data-author")`                 |
| Date          | `post.attr("data-date")`                   |
| Score         | `Number(post.attr("data-score"))`          |
| Tags          | `post.find(".tag").map(...).get()`         |
| Excerpt       | `post.find(".post-excerpt").text().trim()` |

### When to use Cheerio

Use Cheerio when:

- the content is in the initial HTML
- no clicking or typing is required
- you need reliable CSS selectors
- the page does not require browser JavaScript to reveal its content

For a live website, the HTML would usually come from an HTTP request:

```js
const response = await fetch(url);
const html = await response.text();
const $ = cheerio.load(html);
```

Only request websites that you are allowed to access, and follow their scraping rules.

---

## 05 - The Power of Playwright

**Folder:** [`05-playwright`](05-playwright)

Playwright controls a real browser. It can load pages, wait for JavaScript, click buttons, type text, take screenshots, and extract content after the page has changed.

**Important:** Playwright was not installed or executed while preparing this repository. Run the setup on your own computer when you reach this activity.

### Install Playwright

```bash
cd week-05-web-scraping-jquery/web-scraping/05-playwright
npm install playwright
```

### Install Chromium

```bash
npx playwright install chromium
```

The browser name is spelled `chromium`.

### Run the scraper

```bash
node scrape-dynamic.js
```

The local `dynamic-blog.html` page does not place all articles in its initial HTML. It creates six articles after 500 milliseconds, then creates three more when `Load more reports` is clicked.

The Playwright scraper:

1. opens Chromium in headless mode
2. waits for the first `.post`
3. counts the initial posts
4. clicks the load-more button
5. waits until nine posts exist
6. extracts every title, author, and category

### Core Playwright patterns

```js
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(url);

await page.locator(".post").first().waitFor();
await page.getByRole("button", { name: "Load more reports" }).click();
await page.waitForFunction(
  () => document.querySelectorAll(".post").length === 9,
);

const posts = await page.locator(".post").evaluateAll((elements) => {
  return elements.map((element) => element.textContent.trim());
});

await browser.close();
```

### Cheerio or Playwright?

| Need                     | Cheerio | Playwright                          |
| ------------------------ | ------- | ----------------------------------- |
| Read initial HTML        | Yes     | Yes                                 |
| Use CSS selectors        | Yes     | Yes                                 |
| Execute page JavaScript  | No      | Yes                                 |
| Click buttons            | No      | Yes                                 |
| Type and submit forms    | No      | Yes                                 |
| Wait for dynamic content | Limited | Yes                                 |
| Take screenshots         | No      | Yes                                 |
| Installation             | Smaller | Larger because it manages a browser |

Start with the simplest tool that can complete the task.

Full setup and troubleshooting details are in [`05-playwright/README.md`](05-playwright/README.md).

---

## Complete Scraping Workflow

```text
1. Check permission       -> Is scraping allowed?
2. Choose the source      -> File, HTTP response, or rendered browser?
3. Discover the structure -> Inspect stable elements and attributes.
4. Select targets        -> Prefer IDs, stable classes, and data attributes.
5. Extract values        -> Read text and attributes.
6. Clean the data         -> Trim, convert, validate, and normalize.
7. Validate the result    -> Check counts, missing values, and duplicates.
8. Save carefully        -> JSON, CSV, database, or another approved format.
```

## Common Mistakes

- Scraping before checking a site's terms
- Sending requests too quickly
- Using one large regular expression for an entire page
- Selecting temporary CSS classes that change often
- Forgetting to check `response.ok` before using response data
- Trusting page text without validating or cleaning it
- Running browser automation when a simple file or API request is enough
- Closing a browser only on success, causing processes to remain after errors
- Scraping personal or sensitive data without a clear purpose and permission

## Learning Objectives

By the end of this scraping section you should be able to:

1. Read a local HTML source with Node's `fs` module
2. Explain source, selection, extraction, cleaning, and validation
3. Extract several related fields from repeating HTML structures
4. Explain when regular expressions are useful and when they become difficult
5. Use Cheerio to select elements and read text and attributes
6. Transform raw page data into structured JavaScript records
7. Explain responsible scraping and rate limiting
8. Install an npm package with `npm install <package-name>`
9. Install Playwright's browser with `npx playwright install chromium`
10. Explain when Playwright is more powerful than a static HTML parser

## References

- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Cheerio Documentation](https://cheerio.js.org/docs/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Installation](https://playwright.dev/docs/library)
- [MDN - Your first web crawler](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Introduction)
- [W3Schools - What is a Web Crawler](https://www.w3schools.com/whatis/whatis_web_crawling.asp)

## Final Practice

Complete the activities in this order:

1. Run the simple scraper and predict its output.
2. Run each concept file.
3. Scrape and inspect the 12 article records.
4. Install Cheerio and repeat the extraction with CSS selectors.
5. Install Playwright and Chromium, then run the dynamic example.
6. Change the target data and write one question your scraper should answer.

Do not move to another website until you understand how to check permissions and use an API when one is available.

---

[Back to top](#top)
