# Frontend Web Development Class Resources

Welcome. This repository is a friendly companion for our frontend web development course.

It holds every in-class activity, live demo, and practice challenge we did together, from Week 1 through Week 5. Everything here is ungraded. It exists so you can see how an activity can be solved well, understand the reasoning behind each step, and study at your own pace whenever something needs a second look.

You do not need to be in the class to use this. If you are learning frontend development on your own, the same material works as a structured practice path.

---

## Table of Contents

- [Start Here](#start-here)
- [What Is Inside](#what-is-inside)
- [Course Roadmap](#course-roadmap)
- [Week 1: Regular Expressions](#week-1-regular-expressions)
- [Week 2: Basic HTML and CSS](#week-2-basic-html-and-css)
- [Week 3: Advanced HTML and CSS](#week-3-advanced-html-and-css)
- [Week 4: JavaScript Deep Dive](#week-4-javascript-deep-dive)
- [Week 5: jQuery and Web Scraping](#week-5-jquery-and-web-scraping)
- [Technology Stack](#technology-stack)
- [How to Run the Activities](#how-to-run-the-activities)
- [Recommended Learning Workflow](#recommended-learning-workflow)
- [Documentation Standards](#documentation-standards)
- [Responsible Scraping](#responsible-scraping)
- [Troubleshooting](#troubleshooting)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Contributing](#contributing)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Project Structure](#project-structure)
- [Resources](#resources)
- [License](#license)

---

## Start Here

New to the repository? Follow these three steps.

**Step 1: Pick your week.**

Open the week folder that matches what you are currently learning. Each week has its own `README.md` that explains every file, every concept, and the order to study them.

**Step 2: Try the activity yourself first.**

Open the activity files and attempt the work before reading the explanation. Struggling with the problem is where the learning happens.

**Step 3: Read the week guide and compare.**

Read the explanation in the week guide, then compare your attempt with the reference file. Ask yourself why the reference is structured the way it is, and what you would do differently.

That loop is the whole point of this repository:

```text
try it yourself  ->  read the explanation  ->  compare  ->  reflect
```

---

## What Is Inside

| Type of content | What it gives you |
|-----------------|-------------------|
| Activity files | Working code you can open, run, and study |
| Week guides | Explanations, hints, common mistakes, and learning objectives |
| Reference implementations | One correct and clear way to solve each activity |
| Practice extras | Larger projects that combine several concepts |
| Resource lists | Curated documentation links for further study |

Everything is plain HTML, CSS, and JavaScript. There is no build step, no bundler, and no framework requirement for the core material.

---

## Course Roadmap

Each week depends on the one before it. The order matters.

```text
Week 1  Regular Expressions
   |
   v
Week 2  Basic HTML and CSS
   |
   v
Week 3  Advanced HTML and CSS
   |
   v
Week 4  JavaScript Deep Dive
   |
   v
Week 5  jQuery and Web Scraping
```

| Week | Topic | Core concepts |
|------|-------|---------------|
| [Week 1](week-01-regular-expressions) | Regular Expressions | Character classes, anchors, word boundaries, quantifiers, lookaheads, validation patterns |
| [Week 2](week-02-html-css-basics) | Basic HTML and CSS | Document structure, semantic elements, forms, tables, the box model, Grid, responsive design, regex validation |
| [Week 3](week-03-html-css-ADVANCED) | Advanced HTML and CSS | Semantic layout, lists, data tables, pseudo-elements, Flexbox, CSS Grid, transitions, animations |
| [Week 4](week-04-javascript) | JavaScript Deep Dive | Variables and scopes, data types, DOM manipulation, arrays, strings, objects, classes, functions, map / filter / reduce |
| [Week 5](week-05-web-scraping-jquery) | jQuery and Web Scraping | jQuery selectors, manipulation, method chaining, event handling, HTML scraping, Cheerio, Playwright |

---

## Week 1: Regular Expressions

Open the guide: [`week-01-regular-expressions/README.md`](week-01-regular-expressions/README.md)

Regular expressions describe text patterns. You use them to validate input, search content, and extract data. Week 1 is where the validation patterns used later in the form activities come from.

| File | Topic | Pattern |
|------|-------|---------|
| [`example-1`](week-01-regular-expressions/example-1) | Character classes | `[a-zA-Z0-9]` |
| [`example-2`](week-01-regular-expressions/example-2) | Word boundaries | `\borange\b` |
| [`email-regex`](week-01-regular-expressions/email-regex) | Email validation | `^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` |
| [`password-regex`](week-01-regular-expressions/password-regex) | Strong passwords with lookaheads | 8+ characters with upper, lower, digit, and symbol |
| [`url-regex`](week-01-regular-expressions/url-regex) | URL validation | `https?://` with an optional path |
| [`credit-card-regex`](week-01-regular-expressions/credit-card-regex) | Card numbers | Visa and Mastercard prefixes |

Test your patterns at [regex101.com](https://regex101.com) before running them in code.

---

## Week 2: Basic HTML and CSS

Open the guide: [`week-02-html-css-basics/README.md`](week-02-html-css-basics/README.md)

Week 2 covers structure, then styling, then connecting both with JavaScript. The three stages build on each other.

| Stage | Folder | What you practice |
|-------|--------|-------------------|
| 1 | [`HTML - Activities`](week-02-html-css-basics/HTML%20-%20Activities) | Document skeleton, headings, forms, labels, input types |
| 2 | [`CSS - Activities`](week-02-html-css-basics/CSS%20-%20Activities) | Resets, CSS variables, Grid layout, form styling, media queries |
| 3 | [`Applying Regex`](week-02-html-css-basics/Applying%20Regex%20-%20HTML%20&%20CSS%20&%20JS) | Form validation with regex and JavaScript |
| Extra | [`Extras`](week-02-html-css-basics/Extras) | HTML tables with `colspan` and nested lists |

The Week 2 form is a good milestone. If you can rebuild it from memory, you understand HTML structure, CSS layout, and JavaScript validation together.

---

## Week 3: Advanced HTML and CSS

Open the guide: [`week-03-html-css-ADVANCED/README.md`](week-03-html-css-ADVANCED/README.md)

Week 3 gives you the tools to build any layout and make it feel alive.

| Folder | What you practice |
|--------|-------------------|
| [`semantic-html`](week-03-html-css-ADVANCED/semantic-html) | Meaningful page structure with `header`, `nav`, `main`, `section`, `footer` |
| [`lists`](week-03-html-css-ADVANCED/lists) | Ordered and unordered lists |
| [`tables`](week-03-html-css-ADVANCED/tables) | Data tables with `thead`, `tbody`, `th`, and `td` |
| [`pseudo-elements`](week-03-html-css-ADVANCED/pseudo-elements) | `::before` and `::after` for decoration without extra HTML |
| [`flexbox`](week-03-html-css-ADVANCED/flexbox) | Main axis, cross axis, wrapping, and perfect centering |
| [`grid`](week-03-html-css-ADVANCED/grid) | Two-dimensional layout with `grid-template`, `gap`, and `grid-area` |
| [`animations`](week-03-html-css-ADVANCED/animations) | Transitions and `@keyframes` motion |

### Practice Projects

The [`extra`](week-03-html-css-ADVANCED/extra) folder contains three complete projects that combine the week's concepts.

| Project | What it demonstrates |
|---------|----------------------|
| [`crate-digging`](week-03-html-css-ADVANCED/extra/crate-digging) | A record store shelf built with Flexbox wrapping and no media queries |
| [`the-kigali-review`](week-03-html-css-ADVANCED/extra/the-kigali-review) | A newspaper layout built with named Grid areas that reflow on mobile |
| [`late-night-menu`](week-03-html-css-ADVANCED/extra/late-night-menu) | A diner menu using pseudo-elements, transitions, and a flickering neon animation |

These are the most useful files in the repository for learning by example. Open them, study the structure, then change them and observe the result.

---

## Week 4: JavaScript Deep Dive

Open the guide: [`week-04-javascript/README.md`](week-04-javascript/README.md)

Week 4 is split into eight folders, and each folder is split into small files. Run one file at a time so you can focus on a single concept.

| Folder | Files | Main concepts |
|--------|-------|---------------|
| [`01-variables-and-scopes`](week-04-javascript/01-variables-and-scopes) | 4 files | `var` vs `let` vs `const`, block scope, function scope, hoisting, temporal dead zone |
| [`02-data-types`](week-04-javascript/02-data-types) | 5 files | Primitive and reference types, `typeof`, coercion, `===`, truthy and falsy |
| [`03-dom-manipulation`](week-04-javascript/03-dom-manipulation) | HTML, CSS, 5 JS files | Selecting elements, `textContent`, `innerHTML`, `value`, classes, creating elements |
| [`04-array-and-string-methods`](week-04-javascript/04-array-and-string-methods) | 4 files | Array mutation, `slice` vs `splice`, searching, sorting, string methods |
| [`05-objects`](week-04-javascript/05-objects) | 5 files | Object literals, methods, `this`, nesting, destructuring, spread |
| [`06-es6-classes`](week-04-javascript/06-es6-classes) | 5 files | Classes, constructors, getters, setters, static, inheritance, private fields |
| [`07-functions`](week-04-javascript/07-functions) | 5 files | Declarations, expressions, arrow functions, `this`, rest, spread, callbacks |
| [`08-map-filter-reduce`](week-04-javascript/08-map-filter-reduce) | 4 files | `map`, `filter`, `reduce`, and chaining them together |

Most files run directly with Node:

```bash
cd week-04-javascript/01-variables-and-scopes
node 01-var-let-const.js
```

The DOM folder needs a browser. Open `week-04-javascript/03-dom-manipulation/index.html` instead.

---

## Week 5: jQuery and Web Scraping

Open the guide: [`week-05-web-scraping-jquery/README.md`](week-05-web-scraping-jquery/README.md)

Week 5 has two halves: a jQuery section for browser interaction, and a web scraping section for collecting data.

### jQuery

| Folder | What you practice |
|--------|-------------------|
| [`01-jquery-selectors`](week-05-web-scraping-jquery/01-jquery-selectors) | Finding elements with IDs, classes, attributes, and nested selectors |
| [`02-jquery-manipulation`](week-05-web-scraping-jquery/02-jquery-manipulation) | Changing text, values, attributes, classes, CSS, and elements |
| [`03-method-chaining`](week-05-web-scraping-jquery/03-method-chaining) | Chaining methods for readable and efficient code |
| [`04-event-handling`](week-05-web-scraping-jquery/04-event-handling) | Click and change events, the event object, and event delegation |

jQuery is stored locally at [`shared/jquery-3.7.1.min.js`](week-05-web-scraping-jquery/shared/jquery-3.7.1.min.js) so the activities work without internet access. The guide also explains how to load it from a CDN instead.

### Web Scraping

Open the scraping guide: [`web-scraping/README.md`](week-05-web-scraping-jquery/web-scraping/README.md)

| Folder | What you practice | Run it |
|--------|-------------------|--------|
| [`local-blog`](week-05-web-scraping-jquery/web-scraping/local-blog) | A fictional 12-article tech publication used as the practice target | Open `index.html` |
| [`01-simple-scraping`](week-05-web-scraping-jquery/web-scraping/01-simple-scraping) | Reading a local HTML file and extracting text | `node simple-scraper.js` |
| [`02-scraping-concepts`](week-05-web-scraping-jquery/web-scraping/02-scraping-concepts) | Sources, selectors, extraction, cleaning, responsible use | Run each file |
| [`03-blog-scraping-example`](week-05-web-scraping-jquery/web-scraping/03-blog-scraping-example) | Turning a full page into structured article records | `node scrape-blog.js` |
| [`04-cheerio`](week-05-web-scraping-jquery/web-scraping/04-cheerio) | Using CSS selectors with an npm package | `npm install` then `npm run scrape` |
| [`05-playwright`](week-05-web-scraping-jquery/web-scraping/05-playwright) | Controlling Chromium for JavaScript-rendered content | See the folder guide |

The Playwright example was not installed or run when this repository was prepared. Its guide explains how to install it on your own machine.

---

## Technology Stack

| Area | Tools used |
|------|-----------|
| Structure | HTML5 with semantic elements |
| Styling | Modern CSS3, Flexbox, Grid, custom properties, media queries |
| Behavior | Vanilla JavaScript, ES6 and later |
| Library | jQuery 3.7.1 stored locally |
| Scraping | Node.js `fs`, Cheerio, Playwright |
| Tools | Node.js, npm, Git, VS Code with Live Server |

No build step or framework is required. Open the files and they run.

---

## How to Run the Activities

### Browser examples

Double-click any `index.html` file, or use the VS Code **Live Server** extension for automatic reloads.

Useful extensions:

- Live Server
- Open in Browser
- Prettier
- ESLint

### Node.js examples

Open a terminal from the repository root:

```bash
# Week 1 does not need Node
# Week 4 uses plain Node files
node week-04-javascript/01-variables-and-scopes/01-var-let-const.js

# Week 5 scraping
cd week-05-web-scraping-jquery/web-scraping
node 01-simple-scraping/simple-scraper.js
node 03-blog-scraping-example/scrape-blog.js
```

### Cheerio

```bash
cd week-05-web-scraping-jquery/web-scraping/04-cheerio
npm install
npm run scrape
```

`npm install` reads the `package.json` in that folder and downloads the declared dependencies.

### Playwright

```bash
cd week-05-web-scraping-jquery/web-scraping/05-playwright
npm install playwright
npx playwright install chromium
node scrape-dynamic.js
```

Chromium is the browser Playwright manages. The spelling is `chromium`, not `chrome`.

### Requirements

| Tool | Needed for | How to get it |
|------|-----------|---------------|
| A modern browser | Every HTML activity | Chrome, Firefox, Edge, or Safari |
| Node.js 18 or newer | Week 4 and Week 5 scripts | [nodejs.org](https://nodejs.org) |
| npm | Installing Cheerio and Playwright | Included with Node.js |
| Git | Cloning and contributing | [git-scm.com](https://git-scm.com) |
| Code editor | Writing code | VS Code, or any text editor |

Check your Node version:

```bash
node --version
npm --version
```

---

## Recommended Learning Workflow

Consistency matters more than speed. This workflow works well.

**1. Attempt before looking.**

Open the activity and solve it yourself. Timebox yourself so you do not get stuck for hours.

**2. Read the week guide.**

The guide explains what each file demonstrates, which parts matter, and which mistakes are common.

**3. Compare your work.**

Open the reference file beside your attempt. Look for differences in structure, naming, and ordering.

**4. Reflect on the difference.**

Ask yourself:

- Why was this approach chosen?
- What would break if the page changed?
- How would I explain this to a classmate?
- What would I write differently?

**5. Rebuild from memory.**

Close the file and rebuild it. This is where the real learning happens.

**6. Change one thing.**

Modify a color, a selector, a condition, or a data value. Predict the result first, then check it. This builds understanding faster than rereading.

---

## Documentation Standards

Every folder that teaches a concept contains a `README.md`. Keeping the documentation consistent helps everyone.

**File naming**

- Use kebab-case for folders, such as `03-method-chaining`
- Prefix JavaScript files with numbers so the intended order is obvious
- Match the file name to the concept, such as `02-block-scope.js`

**Writing style**

- Use short sentences and clear headings
- Explain why a decision was made, not only what the code does
- Include a table of contents for longer guides
- Avoid em dashes in documentation
- Link to official documentation rather than repeating long explanations

**Code style**

- Use `const` by default and `let` when reassignment is needed
- Prefer semantic HTML elements over generic containers
- Use CSS custom properties instead of repeating color values
- Name things after their purpose, such as `.form-field` instead of `.box-2`
- Add comments that explain reasoning, not restating the code

---

## Responsible Scraping

The scraping activities target a local fictional website created for this course. Nothing in this repository collects data from anyone else's site.

If you extend these activities to a real website, follow these rules.

1. Read the terms of use and the site's policies.
2. Check `robots.txt` and follow it.
3. Look for an official API and prefer it over scraping.
4. Request only the pages you actually need.
5. Add delays between requests.
6. Do not bypass authentication, paywalls, or access controls.
7. Avoid collecting sensitive personal data.
8. Respect rate limits and stop if the site asks you to.

Publicly visible content is not automatically free for unrestricted collection.

---

## Troubleshooting

**A jQuery example shows `$ is not defined`**

Check the script order in the HTML file. jQuery must load first:

```html
<script src="../shared/jquery-3.7.1.min.js"></script>
<script src="04-events.js"></script>
```

Also confirm the relative path to the shared folder is correct.

**A browser demo looks unstyled**

Open the file directly instead of through a broken preview, and confirm `style.css` is in the same folder as the HTML file.

**`node: command not found`**

Node.js is not installed, or it is not on your PATH. Install it from [nodejs.org](https://nodejs.org) and reopen your terminal.

**`Cannot find module 'cheerio'`**

Run `npm install` from the folder that contains the `package.json`.

**A scraper finds no results**

Check the source path, the selector spelling, and whether the content is created by JavaScript. JavaScript-rendered content needs Playwright instead of Cheerio.

**Playwright cannot find a browser**

Run:

```bash
npx playwright install chromium
```

**A relative link in a guide does not work on GitHub**

Folders and files with spaces must use URL encoding. For example, `HTML - Activities` becomes `HTML%20-%20Activities`.

---

## Frequently Asked Questions

**Is this graded material?**

No. Everything here is practice and reference material. It is not part of any assessment.

**Can I use this outside the class?**

Yes. Share it, adapt it, and use it as a structured learning path.

**Can I just copy the answer?**

You can, but you will learn far less. The value is in attempting first, then comparing, then rebuilding from memory.

**Why are some examples using regex instead of Cheerio?**

The scraping activities build up gradually. Regex shows why selectors are easier. Compare the two approaches in the same week and you will understand the trade-off.

**Why does jQuery matter when modern frameworks exist?**

jQuery teaches the selector and manipulation ideas that every other library builds on. The concepts transfer even when the syntax changes.

**Why is Playwright not installed here?**

Installing a browser binary is large and machine specific. The folder guide explains exactly how to install it yourself.

**Something is wrong or missing.**

Open an issue or send a message to the class representative. Fixing the documentation helps everyone.

---

## Contributing

This is a shared class resource. If you found a clearer explanation, fixed an error, or have a helpful tip, contributions are welcome.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. It explains what a useful contribution looks like, how to set up the repository, naming and commit conventions, documentation and code standards, and what we will not accept.

In short:

1. Fork the repository.
2. Create a branch with a clear name.
3. Make your change.
4. Keep commit messages short and descriptive.
5. Open a pull request.
6. Explain what changed and why.

Things that help:

- Correcting a broken link
- Fixing an inaccurate explanation
- Adding a helpful hint to an existing guide
- Improving code comments
- Adding a small practice challenge

Please do not add graded assessments, personal data, or content from another website.

---

## Project Structure

```text
.
├── README.md
├── .gitignore
├── week-01-regular-expressions/
│   ├── README.md
│   ├── example-1
│   ├── example-2
│   ├── email-regex
│   ├── password-regex
│   ├── url-regex
│   └── credit-card-regex
├── week-02-html-css-basics/
│   ├── README.md
│   ├── HTML - Activities/
│   ├── CSS - Activities/
│   ├── Applying Regex - HTML & CSS & JS/
│   └── Extras/
├── week-03-html-css-ADVANCED/
│   ├── README.md
│   ├── semantic-html/
│   ├── lists/
│   ├── tables/
│   ├── pseudo-elements/
│   ├── flexbox/
│   ├── grid/
│   ├── animations/
│   └── extra/
├── week-04-javascript/
│   ├── README.md
│   ├── 01-variables-and-scopes/
│   ├── 02-data-types/
│   ├── 03-dom-manipulation/
│   ├── 04-array-and-string-methods/
│   ├── 05-objects/
│   ├── 06-es6-classes/
│   ├── 07-functions/
│   └── 08-map-filter-reduce/
└── week-05-web-scraping-jquery/
    ├── README.md
    ├── shared/
    ├── 01-jquery-selectors/
    ├── 02-jquery-manipulation/
    ├── 03-method-chaining/
    ├── 04-event-handling/
    └── web-scraping/
        ├── README.md
        ├── local-blog/
        ├── 01-simple-scraping/
        ├── 02-scraping-concepts/
        ├── 03-blog-scraping-example/
        ├── 04-cheerio/
        └── 05-playwright/
```

---

## Resources

### HTML

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3Schools HTML](https://www.w3schools.com/html/)
- [HTML Forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)

### CSS

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [W3Schools CSS](https://www.w3schools.com/css/)
- [CSS Tricks](https://css-tricks.com/)
- [Flexbox Froggy](https://flexboxfroggy.com)
- [Grid Garden](https://cssgridgarden.com)

### JavaScript

- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [W3Schools JavaScript](https://www.w3schools.com/js/)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)

### jQuery

- [jQuery API](https://api.jquery.com/)
- [Learn jQuery](https://learn.jquery.com/)
- [W3Schools jQuery](https://www.w3schools.com/jquery/)

### Regular Expressions

- [MDN Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
- [Regex101](https://regex101.com)
- [RegExr](https://regexr.com)

### Web Scraping

- [Cheerio](https://cheerio.js.org/docs/)
- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Scrapy](https://docs.scrapy.org/en/latest/)
- [Playwright](https://playwright.dev/docs/intro)
- [Puppeteer](https://pptr.dev/)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [robots.txt Protocol](https://www.rfc-editor.org/rfc/rfc9309)
- [JSON-LD](https://json-ld.org/)

### Accessibility

- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)

---

## License

Released under the [MIT License](LICENSE). Any classmate may reuse, adapt, and share this material for learning purposes.

The practice websites in this repository are fictional and were created for teaching. Please respect the terms of any real website before scraping it.
