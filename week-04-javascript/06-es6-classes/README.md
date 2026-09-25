<a id="top"></a>

# ES6 Classes

Classes as blueprints for related objects, ending with a bank account example that uses nearly every class feature together.

## Files

| File | Purpose |
|------|---------|
| `01-basic-class.js` | Class syntax, the constructor, and instance methods. |
| `02-getters-setters.js` | Computed properties that look like plain values. |
| `03-static.js` | Methods and properties that belong to the class, not to instances. |
| `04-inheritance.js` | `extends`, `super`, overriding, and the `BankAccount` example. |
| `05-private-fields.js` | Hiding data with the `#` prefix. |

## Key concepts

- A constructor runs when you use `new`
- `super()` must be called before using `this` in a child class
- Static helpers belong to the class itself
- Private fields are genuinely hidden, unlike a naming convention

## How to run

Run each file with Node from this folder.

## Try this

In file 04, add a `closeAccount()` method to `BankAccount` and call `savings.closeAccount()` to confirm inheritance works.

## Full explanation

The week guide covers this activity in detail, including hints and common mistakes:

- [Week 04 guide](../README.md)

---

[Back to top](#top)
