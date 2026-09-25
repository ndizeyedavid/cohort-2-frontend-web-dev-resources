# The Kigali Review

A newspaper front page laid out entirely with named Grid areas. Rearranging the page means editing one line of CSS.

## Files

| File | Purpose |
|------|---------|
| `index.html` | A masthead, a lead story, a sidebar, three smaller stories, and a schedule strip. |
| `main.css` | `grid-template-areas` for the page and a nested `repeat(4, 1fr)` grid for the strip. |

## Key concepts

- `grid-template-areas` as a readable layout map
- Placing each child with `grid-area`
- A nested grid inside a grid cell
- Collapsing the areas to a single column on small screens

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Swap the `"a b c"` row for `"c b a"` in `grid-template-areas` and reload. Three stories change position without touching the HTML.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 03 practice projects](../../README.md)
