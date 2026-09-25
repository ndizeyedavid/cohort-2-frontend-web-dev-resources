# Week 05 - jQuery and Web Scraping

**Prerequisites:** Week 04 - JavaScript Deep Dive
**Assessment:** Non-graded practice

Week 05 has two connected parts:

1. **jQuery** for selecting and changing browser elements with less repetitive JavaScript.
2. **Web scraping** for reading useful data from HTML and controlling pages that create content in the browser.

The examples use local files and a fictional publication. This makes the activities safe, repeatable, and usable without internet access.

> **Important:** Check a website's terms, permissions, `robots.txt`, and available APIs before collecting data. Publicly visible content is not automatically unrestricted for scraping.

---

## Quick Start

### Run the jQuery activities

Open any of these files directly in a browser:

```text
week-05-web-scraping-jquery/
├── 01-jquery-selectors/index.html
├── 02-jquery-manipulation/index.html
├── 03-method-chaining/index.html
└── 04-event-handling/index.html
```

The jQuery library is stored locally at:

```text
shared/jquery-3.7.1.min.js
```

### Run the scraping activities

Open a terminal from the project root:

```bash
cd week-05-web-scraping-jquery/web-scraping

node 01-simple-scraping/simple-scraper.js
node 02-scraping-concepts/01-read-source.js
node 02-scraping-concepts/02-select-and-extract.js
node 02-scraping-concepts/03-clean-and-normalize.js
node 02-scraping-concepts/04-responsible-scraping.js
node 03-blog-scraping-example/scrape-blog.js
```

For Cheerio:

```bash
cd 04-cheerio
npm install
npm run scrape
```

For Playwright, follow [`web-scraping/05-playwright/README.md`](web-scraping/05-playwright/README.md). Playwright is not installed or executed in this repository.

---

## Repository Map

```text
week-05-web-scraping-jquery/
├── README.md
├── shared/
│   └── jquery-3.7.1.min.js
├── 01-jquery-selectors/
├── 02-jquery-manipulation/
├── 03-method-chaining/
├── 04-event-handling/
└── web-scraping/
    ├── README.md
    ├── local-blog/
    │   ├── index.html
    │   └── style.css
    ├── 01-simple-scraping/
    ├── 02-scraping-concepts/
    ├── 03-blog-scraping-example/
    ├── 04-cheerio/
    │   ├── package.json
    │   ├── package-lock.json
    │   └── scrape-with-cheerio.js
    └── 05-playwright/
        ├── README.md
        ├── dynamic-blog.html
        ├── demo.js
        ├── style.css
        └── scrape-dynamic.js
```

---

# Part 1: jQuery

## What Is jQuery?

jQuery is a JavaScript library that provides shorter methods for:

- finding elements
- reading and changing content
- changing classes and styles
- creating elements
- handling events

jQuery does not replace JavaScript. It provides a convenient layer on top of the browser DOM API.

## jQuery Learning Path

| # | Activity | Run it | Main concepts |
|---|----------|--------|---------------|
| 1 | [jQuery Selectors](01-jquery-selectors) | Open `index.html` | IDs, classes, attributes, tags, nested selectors, `.each()` |
| 2 | [jQuery Manipulation](02-jquery-manipulation) | Open `index.html` | `.text()`, `.html()`, `.val()`, `.attr()`, `.css()`, `.addClass()`, `.append()`, `.remove()` |
| 3 | [Method Chaining](03-method-chaining) | Open `index.html` and click `Run chain` | Returning collections, chaining, readable method sequences |
| 4 | [Event Handling](04-event-handling) | Open `index.html` | `.on()`, event objects, `.val()`, event delegation, dynamic buttons |

---

## 1. jQuery Selectors

Open [`01-jquery-selectors/index.html`](01-jquery-selectors/index.html).

A selector finds elements. jQuery uses CSS-like syntax:

```js
$("#featured-card");
$(".course-card");
$("[data-level]");
$(".course-grid .course-card");
$("button");
```

| Selector | Meaning |
|----------|---------|
| `#id` | Selects one element by ID |
| `.class` | Selects every matching class |
| `element` | Selects elements by tag name |
| `[attribute]` | Selects elements with an attribute |
| `parent child` | Selects matching descendants |
| `:first`, `:last` | Selects a position-based match |

A jQuery selection is a collection:

```js
const cards = $(".course-card");
console.log(cards.length);
```

Common inspection methods:

```js
$(".course-card").length;
$(".course-card").first().text();
$(".course-card").eq(1).text();
$(".course-card").find("h3").text();
$(".course-card").each(function (index, element) {
    console.log(index, $(element).text());
});
```

### Try this

1. Open the activity.
2. Click each selector button.
3. Watch the matching cards receive the orange outline.
4. Open DevTools with `F12` and inspect the console output.

---

## 2. jQuery Manipulation

Open [`02-jquery-manipulation/index.html`](02-jquery-manipulation).

### Content

```js
$("#preview-title").text("Plain text");
$("#preview-copy").html("Text with <strong>HTML</strong>");
```

Use `.text()` by default. Use `.html()` only when you intentionally need to insert HTML.

### Forms

```js
const value = $("#email").val();
$("#email").val("student@example.com");
```

For inputs, use `.val()`, not `.text()`.

### Attributes

```js
$(".preview-card").attr("data-state", "updated");
$(".preview-card").removeAttr("data-state");
```

### Classes

```js
$(".preview-card").addClass("is-highlighted");
$(".preview-card").removeClass("is-highlighted");
$(".preview-card").toggleClass("is-compact");
$(".preview-card").hasClass("is-highlighted");
```

Prefer classes for reusable visual states. They are easier to maintain than many inline style changes.

### CSS

```js
$("#preview-title").css("color", "#d94841");
$("#preview-title").css({
    color: "#d94841",
    "font-style": "italic"
});
```

### Creating and removing elements

```js
const item = $("<li>", {
    text: "New item",
    class: "new-item"
});

$("#created-list").append(item);
$("#created-list").children("li").last().remove();
```

| Method | Purpose |
|--------|---------|
| `.append()` | Add content at the end |
| `.prepend()` | Add content at the beginning |
| `.before()` | Insert before the selected element |
| `.after()` | Insert after the selected element |
| `.remove()` | Remove the selected element |
| `.empty()` | Remove children from the parent |
| `.clone()` | Make a copy |

---

## 3. jQuery Method Chaining

Open [`03-method-chaining/index.html`](03-method-chaining) and click `Run chain`.

Most jQuery methods return a jQuery collection, so you can connect operations:

```js
$(".chain-target")
    .text("Updated!")
    .addClass("is-complete")
    .css("opacity", 1);
```

The chain means:

1. Select `.chain-target` elements.
2. Change their text.
3. Add a class.
4. Change their CSS.

### Separate version

```js
const targets = $(".chain-target");
targets.text("Updated!");
targets.addClass("is-complete");
targets.css("opacity", 1);
```

The separate version is easier to debug when an operation is unclear. The chained version is shorter and keeps related operations together.

### Chaining limitation

Methods that mainly read a value may not return a jQuery collection:

```js
$("#title").text();
$("#email").val();
$(".card").length;
```

Do not chain another jQuery method onto those results unless the returned value supports it.

---

## 4. jQuery Event Handling

Open [`04-event-handling/index.html`](04-event-handling).

### Connect an event

```js
$("#count-button").on("click", function () {
    $("#click-output").text("The button was clicked.");
});
```

Common events:

| Event | Fires when |
|-------|------------|
| `click` | An element is clicked |
| `change` | A form value changes |
| `input` | Text is entered into a field |
| `submit` | A form is submitted |
| `keydown` | A key is pressed |
| `mouseenter` | The pointer enters an element |
| `mouseleave` | The pointer leaves an element |

### The event object

```js
$("#button").on("click", function (event) {
    console.log(event.type);
    console.log(event.which);
    event.preventDefault();
});
```

- `event.type` gives the event name.
- `event.which` gives a key or button number.
- `event.preventDefault()` stops a default browser action.
- `this` inside a normal function refers to the element that received the event.

### Event delegation

Attach one handler to a parent and let it receive events from matching children:

```js
$("#button-rack").on("click", ".dynamic-button", function () {
    $("#output").text($(this).data("message"));
});
```

Use delegation when child elements may be added later. The parent handler keeps working for new children.

---

## jQuery CDN Alternative

The activities use a local jQuery file so they work offline. You can use a CDN instead:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

Use the local file for reliable class demonstrations. Use the CDN when a project already loads dependencies from a CDN.

---

# Part 2: Web Scraping

## What Is Web Scraping?

Web scraping is the process of collecting data from a page or another structured source and converting it into useful application data.

A basic scraping pipeline looks like this:

```text
Check permission
      ↓
Choose a source
      ↓
Read or render the page
      ↓
Select target elements
      ↓
Extract values
      ↓
Clean and normalize values
      ↓
Validate and save data
```

The local activities use HTML files. In a real project, the source might be an HTTP response, XML file, JSON API, RSS feed, or browser-rendered page.

---

## Scraping Learning Path

| # | Activity | Run it | Main concepts |
|---|----------|--------|---------------|
| 1 | [Simple Scraping](web-scraping/01-simple-scraping) | `node simple-scraper.js` | Read a local file and extract a small text pattern |
| 2 | [Scraping Concepts](web-scraping/02-scraping-concepts) | Run each small file | Sources, selectors, extraction, cleaning, responsible use |
| 3 | [Blog Scraping Example](web-scraping/03-blog-scraping-example) | `node scrape-blog.js` | Extract 12 structured article records |
| 4 | [Using Cheerio](web-scraping/04-cheerio) | `npm install` then `npm run scrape` | CSS selectors, npm packages, structured static HTML |
| 5 | [Using Playwright](web-scraping/05-playwright) | Install locally, then run `node scrape-dynamic.js` | Chromium, waiting, clicking, dynamic content |

Detailed instructions are in the [Web Scraping Guide](web-scraping/README.md).

---

## 1. Simple Scraping

Open [`web-scraping/01-simple-scraping`](web-scraping/01-simple-scraping).

The script reads a local HTML file with Node's built-in `fs` module:

```js
const fs = require("node:fs");
const path = require("node:path");

const sourcePath = path.join(__dirname, "..", "local-blog", "index.html");
const html = fs.readFileSync(sourcePath, "utf8");
```

It extracts article titles with a small regular expression:

```js
const titles = Array.from(
    html.matchAll(/<h3 class="post-title">\s*<a[^>]*>([\s\S]*?)<\/a>/g)
);
```

Regular expressions are useful when the target is small and predictable. They become difficult when extracting many fields from deeply nested HTML.

---

## 2. Scraping Concepts

Open [`web-scraping/02-scraping-concepts`](web-scraping/02-scraping-concepts).

This folder divides the pipeline into focused examples.

### Read a source

[`01-read-source.js`](web-scraping/02-scraping-concepts/01-read-source.js) reads a local file and prints basic source information.

### Select and extract

[`02-select-and-extract.js`](web-scraping/02-scraping-concepts/02-select-and-extract.js) shows that selection finds a target and extraction reads the value inside it.

### Clean and normalize

[`03-clean-and-normalize.js`](web-scraping/02-scraping-concepts/03-clean-and-normalize.js) demonstrates:

- trimming whitespace
- collapsing spaces
- converting numbers
- creating URL slugs
- handling missing values

### Responsible scraping

[`04-responsible-scraping.js`](web-scraping/02-scraping-concepts/04-responsible-scraping.js) simulates a respectful request sequence without making network requests.

Before scraping a real website:

1. Check the terms of use.
2. Check `robots.txt` and site policies.
3. Look for an official API.
4. Request only necessary pages.
5. Add delays between requests.
6. Do not bypass authentication, paywalls, or access controls.
7. Avoid collecting sensitive personal data.

---

## 3. Blog Scraping Example

Open [`web-scraping/03-blog-scraping-example`](web-scraping/03-blog-scraping-example).

The practice publication is [`local-blog/index.html`](web-scraping/local-blog/index.html). It contains 12 detailed technology articles.

The scraper extracts:

```js
{
    id: "st-001",
    title: "The hidden cost of an always-on AI product",
    category: "Artificial Intelligence",
    author: "Nadia Uwimana",
    publishedAt: "2026-09-24",
    readTime: "9 min",
    score: 98,
    tags: ["LLM", "Cost", "Operations"],
    excerpt: "Inference bills do not tell the whole story..."
}
```

The script demonstrates:

- locating repeating article blocks
- extracting text
- reading `data-*` attributes
- cleaning values
- grouping categories
- calculating summary information
- creating JavaScript records

### Practice changes

Try these after the example works:

- Filter posts by category.
- Sort posts by score.
- Extract only the article IDs.
- Generate a slug from each title.
- Save the records as JSON.
- Print only posts published in September.

---

## 4. Using Cheerio

Open [`web-scraping/04-cheerio`](web-scraping/04-cheerio).

Cheerio is a Node.js library that parses HTML and lets you query it with CSS selectors.

### Install and run

```bash
cd week-05-web-scraping-jquery/web-scraping/04-cheerio
npm install
npm run scrape
```

`npm install` reads `package.json` and downloads the declared Cheerio dependency.

### Why use a library?

Regex can read the local file, but selectors describe the page more clearly:

```js
const $ = cheerio.load(html);

$(".post").length;
$(".post-title").text().trim();
$(".post-link").attr("href");
$(".post").attr("data-category");
```

A selector is easier to review, update, and reuse than a large pattern spread across a scraper.

### Useful library choices

| Need | Recommended tool | Why |
|------|-----------------|-----|
| Static HTML in Node.js | Cheerio | Familiar CSS selectors and small setup |
| Static HTML in Python | Beautiful Soup or Scrapy Selectors | Clear parsing and Python ecosystem support |
| JSON or XML API response | Native `fetch`, `axios`, or an official client | Avoid unnecessary HTML scraping |
| JavaScript-rendered pages | Playwright | Real browser, waiting, clicking, and form interaction |
| Large Python crawling projects | Scrapy | Built-in scheduling, retries, pipelines, and export tools |
| Data extraction from APIs | Official API client | Most stable and intended source when available |
| Structured data embedded in HTML | JSON-LD extraction | Machine-readable data is often more reliable than visual selectors |

### Cheerio is enough when

- the data is in the initial HTML
- no clicking is required
- no form interaction is required
- CSS selectors describe the page well

### Use a browser automation tool when

- content is created by JavaScript
- the page has a load-more button
- the user must log in
- content depends on scrolling
- a request needs to wait for a specific UI state

---

## 5. The Power of Playwright

Open [`web-scraping/05-playwright`](web-scraping/05-playwright).

Playwright controls a real browser. It can:

- load a page
- wait for dynamic content
- click buttons
- fill and submit forms
- take screenshots
- extract content after the UI changes
- test user workflows

The included Playwright code is for local study. It was not installed or executed while preparing this repository.

### Install Playwright

```bash
cd week-05-web-scraping-jquery/web-scraping/05-playwright
npm install playwright
```

### Install Chromium

```bash
npx playwright install chromium
```

The browser name is `chromium`, not `chrome`, for this Playwright setup.

### Run the example

```bash
node scrape-dynamic.js
```

The page starts with no article cards. JavaScript creates six cards after a short delay. Clicking `Load more reports` creates three more.

The Playwright scraper:

1. opens Chromium
2. waits for the first post
3. clicks `Load more reports`
4. waits until nine posts exist
5. extracts every title, author, and category

### Playwright patterns

```js
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(url);

await page.locator(".post").first().waitFor();
await page.getByRole("button", { name: "Load more reports" }).click();
await page.waitForFunction(() => document.querySelectorAll(".post").length === 9);

const posts = await page.locator(".post").evaluateAll((elements) => {
    return elements.map((element) => ({
        title: element.querySelector(".title")?.textContent.trim(),
        author: element.querySelector(".author")?.textContent.trim()
    }));
});

await browser.close();
```

### Cheerio or Playwright?

| Need | Cheerio | Playwright |
|------|---------|------------|
| Read initial HTML | Yes | Yes |
| Use CSS selectors | Yes | Yes |
| Execute page JavaScript | No | Yes |
| Click or type | No | Yes |
| Wait for dynamic content | Limited | Yes |
| Take screenshots | No | Yes |
| Setup | Smaller | Larger because it includes a browser |

Use the simplest tool that can do the job. Browser automation is powerful, but it is slower and more expensive than parsing existing HTML.

---

# Recommended Workflow

## Before scraping

1. Read the site's terms and policies.
2. Check `robots.txt`.
3. Look for an API or downloadable data.
4. Confirm that the requested data is appropriate to collect.
5. Identify the smallest number of pages needed.

## During scraping

1. Check the HTTP status before using the response.
2. Use stable selectors and meaningful attributes.
3. Add a delay between requests.
4. Handle errors and missing values.
5. Do not bypass access controls.

## After scraping

1. Remove repeated spaces and HTML fragments.
2. Convert dates, numbers, and identifiers consistently.
3. Check for duplicates.
4. Check that expected fields exist.
5. Save only the data you need.
6. Record when and how the data was collected when that matters.

---

# Troubleshooting

## `Cannot find module 'cheerio'`

Run:

```bash
cd week-05-web-scraping-jquery/web-scraping/04-cheerio
npm install
```

Make sure you run the command from the folder containing `package.json`.

## jQuery is undefined

Check that jQuery loads before your activity file:

```html
<script src="../shared/jquery-3.7.1.min.js"></script>
<script src="04-events.js"></script>
```

Also check the relative path from the HTML file to the shared folder.

## A jQuery selector returns zero elements

Check:

- class spelling and capitalization
- ID spelling
- whether the element exists when the script runs
- whether the selector needs a descendant pattern such as `".panel .item"`
- whether JavaScript creates the element after the initial load

## A scraper finds nothing

Check:

- the source path
- the file extension
- the selector text
- whether the target is nested inside another element
- whether the data is created by JavaScript
- whether the page requires waiting

## Playwright browser executable is missing

Run:

```bash
npx playwright install chromium
```

If the issue continues, read [`05-playwright/README.md`](web-scraping/05-playwright/README.md).

---

# Resources

## jQuery

- [jQuery API Documentation](https://api.jquery.com/)
- [Learn jQuery](https://learn.jquery.com/)
- [W3Schools jQuery Selectors](https://www.w3schools.com/jquery/jquery_selectors.asp)
- [W3Schools jQuery Events](https://www.w3schools.com/jquery/jquery_events.asp)
- [W3Schools jQuery CSS](https://www.w3schools.com/jquery/jquery_css.asp)
- [W3Schools jQuery Add Classes](https://www.w3schools.com/jquery/jquery_add_classes.asp)
- [W3Schools jQuery Get Data](https://www.w3schools.com/jquery/jquery_get_data.asp)

## JavaScript and the DOM

- [MDN DOM Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN Element Selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [MDN Event Handling](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Node.js File System API](https://nodejs.org/api/fs.html)

## Scraping and HTML parsing

- [Cheerio Documentation](https://cheerio.js.org/docs/)
- [Beautiful Soup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Scrapy Documentation](https://docs.scrapy.org/en/latest/)
- [Parsel Documentation](https://parsel.readthedocs.io/en/latest/)
- [W3Schools Web Crawling](https://www.w3schools.com/whatis/whatis_web_crawling.asp)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Browser automation

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Installation](https://playwright.dev/docs/library)
- [Puppeteer Documentation](https://pptr.dev/)
- [Puppeteer Installation](https://pptr.dev/installation)

## Responsible data collection

- [robots.txt Protocol](https://www.rfc-editor.org/rfc/rfc9309)
- [JSON-LD](https://json-ld.org/)
- [Schema.org](https://schema.org/)
Review the target site's own terms and permission guidance before collecting any data.

---

# Learning Objectives

By the end of Week 05 you should be able to:

1. Use jQuery selectors to find elements.
2. Change text, HTML, values, attributes, classes, and CSS with jQuery.
3. Create and remove elements with jQuery.
4. Chain jQuery methods while understanding when chaining is not possible.
5. Handle click and change events with `.on()`.
6. Explain the event object and event delegation.
7. Read a local HTML file with Node.js.
8. Separate selection, extraction, cleaning, and validation in a scraping workflow.
9. Use Cheerio for static HTML extraction.
10. Explain when Playwright is more useful than Cheerio.
11. Install an npm package with `npm install <package-name>`.
12. Install Playwright's browser with `npx playwright install chromium`.
13. Choose a responsible source, delay requests appropriately, and respect website permissions.

---

# Final Practice Checklist

- [ ] I can open and run all four jQuery demos.
- [ ] I can explain what each jQuery selector returns.
- [ ] I can write a chain with `.text()`, `.addClass()`, and `.css()`.
- [ ] I can explain why `.val()` is used for inputs.
- [ ] I can run the simple local scraper.
- [ ] I can identify the source, selection, extraction, and cleaning stages.
- [ ] I can run the 12-article blog scraper.
- [ ] I can install and run Cheerio.
- [ ] I understand when browser automation is needed.
- [ ] I can install Playwright and Chromium locally.
- [ ] I know how to check permissions before scraping a real site.
