# Week 04 - JavaScript Deep Dive

**Prerequisites:** Week 03 - Advanced HTML and CSS

In Week 03 you learned to build any layout. This week you learn to make it respond: storing values, choosing types, selecting elements, and transforming data. The first three folders cover the basics. The next five go a bit more advanced but are still explained step by step.

> All code is plain JavaScript. Each folder is self-contained. Folders 01, 02, 04, 05, 06, 07, and 08 run with Node (each file runs on its own, e.g. `node 01-var-let-const.js`). Folder 03 needs a browser because it touches the DOM (open `index.html`).

---

## What Is Included

| # | Folder | Files | What You Learn | How to Run |
|---|--------|-------|----------------|------------|
| 1 | [01-variables-and-scopes](01-variables-and-scopes) | `01-var-let-const.js` · `02-block-scope.js` · `03-function-and-global-scope.js` · `04-hoisting-and-tdz.js` | `var` vs `let` vs `const`, block scope, function scope, global scope, hoisting, Temporal Dead Zone | `node 01-var-let-const.js` etc |
| 2 | [02-data-types](02-data-types) | `01-primitive-types.js` · `02-reference-types.js` · `03-typeof-and-checks.js` · `04-coercion-and-equality.js` · `05-truthy-falsy-and-templates.js` | Primitive vs reference types, `typeof`, coercion, `==` vs `===`, truthy and falsy | `node 01-primitive-types.js` etc |
| 3 | [03-dom-manipulation](03-dom-manipulation) | `index.html` + `style.css` + `01-selecting-elements.js` · `02-modifying-text.js` · `03-modifying-value.js` · `04-style-and-classes.js` · `05-creating-elements.js` | Selecting elements, `textContent` vs `innerHTML` vs `value`, style and classes, creating elements | Open `index.html` in browser |
| 4 | [04-array-and-string-methods](04-array-and-string-methods) | `01-arrays-adding-removing.js` · `02-arrays-slice-splice.js` · `03-arrays-search-sort.js` · `04-strings.js` | Arrays (`push`, `slice`, `splice`, `sort`) and strings (`trim`, `replace`, `split`, `padStart`) | `node 01-arrays-adding-removing.js` etc |
| 5 | [05-objects](05-objects) | `01-creating-and-accessing.js` · `02-methods-and-this.js` · `03-nested-objects.js` · `04-destructuring-and-spread.js` · `05-checks-and-example.js` | Object literals, nested objects, methods, `this`, destructuring, spread | `node 01-creating-and-accessing.js` etc |
| 6 | [06-es6-classes](06-es6-classes) | `01-basic-class.js` · `02-getters-setters.js` · `03-static.js` · `04-inheritance.js` · `05-private-fields.js` | Classes, constructor, getters and setters, static, inheritance with `extends` and `super` | `node 01-basic-class.js` etc |
| 7 | [07-functions](07-functions) | `01-declaration.js` · `02-expression.js` · `03-arrow.js` · `04-this-and-arguments.js` · `05-rest-spread-callbacks.js` | Normal functions, function expressions, arrow functions, `this` and `arguments`, rest and spread, callbacks | `node 01-declaration.js` etc |
| 8 | [08-map-filter-reduce](08-map-filter-reduce) | `01-map.js` · `02-filter.js` · `03-reduce.js` · `04-chaining.js` | `map`, `filter`, `reduce`, chaining them together | `node 01-map.js` etc |

---

## 01 - Variables and Variable Scopes

**Run:** each file on its own, e.g. `node 01-var-let-const.js` from inside the folder.

**Files:**

| File | Concept |
|------|---------|
| [`01-var-let-const.js`](01-variables-and-scopes/01-var-let-const.js) | `var` vs `let` vs `const` |
| [`02-block-scope.js`](01-variables-and-scopes/02-block-scope.js) | Block scope and loop scope |
| [`03-function-and-global-scope.js`](01-variables-and-scopes/03-function-and-global-scope.js) | Function scope and global scope |
| [`04-hoisting-and-tdz.js`](01-variables-and-scopes/04-hoisting-and-tdz.js) | Hoisting and Temporal Dead Zone |

This folder answers: what is the difference between `var`, `let`, and `const`, and what does scope mean?

**What the file shows:**

| Topic | Code | Key Point |
|-------|------|-----------|
| `var` vs `let` vs `const` | `var city = "Kigali"; let country = "Rwanda"; const pi = 3.14;` | `var` can be redeclared, `let` can be reassigned, `const` cannot be reassigned |
| Block scope | `{ let x = 1; var y = 2; }` | `let` and `const` stay inside `{}`, `var` leaks out |
| Function scope | `function demo() { var a = 1; let b = 2; }` | Both `var` and `let` stay inside the function |
| Global scope | `let globalName = "hi";` at top level | Accessible everywhere, but be careful with naming |
| Hoisting | `console.log(hoistedVar); var hoistedVar = 1;` | `var` is hoisted as `undefined`, `let` and `const` throw in TDZ |
| Temporal Dead Zone | `console.log(x); let x = 1;` | Accessing `let` before declaration throws ReferenceError |
| Loop scope | `for (var i ...)` vs `for (let j ...)` | `var` leaks after loop, `let` does not |

**Takeaway:** Use `const` by default. Use `let` when you need to reassign. Avoid `var` in modern code.

**Hints:**

- `const` with objects: the binding is constant, not the content. `const s = {name: "David"}; s.name = "Mellow"` is allowed, `s = {}` is not.
- The Temporal Dead Zone is not a bug, it catches mistakes where you use a variable too early.

---

## 02 - Variable Data Types

**Run:** each file on its own, e.g. `node 01-primitive-types.js` from inside the folder.

**Files:**

| File | Concept |
|------|---------|
| [`01-primitive-types.js`](02-data-types/01-primitive-types.js) | String, number, bigint, boolean, undefined, null, symbol |
| [`02-reference-types.js`](02-data-types/02-reference-types.js) | Object, array, function, date and reference copying |
| [`03-typeof-and-checks.js`](02-data-types/03-typeof-and-checks.js) | `typeof` cheat sheet and proper checks (`Array.isArray`, `Number.isNaN`) |
| [`04-coercion-and-equality.js`](02-data-types/04-coercion-and-equality.js) | Coercion, explicit conversion, `==` vs `===` |
| [`05-truthy-falsy-and-templates.js`](02-data-types/05-truthy-falsy-and-templates.js) | Truthy and falsy, template literals |

Covers every type you will use in this course.

**Primitive types (copied by value):**

| Type | Example | `typeof` |
|------|---------|----------|
| String | `"David"`, `'hi'`, `` `hi ${name}` `` | `string` |
| Number | `22`, `3.14`, `NaN`, `Infinity` | `number` |
| BigInt | `9007199254740991n` | `bigint` |
| Boolean | `true`, `false` | `boolean` |
| Undefined | `let x;` | `undefined` |
| Null | `null` | `object` (known quirk) |
| Symbol | `Symbol("id")` | `symbol` |

**Reference types (copied by reference):**

- Objects: `{name: "Aline", age: 21}`
- Arrays: `["red", "blue"]` (use `Array.isArray()` to check, `typeof` returns `object`)
- Functions: `function() {}` and `() => {}` (`typeof` returns `function`)

**Key sections in the file:**

- **typeof cheat sheet** - prints `typeof` for every type in one place.
- **Type coercion** - ` "5" + 3` gives `"53"` (string), `"5" - 3` gives `2` (number). `Number("42")`, `String(42)`, `Boolean(0)` show explicit conversion.
- **Equality** - `5 == "5"` is true (coercion), `5 === "5"` is false (strict). Always use `===`.
- **Truthy and falsy** - `false`, `0`, `""`, `null`, `undefined`, `NaN` are falsy. Everything else is truthy. The file loops through examples.
- **Proper checks** - `Array.isArray([])`, `Number.isNaN(NaN)`, `value === null` for null.

**Hints:**

- `typeof null === "object"` is a bug from the first version of JavaScript that was never fixed. Check null with `value === null`.
- Use `Number.isNaN()` not global `isNaN()`. The global version coerces first and gives confusing results.
- Template literals with backticks do interpolation: `` `Hello ${name}` `` and multiline strings.

---

## 03 - Introduction to DOM Manipulation with `03-dom-manipulation/`

**Run:** Open `index.html` in the browser. Open DevTools Console (F12) for logs.

**Files:** [`index.html`](03-dom-manipulation/index.html) + [`style.css`](03-dom-manipulation/style.css) + 5 JS files:

| File | Concept |
|------|---------|
| [`01-selecting-elements.js`](03-dom-manipulation/01-selecting-elements.js) | `getElementById`, `querySelector`, `querySelectorAll` |
| [`02-modifying-text.js`](03-dom-manipulation/02-modifying-text.js) | `textContent` vs `innerHTML` |
| [`03-modifying-value.js`](03-dom-manipulation/03-modifying-value.js) | `value` for inputs |
| [`04-style-and-classes.js`](03-dom-manipulation/04-style-and-classes.js) | `style` and `classList` |
| [`05-creating-elements.js`](03-dom-manipulation/05-creating-elements.js) | `createElement` and `appendChild` |

All 5 JS files are loaded by `index.html` automatically.

This is the only folder that needs a browser because it touches the Document Object Model. The HTML provides targets, the JS selects and modifies them.

**Three common ways to select elements:**

| Method | Example | Returns | Notes |
|--------|---------|---------|-------|
| `getElementById` | `document.getElementById("greeting")` | One element or `null` | Fastest for IDs |
| `querySelector` | `document.querySelector(".highlight")` | First match or `null` | Uses any CSS selector |
| `querySelectorAll` | `document.querySelectorAll(".highlight")` | NodeList of all matches | Loop with `forEach` |

Bonus: `getElementsByClassName` and `getElementsByTagName` return live HTMLCollections (older style, prefer `querySelector` variants).

**Modifying text dynamically:**

| Property | What It Does | When to Use |
|----------|--------------|-------------|
| `textContent` | Plain text, tags treated as text | Default choice, safe from XSS |
| `innerHTML` | Parses string as HTML | Only when you need HTML and trust the source |
| `value` | Content of `<input>`, `<select>`, `<textarea>` | For form fields |

The demo has buttons for each: `textContent` updates with plain text, `innerHTML` updates with `<strong>` and `<em>`, `value` reads and writes the input field.

**More that the file covers:**

- **Style:** `element.style.backgroundColor = "#2563eb"` (camelCase in JS, kebab-case in CSS). Better for most cases is `element.classList.toggle("active")`.
- **Classes:** `classList.add()`, `remove()`, `toggle()`, `contains()`.
- **Creating elements:** `document.createElement("li")` + `li.textContent = "..."` + `parent.appendChild(li)` to add items dynamically.
- **Other useful methods logged to console:** `setAttribute`, `getAttribute`, `remove()`, `closest()`.

**Hints:**

- `textContent` is almost always what you want. Use `innerHTML` only when you intentionally need to insert HTML.
- For inputs, `value` is the property. `textContent` will not work on `<input>`.
- `querySelector` needs a valid CSS selector: `".item"` for class, `"#name"` for id, `"ul li"` for descendants.

---

## A Bit More Advanced

The next five folders build on the basics. They are still beginner friendly, just a step deeper.

---

## 04 - Arrays and String Methods

**Run:** each file on its own, e.g. `node 01-arrays-adding-removing.js` from inside the folder.

**Files:**

| File | Concept |
|------|---------|
| [`01-arrays-adding-removing.js`](04-array-and-string-methods/01-arrays-adding-removing.js) | `push`, `pop`, `shift`, `unshift` |
| [`02-arrays-slice-splice.js`](04-array-and-string-methods/02-arrays-slice-splice.js) | `slice` vs `splice` |
| [`03-arrays-search-sort.js`](04-array-and-string-methods/03-arrays-search-sort.js) | `indexOf`, `find`, `join`, `sort`, `concat`, spread and destructuring |
| [`04-strings.js`](04-array-and-string-methods/04-strings.js) | `trim`, case, search, extracting, replacing, padding, template literals |

Two groups, one file, because you often use them together (e.g., `csv.split(",").map(...).join(" | ")`).

**Array methods:**

| Method | Example | Modifies Original? |
|--------|---------|-------------------|
| `push` / `unshift` | `arr.push("x")` / `arr.unshift("x")` | Yes |
| `pop` / `shift` | `arr.pop()` / `arr.shift()` | Yes, returns removed item |
| `slice` | `arr.slice(1, 3)` | No, returns copy |
| `splice` | `arr.splice(2, 2)` or `arr.splice(2, 0, "c")` | Yes, can remove and insert |
| `indexOf` / `lastIndexOf` / `includes` | `arr.includes(99)` | No |
| `find` / `findIndex` | `arr.find(n => n > 40)` | No |
| `join` | `arr.join(" - ")` | No, returns string |
| `sort` / `reverse` | `arr.sort((a,b) => a - b)` | Yes |
| `concat` / spread | `[...a, ...b]` | No |
| Destructuring | `let [first, ...rest] = arr;` | No |

**String methods:**

| Method | Example |
|--------|---------|
| `trim` / `trimStart` / `trimEnd` | `"  hi  ".trim()` |
| `toUpperCase` / `toLowerCase` | `"hi".toUpperCase()` |
| `includes` / `startsWith` / `endsWith` | `"hello".includes("ell")` |
| `indexOf` / `lastIndexOf` | `"hello".indexOf("l")` |
| `slice` / `substring` / `split` | `"a,b,c".split(",")` |
| `replace` / `replaceAll` | `"hi hi".replaceAll("hi", "hello")` |
| `padStart` / `padEnd` / `repeat` | `"5".padStart(3, "0")` gives `"005"` |

**Hints:**

- `sort()` without a compare function sorts lexicographically: `[30, 1, 200].sort()` gives `[1, 200, 30]`. For numbers always use `sort((a,b) => a - b)`.
- `slice` is safe (no mutation), `splice` mutates. If you are not sure, prefer `slice`.
- `replace` with a string replaces only first occurrence. Use `replaceAll` or regex with `g` flag for all.

---

## 05 - Objects

**Run:** each file on its own, e.g. `node 01-creating-and-accessing.js` from inside the folder.

**Files:**

| File | Concept |
|------|---------|
| [`01-creating-and-accessing.js`](05-objects/01-creating-and-accessing.js) | Creating, accessing, adding, updating, deleting |
| [`02-methods-and-this.js`](05-objects/02-methods-and-this.js) | Methods and `this` (including arrow pitfall) |
| [`03-nested-objects.js`](05-objects/03-nested-objects.js) | Nested objects, optional chaining, `Object.keys`/`values`/`entries` |
| [`04-destructuring-and-spread.js`](05-objects/04-destructuring-and-spread.js) | Destructuring and spread |
| [`05-checks-and-example.js`](05-objects/05-checks-and-example.js) | Checking properties and student records example |

**What the file covers:**

- **Creating objects:** literal `{name: "David"}`, building step by step with `obj.key = val` and `obj["key"]`, and `new Object()`.
- **Accessing:** dot `person.name` vs bracket `person["name"]` vs dynamic `person[key]`. Bracket is needed for keys with spaces.
- **Adding, updating, deleting:** assignment to add or update, `delete obj.key` to remove.
- **Methods:** `add() { this.value += n; return this; }` with chaining, and shorthand syntax.
- **Nested objects:** `university.location.coordinates.lat` and optional chaining `university.foo?.bar` (returns undefined, no error).
- **Object.keys, values, entries:** `Object.keys(scores)`, `Object.values(scores)`, `Object.entries(scores)` with `for (let [k,v] of Object.entries(...))`.
- **Destructuring:** `let {username, email} = user`, renaming `let {username: uname} = user`, defaults `let {nickname = "Anonymous"} = user`, nested `let {location: {city}} = university`.
- **Spread and assign:** `{...defaults, ...overrides}` to merge, `{...original}` to copy.
- **this:** normal function `this` is the caller, arrow function inherits `this` from outer scope.
- **Checking properties:** `"title" in book`, `book.hasOwnProperty("title")`.

**End example:** student records array with `forEach`, `filter`, and `map` to show objects in a real scenario.

**Hints:**

- Use `const` for objects you do not reassign, but know you can still mutate properties.
- Prefer destructuring in function params: `function printUser({username, email})` is cleaner than `function printUser(user) { user.username }`.
- Spread copies shallowly. Nested objects are still shared.

---

## 06 - ES6 Classes

**Run:** each file on its own, e.g. `node 01-basic-class.js` from inside the folder.

**Files:**

| File | Concept |
|------|---------|
| [`01-basic-class.js`](06-es6-classes/01-basic-class.js) | Basic class and constructor |
| [`02-getters-setters.js`](06-es6-classes/02-getters-setters.js) | Getters and setters |
| [`03-static.js`](06-es6-classes/03-static.js) | Static methods and properties |
| [`04-inheritance.js`](06-es6-classes/04-inheritance.js) | Inheritance with `extends` and `super` (includes BankAccount example) |
| [`05-private-fields.js`](06-es6-classes/05-private-fields.js) | Private fields with `#` |

Classes are templates for creating objects with shared structure and behavior.

**Sections:**

| Topic | Example |
|-------|---------|
| Basic class | `class Student { constructor(name) { this.name = name; } introduce() { return "Hi " + this.name; } }` |
| Constructor | `new Student("David", "C2", "Kigali")` and auto id with `Math.random()` |
| Getters and setters | `get area() { return w*h; }` and `set area(val) { this.width = val/this.height; }` |
| Static | `static PI = 3.14; static add(a,b) {}` called as `MathHelper.add()` not on instances |
| Inheritance | `class Dog extends Animal { constructor(name, breed) { super(name); this.breed = breed; } }` |
| Method override | `speak() { return super.speak() + " but louder"; }` |
| Private fields | `#count = 0;` only accessible inside class |

**Full example:** `BankAccount` with `deposit`, `withdraw`, chaining with `return this`, `formattedBalance` getter, and `SavingsAccount extends BankAccount` with `addInterest()` and overridden `summary()`.

**Hints:**

- Always call `super()` first in a child constructor before using `this`.
- Static methods belong to the class, not instances. Use them for helpers like `MathHelper.circleArea()`.
- Private fields with `#` are modern JS. They truly hide data, unlike `_convention` which is just naming.

---

## 07 - Functions

**Run:** each file on its own, e.g. `node 01-declaration.js` from inside the folder.

**Files:**

| File | Concept |
|------|---------|
| [`01-declaration.js`](07-functions/01-declaration.js) | Function declaration and default parameters |
| [`02-expression.js`](07-functions/02-expression.js) | Function expression |
| [`03-arrow.js`](07-functions/03-arrow.js) | Arrow functions |
| [`04-this-and-arguments.js`](07-functions/04-this-and-arguments.js) | Hoisting, `this` and `arguments` |
| [`05-rest-spread-callbacks.js`](07-functions/05-rest-spread-callbacks.js) | Rest, spread, and callbacks |

Three ways to write a function, and when to use each.

**Comparison:**

| Type | Syntax | Hoisted? | Has own `this`? | Has `arguments`? |
|------|--------|----------|-----------------|-------------------|
| Function declaration | `function add(a,b) { return a+b; }` | Yes | Yes | Yes |
| Function expression | `const add = function(a,b) { return a+b; };` | No | Yes | Yes |
| Arrow function | `const add = (a,b) => a+b;` | No | No (inherits) | No (use `...args`) |

**What the file shows:**

- **Declaration:** hoisted, can call before definition. Default params with `function makeUser(name, role = "student")` and `function withDefaults(a, b = 10)`.
- **Expression:** not hoisted, named expression for recursion `const fact = function fact(n) {}`, conditional assignment.
- **Arrow:** shortest for callbacks `n => n * 2`, single param can omit `()`, no param needs `()`, returning object needs `({x,y})`.
- **this:** `obj.normalFunc()` has correct `this`, `obj.arrowFunc()` does not. `setTimeout(() => this.count)` preserves `this` while `function() {}` does not.
- **arguments vs rest:** normal function has `arguments` object, arrow uses `(...args) =>`.
- **Rest and spread:** `function sumRest(...nums) {}` and `function introduce(name, ...hobbies)`.
- **Callbacks:** `doTwice(() => console.log("hi"))` and `processArray([1,2,3], n => n * 10)`.

**Hints:**

- Use declarations for main logic, expressions for conditional or assigned functions, arrows for array methods and callbacks.
- Never use arrow functions as object methods or constructors because `this` will be wrong.
- Arrow functions are not just shorter, they fix `this` in callbacks so you do not need `let self = this`.

---

## 08 - Array Map, Filter, Reduce

**Run:** each file on its own, e.g. `node 01-map.js` from inside the folder.

**Files:**

| File | Concept |
|------|---------|
| [`01-map.js`](08-map-filter-reduce/01-map.js) | `map` |
| [`02-filter.js`](08-map-filter-reduce/02-filter.js) | `filter` |
| [`03-reduce.js`](08-map-filter-reduce/03-reduce.js) | `reduce` |
| [`04-chaining.js`](08-map-filter-reduce/04-chaining.js) | Chaining `map` + `filter` + `reduce` and other methods |

The three most important array methods. Together they replace most `for` loops.

**Map - transform each element:**

```js
[1, 2, 3].map(n => n * 2) // [2, 4, 6]
["david", "aline"].map(s => s.toUpperCase()) // ["DAVID", "ALINE"]
students.map(s => s.name) // ["David", "Aline", "Grace"]
```

Creates a new array, original unchanged. Can use index: `arr.map((val, idx) => idx + ":" + val)`.

**Filter - keep only what matches:**

```js
[45, 82, 91, 37].filter(n => n >= 50) // [82, 91]
products.filter(p => p.inStock) // only in stock
mixed.filter(Boolean) // removes all falsy values
```

Returns new array with passing elements. Use for searching and removing.

**Reduce - boil down to one value:**

```js
[1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0) // 15 (sum)
[1, 2, 3, 4, 5].reduce((acc, n) => acc * n, 1) // 120 (product)
["apple", "apple", "banana"].reduce((acc, f) => { acc[f] = (acc[f]||0)+1; return acc; }, {}) // {apple: 2, banana: 1}
```

Takes `(accumulator, current)` and returns new accumulator. Needs initial value.

**Chaining - the real power:**

```js
data.filter(n => n % 2 === 0).map(n => n * 2).reduce((a, n) => a + n, 0)
students.filter(s => s.score >= 50).map(s => s.name)
items.filter(i => i.inStock).reduce((sum, i) => sum + i.price, 0)
```

Each step returns a new array, next step operates on it. Clean and chainable.

**Other methods covered:** `find`, `findIndex`, `some`, `every`, `includes`, `forEach`.

**Hints:**

- Prefer `map`/`filter`/`reduce` over manual `for` loops: shorter, no manual `push`, chainable, declarative.
- Always provide initial value to `reduce`. Without it, empty arrays throw and the first element becomes the initial accumulator.
- If you need side effects only (logging, DOM), use `forEach`. If you need a new array, use `map` or `filter`.

---

## How to Run

**With Node (folders 01, 02, 04, 05, 06, 07, 08):**

```bash
cd week-04-javascript/01-variables-and-scopes
node 01-var-let-const.js
node 02-block-scope.js
# each file runs on its own

# or from repo root
node week-04-javascript/02-data-types/01-primitive-types.js
node week-04-javascript/08-map-filter-reduce/01-map.js
```

Each file prints to the console. Run them one by one and read the output alongside the code. Each file focuses on one concept so you can study in small steps.

**With Browser (folder 03):**

- Double click `week-04-javascript/03-dom-manipulation/index.html`, or
- Right click in VS Code and select Open with Live Server

Open DevTools (F12) to see console logs. Click the buttons to see `textContent`, `innerHTML`, `value`, style, and class changes live.

---

## Learning Objectives

By the end of Week 04 you should be able to:

1. Declare variables with `let` and `const` and explain block vs function vs global scope and hoisting
2. Name all primitive types, use `typeof` correctly, and explain coercion and `===` vs `==`
3. Select elements with `getElementById`, `querySelector`, and `querySelectorAll` and explain the difference
4. Modify content with `textContent`, `innerHTML`, and `value` and know when to use each
5. Manipulate style and classes and create elements dynamically with `createElement` and `appendChild`
6. Use array methods (`push`, `slice`, `splice`, `sort`, `join`) and string methods (`trim`, `split`, `replace`, `padStart`)
7. Create and work with objects, use destructuring and spread, and understand `this`
8. Define ES6 classes with constructors, getters, setters, static methods, private fields, and inheritance with `extends` and `super`
9. Choose between function declarations, expressions, and arrow functions and explain `this` and rest parameters
10. Use `map` to transform, `filter` to select, `reduce` to combine, and chain them together

---

## How It All Connects

```
Week 03                         Week 04
HTML structure  ------------>  Select it with querySelector
CSS styling     ------------>  Change it with style and classList
Static page     ------------>  Dynamic page with variables and functions
Hardcoded data  ------------>  Objects, arrays, and classes
Manual repetition ---------->  map, filter, reduce
```

Week 03 taught you to build and style. Week 04 teaches you to make it interactive and data driven.

---

## References

W3Schools is recommended because every page has a live Try it Yourself editor.

**Variables and scopes**

- [W3Schools - Variables](https://www.w3schools.com/js/js_variables.asp)
- [W3Schools - Let](https://www.w3schools.com/js/js_let.asp)
- [W3Schools - Const](https://www.w3schools.com/js/js_const.asp)
- [W3Schools - Scope](https://www.w3schools.com/js/js_scope.asp)
- [W3Schools - Hoisting](https://www.w3schools.com/js/js_hoisting.asp)

**Data types**

- [W3Schools - Data Types](https://www.w3schools.com/js/js_datatypes.asp)
- [W3Schools - Type Conversion](https://www.w3schools.com/js/js_type_conversion.asp)
- [W3Schools - Comparisons](https://www.w3schools.com/js/js_comparisons.asp) - `==` vs `===`

**DOM manipulation**

- [W3Schools - DOM Introduction](https://www.w3schools.com/js/js_htmldom.asp)
- [W3Schools - DOM Methods](https://www.w3schools.com/js/js_htmldom_document.asp) - `getElementById` etc
- [W3Schools - DOM Elements](https://www.w3schools.com/js/js_htmldom_elements.asp) - `querySelector` etc
- [W3Schools - HTML DOM - Changing HTML](https://www.w3schools.com/js/js_htmldom_html.asp) - `innerHTML`, `textContent`
- [W3Schools - HTML DOM - CSS](https://www.w3schools.com/js/js_htmldom_css.asp) - style and classes

**Arrays and strings**

- [W3Schools - Arrays](https://www.w3schools.com/js/js_arrays.asp)
- [W3Schools - Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- [W3Schools - Array Search](https://www.w3schools.com/js/js_array_search.asp)
- [W3Schools - Array Sort](https://www.w3schools.com/js/js_array_sort.asp)
- [W3Schools - Strings](https://www.w3schools.com/js/js_strings.asp)
- [W3Schools - String Methods](https://www.w3schools.com/js/js_string_methods.asp)
- [W3Schools - String Search](https://www.w3schools.com/js/js_string_search.asp)

**Objects**

- [W3Schools - Objects](https://www.w3schools.com/js/js_objects.asp)
- [W3Schools - Object Properties](https://www.w3schools.com/js/js_object_properties.asp)
- [W3Schools - Object Methods](https://www.w3schools.com/js/js_object_methods.asp)
- [W3Schools - Destructuring](https://www.w3schools.com/js/js_destructuring.asp)
- [W3Schools - this Keyword](https://www.w3schools.com/js/js_this.asp)

**Classes**

- [W3Schools - Classes](https://www.w3schools.com/js/js_class_intro.asp)
- [W3Schools - Class Inheritance](https://www.w3schools.com/js/js_class_inheritance.asp)
- [W3Schools - Static](https://www.w3schools.com/js/js_class_static.asp)

**Functions**

- [W3Schools - Functions](https://www.w3schools.com/js/js_functions.asp)
- [W3Schools - Function Parameters](https://www.w3schools.com/js/js_function_parameters.asp)
- [W3Schools - Arrow Functions](https://www.w3schools.com/js/js_arrow_function.asp)
- [W3Schools - this](https://www.w3schools.com/js/js_this.asp) - why arrow `this` is different

**Map, filter, reduce**

- [W3Schools - Array Map](https://www.w3schools.com/js/js_array_iteration.asp) - map, filter, reduce together
- [W3Schools - Array Iteration](https://www.w3schools.com/js/js_array_iteration.asp)

---

## Next Up

After Week 04 you will be ready for Week 05 and beyond. Keep practicing by rebuilding each file from memory without looking, then compare.
