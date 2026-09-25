<a id="top"></a>

# jQuery Manipulation

Buttons that each perform one manipulation operation on a live preview card, so the effect of every method is visible side by side.

## Files

| File | Purpose |
|------|---------|
| `index.html` | A control panel and a preview card with a title, paragraph, tags, and list. |
| `style.css` | Layout for the panel and the preview card states. |
| `02-manipulation.js` | Text, HTML, attributes, classes, CSS, element creation, and removal. |

## Key concepts

- `.text()` for plain text, `.html()` only for trusted markup
- `.val()` reads and writes form fields
- `.addClass()` is easier to maintain than many inline style changes
- `$('<li>')` creates an element, while `$('li')` selects one

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Click every button in order, then click them again. The last operation wins, which shows why order matters.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 05 guide](../README.md)

---

[Back to top](#top)
