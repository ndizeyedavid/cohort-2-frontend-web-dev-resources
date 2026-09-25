<a id="top"></a>

# Pseudo-elements

Five demonstrations of `::before` and `::after`. Every visual addition here comes from CSS, with no extra markup in the HTML.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Quotes, an underline, custom bullets, a tooltip, and a badge. |
| `main.css` | The pseudo-element rules, including `attr()` for the tooltip text. |

## Key concepts

- `content` is required even for a shape
- Using `attr(data-tip)` to read text from the HTML
- Combining `::after` with `position: absolute` for decorative bars
- Why pseudo-elements are invisible to `querySelector`

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Open DevTools, delete a `::before` rule, and see what disappears. Pseudo-elements are decoration, so the content underneath should still make sense.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 03 guide](../README.md)

---

[Back to top](#top)
