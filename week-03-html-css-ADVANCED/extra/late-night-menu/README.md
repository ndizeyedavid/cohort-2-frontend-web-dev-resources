# Late Night Menu

A diner menu where the decorative details come from pseudo-elements and the atmosphere comes from a flickering neon animation.

## Files

| File | Purpose |
|------|---------|
| `index.html` | A menu with sections, prices, tags, and badges. |
| `main.css` | A `::after` dotted leader, `::before` badges, a hover reveal, and `@keyframes flicker`. |

## Key concepts

- A flex `::after` with `flex: 1` acting as a dotted leader line
- `::before` for NEW and SOLD OUT stamps
- Revealing hidden text with `max-height` and `opacity` transitions
- Layered `text-shadow` to fake a neon glow

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Remove the `.item::after` rule and the price jumps next to the dish name. That single line is doing real layout work.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 03 practice projects](../../README.md)
