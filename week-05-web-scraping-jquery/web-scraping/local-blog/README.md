<a id="top"></a>

# Stacktrace Journal (practice site)

A fictional technology publication created for the scraping activities. It contains 12 detailed articles with stable class names and `data-*` attributes, so selectors have something reliable to target.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Twelve articles across five categories, each with an ID, category, author, read time, date, score, and tags. |
| `style.css` | Layout for the publication. |

## Key concepts

- Stable `data-*` attributes make good scraping hooks
- Repeating structures are what scrapers look for
- A local practice site means no live website is scraped

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Open the inspector on any article and read its `data-*` attributes. Those are exactly the values the scrapers extract.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Web Scraping Guide](../README.md)

---

[Back to top](#top)
