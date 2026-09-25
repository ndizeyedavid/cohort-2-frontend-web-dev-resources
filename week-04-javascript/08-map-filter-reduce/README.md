# Array map, filter, reduce

The three methods that replace most manual loops. The last file chains them together, which is where the real power shows up.

## Files

| File | Purpose |
|------|---------|
| `01-map.js` | Transforming each element into a new array. |
| `02-filter.js` | Keeping only the elements that pass a test. |
| `03-reduce.js` | Combining an array into a single value, shown step by step. |
| `04-chaining.js` | Chaining the three together, plus `find`, `some`, and `every`. |

## Key concepts

- `map` and `filter` return a new array, `reduce` returns one value
- Always give `reduce` an initial value
- Chain for readability instead of nesting loops
- Use `forEach` when you only need a side effect such as logging

## How to run

Run each file with Node from this folder.

## Try this

Write a single chain that takes an array of student objects, keeps only those scoring at least 50, and returns their names.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 04 guide](../README.md)
