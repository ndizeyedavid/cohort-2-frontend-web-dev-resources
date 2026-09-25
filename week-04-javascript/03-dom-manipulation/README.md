# DOM Manipulation

The only Week 04 folder that needs a browser. The page provides targets, the five scripts select and change them, and the console explains what happened.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Four sections that act as targets: selection, text, value, and style. |
| `style.css` | Layout for the page and the highlighted state. |
| `01-selecting-elements.js` | `getElementById`, `querySelector`, and `querySelectorAll`. |
| `02-modifying-text.js` | `textContent` against `innerHTML`. |
| `03-modifying-value.js` | Reading and writing input values with `.val()`. |
| `04-style-and-classes.js` | Direct style changes against `classList`. |
| `05-creating-elements.js` | `createElement` and `appendChild` for dynamic lists. |

## Key concepts

- A jQuery-style wrapper over the browser DOM API
- Choosing between `textContent`, `innerHTML`, and `value`
- Prefer `classList` over inline style for maintainable code
- Building elements in memory before inserting them

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Set the title with `innerHTML` and paste a `<b>` tag. Then repeat it with `textContent` and watch the difference.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 04 guide](../README.md)
