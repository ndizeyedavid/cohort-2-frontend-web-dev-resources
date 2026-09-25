# Simple Scraping

The smallest useful scraper: read a local HTML file and pull out every article title. No dependencies required.

## Files

| File | Purpose |
|------|---------|
| `simple-scraper.js` | Reads the local file and extracts titles with one small regular expression. |

## Key concepts

- Reading a file with `fs.readFileSync` and `path.join`
- `matchAll()` to collect every match of a global pattern
- Keeping a capture group as small as possible

## How to run

Run each file with Node from this folder.

## Try this

Change the pattern to match `<p class="post-excerpt">` instead and compare the output.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Web Scraping Guide](../README.md)
