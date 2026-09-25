# Playwright Dynamic Scraping Setup

This folder shows how Playwright can open a real Chromium browser, wait for JavaScript-generated content, click a button, and extract the newly rendered articles.

The Playwright code is provided for study only. It was not executed or installed while preparing this repository.

## Files

| File | Purpose |
|------|---------|
| `dynamic-blog.html` | A local page that creates posts after a delay |
| `demo.js` | Creates the initial posts and adds more when the button is clicked |
| `style.css` | Styles the practice page |
| `scrape-dynamic.js` | The Playwright scraper you will run locally |

## 1. Open a terminal in this folder

```bash
cd week-05-web-scraping-jquery/web-scraping/05-playwright
```

## 2. Install Playwright

This command downloads the Playwright package and adds it to your local `package.json` and `package-lock.json`:

```bash
npm install playwright
```

## 3. Install the Chromium browser

```bash
npx playwright install chromium
```

The correct spelling is `chromium`.

Chromium is the browser binary used by Playwright. Installing the Playwright package alone does not install this browser.

## 4. Run the scraper

```bash
node scrape-dynamic.js
```

Expected behavior:

1. Chromium opens in headless mode.
2. The scraper waits for six JavaScript-generated posts.
3. The scraper clicks `Load more reports`.
4. The scraper waits until nine posts exist.
5. The script prints the titles, authors, and categories in a table.

## What makes this powerful

Playwright can work with pages that static HTML tools cannot fully read because content appears later.

| Capability | Example in this folder |
|------------|-------------------------|
| Wait for content | `await initialPosts.first().waitFor()` |
| Wait for a condition | `await page.waitForFunction(...)` |
| Find accessible elements | `page.getByRole('button', { name: 'Load more reports' })` |
| Interact with a page | Click a button and reveal more posts |
| Extract many elements | `page.locator('.post').evaluateAll(...)` |
| Run a real browser | Chromium loads HTML, CSS, and JavaScript |

## Important commands

```bash
npm install playwright
npx playwright install chromium
node scrape-dynamic.js
```

Do not change `chromium` to `chrome` for this example. Playwright manages its own compatible Chromium build.

## Troubleshooting

### `playwright` is not recognized

Run `npm install playwright` from this folder and confirm `package.json` was created.

### Browser executable missing

Run:

```bash
npx playwright install chromium
```

### The script times out

Keep the browser open and inspect the page manually with a headed run:

```js
const browser = await chromium.launch({ headless: false });
```

Return to `headless: true` after testing.

### Permission or access error

Confirm that you installed Chromium through Playwright and that your operating system has permission to run downloaded browser binaries.

## When to use Playwright

Use Playwright when a page requires:

- JavaScript rendering
- clicking, typing, or scrolling
- authentication performed through the browser
- waiting for network or UI state
- screenshots, PDFs, or browser testing

Use a normal HTTP request with Cheerio when the required content already exists in the initial HTML response.
