# Functions

The three ways to write a function, and the two rules that explain when each one behaves differently: hoisting and `this`.

## Files

| File | Purpose |
|------|---------|
| `01-declaration.js` | Function declarations, hoisting, and default parameters. |
| `02-expression.js` | Function expressions, named expressions, and conditional assignment. |
| `03-arrow.js` | Arrow syntax and where it makes code shorter and clearer. |
| `04-this-and-arguments.js` | Hoisting recap, `this` in callbacks, and the `arguments` object. |
| `05-rest-spread-callbacks.js` | Rest parameters, callbacks, and choosing the right function type. |

## Key concepts

- Declarations are hoisted, expressions and arrows are not
- Arrows have no own `this`, which fixes callbacks but breaks object methods
- Rest parameters replace the `arguments` object
- Use arrows for array methods and callbacks, declarations for main logic

## How to run

Run each file with Node from this folder.

## Try this

In file 04, change the `setTimeout` arrow back to a normal function and watch `this.count` become `undefined`.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 04 guide](../README.md)
