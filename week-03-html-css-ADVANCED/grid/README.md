# CSS Grid

Four two-dimensional layouts. The named-areas demo is the one to copy when you want to rearrange a whole page later.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Equal columns, a responsive gallery, a named-areas layout, and a spanning card. |
| `main.css` | Grid definitions using `grid-template-columns`, `gap`, `grid-template-areas`, and `span`. |

## Key concepts

- Grid controls rows and columns at the same time
- `repeat(auto-fit, minmax(..., 1fr))` for a gallery with no media query
- `grid-template-areas` makes layout rearranging a one-line change
- `grid-column: span 2` to make one cell bigger

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Swap `auto-fit` for `auto-fill` in the gallery and compare. One stretches items, the other leaves gaps.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 03 guide](../README.md)
