# Variables and Variable Scopes

Four small files covering how variables are declared and where they can be seen. Run them one at a time.

## Files

| File | Purpose |
|------|---------|
| `01-var-let-const.js` | Redeclaration, reassignment, and why `const` objects can still be mutated. |
| `02-block-scope.js` | What a block is, and how `var` leaks out of one. |
| `03-function-and-global-scope.js` | Function scope and global scope. |
| `04-hoisting-and-tdz.js` | Hoisting and the temporal dead zone. |

## Key concepts

- `const` by default, `let` when you need to reassign
- Block scope versus function scope
- Why `var` leaks from a block or loop
- The temporal dead zone protects you from using a variable too early

## How to run

Run each file with Node from this folder.

## Try this

Uncomment the `console.log(role)` after the `if` block in file 02 and read the error message carefully. That error is the lesson.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 04 guide](../README.md)
