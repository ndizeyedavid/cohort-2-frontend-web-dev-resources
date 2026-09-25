# jQuery Method Chaining

One small example showing how a single selection can run several methods in sequence. Deliberately simple, with no element creation to distract from the idea.

## Files

| File | Purpose |
|------|---------|
| `index.html` | A panel with two target elements and a `Run chain` button. |
| `style.css` | Layout and the dimmed state that the chain removes. |
| `03-chaining.js` | Chains `.text()`, `.addClass()`, and `.css()` on existing elements. |

## Key concepts

- Most manipulation methods return a collection, so they can be chained
- Reading a value with `.text()` or `.val()` breaks the chain
- The separate form is easier to debug when a step is unclear

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Add `.css('font-weight', 700)` to the end of the chain and reload. Nothing breaks, because `.css()` returns the collection too.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 05 guide](../README.md)
