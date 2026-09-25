<a id="top"></a>

# jQuery Event Handling

Four event examples: a click counter, a select value, an event object inspector, and event delegation for elements created later.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Three event cards plus a button rack for the delegation demo. |
| `style.css` | Layout and the output styles for each card. |
| `04-events.js` | `.on()` for click and change, the event object, and delegated events. |

## Key concepts

- `.on('event', handler)` connects an action to a function
- The handler receives an event object with `type` and `which`
- `event.preventDefault()` stops a default browser action
- Delegation uses `$(parent).on('click', '.child', handler)` so new children work

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Add several buttons, then click one created after the page loaded. The delegated handler still responds, which is the whole point.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 05 guide](../README.md)

---

[Back to top](#top)
