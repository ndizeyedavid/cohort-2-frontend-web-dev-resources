<a id="top"></a>

# Crate Digging

A record store shelf that wraps without a single media query. The responsive behaviour comes entirely from Flexbox.

## Files

| File | Purpose |
|------|---------|
| `index.html` | A sticky header, filter pills, and six record cards. |
| `main.css` | `flex-wrap: wrap` with `gap` on the shelf and `flex: 1 1 260px` on each card. |

## Key concepts

- `flex: 1 1 <basis>` as grow, shrink, and ideal width
- Using `gap` instead of margins to space a wrapping row
- `::after` with `opacity` to reveal a detail on hover

## How to run

Open `index.html` in a browser. No build step and no internet connection required.

## Try this

Change the basis from `260px` to `180px` and see how many records fit before the shelf wraps.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 03 practice projects](../../README.md)

---

[Back to top](#top)
