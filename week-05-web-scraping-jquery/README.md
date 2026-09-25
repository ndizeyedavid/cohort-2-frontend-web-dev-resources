# Week 05 - jQuery and Web Scraping

**Prerequisites:** Week 04 - JavaScript Deep Dive

This week starts with jQuery. jQuery is a JavaScript library that gives you shorter methods for selecting elements, changing content, and handling events. The web scraping section will be added after the jQuery activities are complete.

All examples use a local copy of jQuery so they work without internet access. The local library is stored at [`shared/jquery-3.7.1.min.js`](shared/jquery-3.7.1.min.js).

---

## What Is Included

| #   | Folder                                           | Files                                             | Main Concept                                                                           |
| --- | ------------------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1   | [01-jquery-selectors](01-jquery-selectors)       | `index.html` · `style.css` · `01-selectors.js`    | Find elements with IDs, classes, attributes, tags, and nested selectors                |
| 2   | [02-jquery-manipulation](02-jquery-manipulation) | `index.html` · `style.css` · `02-manipulation.js` | Change text, HTML, attributes, classes, CSS, and elements                              |
| 3   | [03-method-chaining](03-method-chaining)         | `index.html` · `style.css` · `03-chaining.js`     | Connect methods into efficient chains                                                  |
| 4   | [04-event-handling](04-event-handling)           | `index.html` · `style.css` · `04-events.js`       | Respond to click and change events, inspect the event object, and use event delegation |

Every demo is self-contained. Open its `index.html` directly in a browser.

---

## 01 - jQuery Selectors

**Folder:** [`01-jquery-selectors`](01-jquery-selectors)

**Files:**

| File              | What it demonstrates                              |
| ----------------- | ------------------------------------------------- |
| `index.html`      | A course-card playground with selectable elements |
| `style.css`       | The visual layout for the playground              |
| `01-selectors.js` | `$(selector)` and `$(this).data('target')`        |

### Core idea

jQuery uses CSS-like selectors to find HTML elements:

```js
$("#featured-card"); // one element by ID
$(".course-card"); // all elements with a class
$("[data-level]"); // elements with an attribute
$(".course-grid .course-card"); // elements nested inside another selector
$("button"); // all button elements
```

### What to try

1. Open `index.html`.
2. Click each selector button.
3. Watch the matching cards receive the orange outline.
4. Open DevTools with F12 and read the `console.log()` output.

### Selector rules

| Selector                   | Meaning                                                  |
| -------------------------- | -------------------------------------------------------- |
| `#id`                      | Selects one element with that ID. IDs should be unique.  |
| `.class`                   | Selects every element with that class.                   |
| `element`                  | Selects every element of that tag name.                  |
| `[attribute]`              | Selects elements that have that attribute.               |
| `parent child`             | Selects matching descendants of a parent.                |
| `:first`, `:last`, `:even` | jQuery position selectors. Learn these after the basics. |

### Useful methods

```js
$(".course-card").length; // how many elements were found
$(this).text(); // read or change plain text
$(this).find("h3"); // find a descendant inside the current selection
$(this).addClass("is-selected"); // add a class to every selected element
```

### Hint

A jQuery selection is a collection, not just one element. If one element matches, `length` is `1`. If five elements match, `length` is `5`.

---

## 02 - jQuery Manipulation

**Folder:** [`02-jquery-manipulation`](02-jquery-manipulation)

**Files:**

| File                 | What it demonstrates                                     |
| -------------------- | -------------------------------------------------------- |
| `index.html`         | A live preview card and manipulation buttons             |
| `style.css`          | The visual layout for the preview card                   |
| `02-manipulation.js` | Content, attribute, class, CSS, and element manipulation |

### Content methods

```js
$("#preview-title").text("New text");
$("#preview-copy").html("Text with <strong>HTML</strong>");
```

- Use `.text()` for plain text. HTML tags are displayed as text.
- Use `.html()` when you intentionally need to insert HTML.

### Attribute methods

```js
$(".preview-card").attr("data-state", "updated");
$(".preview-card").removeAttr("data-state");
```

### Class methods

```js
$(".preview-card").addClass("is-highlighted");
$(".preview-card").removeClass("is-highlighted");
$(".preview-card").toggleClass("is-compact");
$(".preview-card").hasClass("is-highlighted");
```

### CSS methods

```js
$("#preview-title").css("color", "#d94841");
$("#preview-title").css({
  color: "#d94841",
  "font-style": "italic",
});
```

For larger projects, changing a class is usually easier to maintain than changing many inline CSS properties.

### Creating and removing elements

```js
const item = $("<li>", {
  text: "New item",
  class: "new-item",
});

$("#created-list").append(item);
$("#created-list").children("li").last().remove();
```

Useful methods:

| Method      | Purpose                                 |
| ----------- | --------------------------------------- |
| `append()`  | Add content at the end of a selection   |
| `prepend()` | Add content at the beginning            |
| `before()`  | Insert content before the selection     |
| `after()`   | Insert content after the selection      |
| `remove()`  | Remove the selected element             |
| `empty()`   | Remove all children but keep the parent |
| `clone()`   | Make a copy of an element               |

### Hint

`$('<li>')` creates an element. `$('<li>')` does not select an existing element. This small difference matters when you build dynamic lists.

---

## 03 - Method Chaining

**Folder:** [`03-method-chaining`](03-method-chaining)

**Files:**

| File             | What it demonstrates                                      |
| ---------------- | --------------------------------------------------------- |
| `index.html`     | A card shelf and a chain example                          |
| `style.css`      | The visual layout for generated cards                     |
| `03-chaining.js` | A chain that creates, styles, appends, and reveals a card |

### The idea

Most jQuery manipulation methods return the jQuery collection. That means you can call another method on the result:

```js
$(".new-card")
  .addClass("is-ready")
  .css("opacity", 0)
  .appendTo("#card-shelf")
  .fadeIn();
```

Read this chain from left to right:

1. Select `.new-card`.
2. Add the `is-ready` class.
3. Set its opacity to `0`.
4. Append it to `#card-shelf`.
5. Fade it in.

### Why chaining helps

Without chaining:

```js
const card = $(".new-card");
card.addClass("is-ready");
card.css("opacity", 0);
card.appendTo("#card-shelf");
card.fadeIn();
```

With chaining:

```js
$(".new-card")
  .addClass("is-ready")
  .css("opacity", 0)
  .appendTo("#card-shelf")
  .fadeIn();
```

Both versions can work. Chaining keeps the operations together and avoids repeatedly storing the same collection in a variable.

### Important limitation

Not every jQuery method returns a collection. For example, methods that mainly read information, such as `.text()` when used without a value, `.val()`, and `.length`, return text, values, or numbers. Chaining works when the previous method returns something you can call another jQuery method on.

### Try it

1. Open `03-method-chaining/index.html`.
2. Click `Build a card` several times.
3. Change the chain in `03-chaining.js`.
4. Try inserting `.delay(300)` before `.fadeIn()`.

---

## 04 - jQuery Event Handling

**Folder:** [`04-event-handling`](04-event-handling)

**Files:**

| File           | What it demonstrates                                     |
| -------------- | -------------------------------------------------------- |
| `index.html`   | Click, change, event inspection, and delegation examples |
| `style.css`    | The visual layout for the event demos                    |
| `04-events.js` | `.on()`, the event object, and delegated events          |

### Connecting events

```js
$("#count-button").on("click", function () {
  $("#click-output").text("The button was clicked.");
});
```

Common events:

| Event        | Fires when                       |
| ------------ | -------------------------------- |
| `click`      | An element is clicked            |
| `change`     | A form value changes             |
| `input`      | The user types into a text field |
| `submit`     | A form is submitted              |
| `keydown`    | A key is pressed                 |
| `mouseenter` | The pointer enters an element    |
| `mouseleave` | The pointer leaves an element    |

### Reading the event object

Every handler receives an event object:

```js
$("#inspect-button").on("click", function (event) {
  console.log(event.type);
  console.log(event.which);
  event.preventDefault();
});
```

- `event.type` gives the event name, such as `click`.
- `event.which` gives a key or button number.
- `event.preventDefault()` stops the browser's default action, such as submitting a form or following a link.
- `this` refers to the element that received the event.

### Event delegation

Instead of attaching a separate click handler to every button, attach one handler to the parent:

```js
$("#button-rack").on("click", ".dynamic-button", function () {
  $("#delegation-output").text($(this).data("message"));
});
```

The pattern is:

```js
$(parent).on("click", ".child", handler);
```

This is useful when new child elements are added later. The handler still works because it is connected to the parent.

### Try it

1. Click `Click me` and inspect the output.
2. Choose a mood from the select.
3. Add several dynamic buttons, then click them.
4. Open the console and inspect the event object.

---

## How to Run

Each demo works by opening its `index.html` directly.

The script order in every HTML file is important:

```html
<script src="../shared/jquery-3.7.1.min.js"></script>
<script src="01-selectors.js"></script>
```

jQuery must load before the file that uses `$()` and `jQuery`.

### Loading jQuery from a CDN instead

The examples use a local file so they work offline. You can replace the local script with a CDN script when you want to load jQuery from the internet:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

The rest of the code stays the same. A CDN version needs an internet connection. The local version keeps working when the computer is offline.

---

## Learning Objectives

By the end of the jQuery section you should be able to:

1. Select elements with IDs, classes, attributes, tags, and nested CSS selectors
2. Change content with `.text()` and `.html()`
3. Read and write input values with `.val()`
4. Manipulate attributes, classes, and CSS
5. Create, append, clone, and remove elements
6. Use method chaining and explain when chaining is possible
7. Connect click and change events with `.on()`
8. Read common properties from the event object
9. Use event delegation for elements added later
10. Load jQuery from either a local file or a CDN

---

## References

- [W3Schools - jQuery Selectors](https://www.w3schools.com/jquery/jquery_selectors.asp)
- [W3Schools - jQuery Events](https://www.w3schools.com/jquery/jquery_events.asp)
- [W3Schools - jQuery CSS](https://www.w3schools.com/jquery/jquery_css.asp)
- [W3Schools - jQuery Add Classes](https://www.w3schools.com/jquery/jquery_add_classes.asp)
- [W3Schools - jQuery Get Data](https://www.w3schools.com/jquery/jquery_get_data.asp)
- [jQuery Documentation](https://api.jquery.com/)
- [Learn jQuery](https://learn.jquery.com/)

---

## Next Step

Complete the four jQuery demos, then we will add the web scraping section for the same week.
