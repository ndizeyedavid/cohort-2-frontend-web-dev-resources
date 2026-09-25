<a id="top"></a>

# Applying Regex: HTML, CSS and JS

Structure, styling, and validation combined. The form is the same one from the earlier activities, now with regex validation using the patterns from Week 01.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The styled form with `novalidate` so the custom JavaScript messages take over. |
| `style.css` | The stylesheet shared with the CSS activities. |
| `main.js` | One regex per field plus helpers that add and clear inline error messages. |

## Key concepts

- Validating with `regex.test(value)` and tracking an `isValid` flag
- Stripping spaces before testing, for example `value.replace(/\s+/g, '')`
- Creating and removing an error element with `createElement` and `remove()`

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Submit the form with a valid Rwanda phone number typed with spaces, then with a non-Rwandan number, and compare the messages.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 02 guide](../README.md)

---

[Back to top](#top)
