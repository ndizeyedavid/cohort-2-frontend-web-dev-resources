# Using Cheerio

The same extraction rewritten with CSS selectors. This is the readable, maintainable version of the previous example.

## Files

| File | Purpose |
|------|---------|
| `scrape-with-cheerio.js` | Uses `cheerio.load()` and CSS selectors to read every field. |
| `package.json` | Declares Cheerio as a dependency and provides `npm run scrape`. |
| `package-lock.json` | Pins the exact installed versions. |

## Key concepts

- A selector describes a target more clearly than a pattern
- `.map()` over a Cheerio selection returns plain values
- Installing a package with `npm install`
- When a static parser is enough, and when a browser is needed instead

## How to run

```bash
npm install
npm run scrape
```

## Try this

Rewrite the filter at the bottom of the script to select articles with a score of 95 or higher.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Web Scraping Guide](../README.md)
