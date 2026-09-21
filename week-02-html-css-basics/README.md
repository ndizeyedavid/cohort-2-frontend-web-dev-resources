# Week 02 — Basic HTML and CSS

**Prerequisites:** Week 01 — Regular Expressions

In Week 01 you learned how to describe text with patterns. This week you learn how to **structure** it with HTML, **style** it with CSS, and then **connect the two** by applying your Week 01 regex skills to a real form with JavaScript validation.

---

## What's Included

This week has three stages. Each one builds on the previous — do them in order.

| #   | Folder                                                                             | Files                                           | What You Learn                                                                |
| --- | ---------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | [HTML - Activities](HTML%20-%20Activities)                                         | `Basic-html-structure.html` · `Basic-form.html` | HTML document structure and form elements                                     |
| 2   | [CSS - Activities](CSS%20-%20Activities)                                           | `Designed-Form.html` · `style.css`              | Styling, layout (Grid/Flexbox), and responsive design                         |
| 3   | [Applying Regex - HTML & CSS & JS](Applying%20Regex%20-%20HTML%20&%20CSS%20&%20JS) | `index.html` · `style.css` · `main.js`          | Connecting regex validation to a styled form with JavaScript                  |
| 4   | [Extras](Extras)                                                                   | `Table.html`                                    | HTML tables — building structured data tables with `colspan` and nested lists |

---

## Stage 1 — HTML - Activities

Raw HTML with no styling. The goal is to understand structure and semantics before worrying about how things look.

### `Basic-html-structure.html` — The HTML Skeleton

The smallest valid HTML document:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi Webpage Tab Title here</title>
  </head>
  <body></body>
</html>
```

What each line does:

| Line                     | Purpose                                                           |
| ------------------------ | ----------------------------------------------------------------- |
| `<!DOCTYPE html>`        | Tells the browser this is an HTML5 document                       |
| `<html lang="en">`       | Root element, `lang` helps screen readers and search engines      |
| `<meta charset="UTF-8">` | Allows all characters (accents, emoji, etc.)                      |
| `<meta name="viewport">` | Makes the page responsive on mobile — without it, phones zoom out |
| `<title>`                | Text shown in the browser tab                                     |

This file is intentionally empty inside `<body>` — it is a starting template you copy for every new page.

---

### `Basic-form.html` — An Unstyled Registration Form

A working form built with only HTML. Contains 8 fields: Name, Email, Username, Gender, Password, Address, Phone, and Date of Birth.

**Key concepts to notice:**

- **`<label for="...">` paired with `<input id="...">`** — Clicking the label focuses the input. This is essential for accessibility. Every input should have a matching label.
- **Input `type` attributes** — `type="text"`, `type="email"`, `type="password"`, `type="tel"`, `type="date"` — each type gives the browser hints (e.g., `type="email"` triggers email keyboard on mobile, `type="date"` shows a date picker).
- **`<select>` with `<option>`** — Used for Gender. It restricts the user to predefined choices.
- **`<br><br>` for spacing** — This works, but it is a temporary approach. You will replace it with CSS in Stage 2.
- **Inline event handler** — `<input type="button" onclick="handleForm()">` — This calls a JavaScript function when clicked. In Stage 3 you will see a cleaner version with `<button>` and `main.js`.

**Takeaway:** HTML gives meaning. `<form>` says "this is a form", `<label>` says "this text describes that input", `type="email"` says "this field expects an email". The browser uses all of that even before CSS or JS.

---

## Stage 2 — CSS - Activities

The same form as Stage 1, now styled. This is where you see how much CSS changes the same HTML content.

### `Designed-Form.html` — The Styled Form

Compare this file side-by-side with `Basic-form.html`. The fields are identical, but the markup is upgraded:

| Improvement                                   | What Changed                                               | Why                                                                                  |
| --------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Card wrapper                                  | `<div class="form-card">` + `<header class="form-header">` | Groups the form visually, adds a title and subtitle                                  |
| Grid layout                                   | `<div class="form-grid">` wrapping the fields              | Two-column layout on desktop, single column on mobile                                |
| Field wrappers                                | Each label+input inside `<div class="form-field">`         | Lets CSS control spacing per field instead of `<br>` tags                            |
| `<button>` instead of `<input type="button">` | `<button type="button" class="btn btn-primary">`           | More flexible for styling and semantics                                              |
| `novalidate` on `<form>`                      | `<form novalidate>`                                        | Disables the browser's built-in validation so your custom JS (Stage 3) can take over |
| `name` and `autocomplete` attributes          | `name="email" autocomplete="email"`                        | Helps browsers autofill correctly                                                    |
| Default option                                | `<option value="">Select gender</option>`                  | Forces the user to make a choice instead of defaulting to Male                       |

**Lesson:** Same content, better structure. HTML classes like `form-card`, `form-grid`, and `form-field` have no built-in meaning — they exist purely as hooks for CSS.

---

### `style.css` — The Stylesheet

This is a single stylesheet shared between Stage 2 and Stage 3 (both `style.css` files are identical). Here is what it covers:

**1. Reset and variables**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #f5f6f8;
  --primary: #2563eb;
  --border: #e2e5ea;
  /* ... */
}
```

- The `*` reset removes inconsistent default margins/padding across browsers. `box-sizing: border-box` makes width/height include padding and border — without it, layouts break in surprising ways.
- CSS variables (`--primary`, `--bg`, etc.) in `:root` act as a design system. Change `--primary` once and every button updates.

**2. Page layout**

```css
body {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
.form-card {
  max-width: 720px;
  border-radius: 14px;
  box-shadow:
    0 1px 2px rgba(17, 24, 39, 0.04),
    0 8px 24px rgba(17, 24, 39, 0.06);
}
```

- `display: flex` + `justify-content: center` on the body centers the card horizontally.
- `max-width: 720px` prevents the form from stretching too wide on large screens.

**3. Two-column Grid**

```css
.registration-form .form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 28px;
  row-gap: 20px;
}
```

- `1fr 1fr` means two equal columns. Each field takes one cell.
- On small screens, the media query collapses to one column:

```css
@media (max-width: 640px) {
  .registration-form .form-grid {
    grid-template-columns: 1fr;
  }
}
```

**4. Input styling and states**

```css
.form-field input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--focus-ring);
}
.form-field input:hover {
  border-color: #adb5bd;
}
.form-field select {
  /* custom dropdown arrow via background-image */
}
```

- `:focus` gives a blue ring when the user tabs/clicks into a field — critical for keyboard navigation.
- `:hover` gives subtle feedback before clicking.
- The custom `background-image` on `<select>` replaces the browser's default arrow with an SVG chevron.

**5. Button**

```css
.btn-primary {
  background: var(--primary);
  color: #fff;
}
.btn-primary:hover {
  background: var(--primary-hover);
}
.btn-primary:active {
  background: var(--primary-active);
  transform: translateY(1px);
}
```

- Three states: default, hover, and active (pressed). The `translateY(1px)` on `:active` makes the button feel like it moves when clicked.

**Hints:**

- Always use `box-sizing: border-box`. Forgetting it is one of the most common CSS bugs — an element with `width: 100%` plus `padding: 20px` overflows its container without it.
- Keep colors in CSS variables. If you hardcode `#2563eb` in 10 places, changing the theme later means 10 edits.
- The media query (`@media`) is what makes the form responsive. Without it, the two-column grid would be cramped on phones.

---

## Stage 3 — Applying Regex - HTML & CSS & JS

The final stage — the same styled form now validates user input using the regex patterns from Week 01.

The HTML (`index.html`) and CSS (`style.css`) are the same as Stage 2. The only addition is:

```html
<script src="main.js"></script>
```

This connects the validation logic.

### `main.js` — Form Validation with Regular Expressions

**1. The regex map**

```js
const expressions = {
  nameRegex: /^[a-zA-Z]+(?:['\s-][a-zA-Z]+)+$/,
  emailRegex: /^[a-zA-Z0-9_.]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/,
  unameRegex: /^@[a-zA-Z_]{5,}$/,
  genderRegex: /^(male|female|other)$/i,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
  addressRegex: /^[A-Z]{2} [a-zA-Z0-9 ]+$/,
  phoneRegex: /^\+250[0-9]{9}$/,
  dobRegex: /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/,
};
```

What each pattern checks:

| Field         | Pattern                                           | Rule                                                                                                                       |
| ------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Name          | `/^[a-zA-Z]+(?:['\s-][a-zA-Z]+)+$/`               | At least two words (first + last name), letters only, allows `'` `-` and spaces between words                              |
| Email         | `/^[a-zA-Z0-9_.]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/`    | Basic email. Note: TLD limited to 2–3 chars (`{2,3}`) — see hint below                                                     |
| Username      | `/^@[a-zA-Z_]{5,}$/`                              | Starts with `@`, at least 5 letters/underscores after it                                                                   |
| Gender        | `/^(male\|female\|other)$/i`                      | One of the three values, case-insensitive (`i` flag)                                                                       |
| Password      | `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/` | 8+ chars with lowercase, uppercase, digit, and special character (lookaheads — same technique as Week 01 `password-regex`) |
| Address       | `/^[A-Z]{2} [a-zA-Z0-9 ]+$/`                      | Two uppercase letters, a space, then letters/digits/spaces (e.g., `KG 123 Kigali`)                                         |
| Phone         | `/^\+250[0-9]{9}$/`                               | Rwanda number: `+250` followed by exactly 9 digits                                                                         |
| Date of Birth | `/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/`                 | `YYYY-MM-DD` or `YYYY/MM/DD` (e.g., `2000-05-15`)                                                                          |

**2. How validation works**

```js
function handleForm() {
  let isValid = true;

  if (expressions.nameRegex.test(nameField.value.trim())) {
    nameField.style.borderColor = "";
    clearError(nameField);
  } else {
    isValid = false;
    nameField.style.borderColor = "red";
    throwError(
      "The name field should have your FirstName and LastName",
      nameField,
    );
  }
  // ... same pattern for every field ...

  if (isValid) {
    alert("Form submitted successfully!");
  }
}
```

For each field:

- `regex.test(value)` returns `true` or `false`.
- If `true` → clear any previous error, reset the border.
- If `false` → set `isValid = false`, turn the border red, show an error.
- At the end, if every field passed (`isValid` is still `true`), show the success message.

**3. Helper functions**

```js
function throwError(text, textField) {
  const parent = textField.parentElement;
  const old = parent.querySelector(".error");
  if (old) old.remove();
  const errorSpan = document.createElement("span");
  errorSpan.className = "error";
  errorSpan.textContent = text;
  parent.appendChild(errorSpan);
}

function clearError(textField) {
  const old = textField.parentElement.querySelector(".error");
  if (old) old.remove();
}
```

- `throwError` creates a `<span class="error">` inside the field wrapper and removes any old error first (so you never stack duplicate messages).
- `clearError` removes the error span when the field becomes valid.

**4. The phone number detail**

```js
const cleanPhone = phoneField.value.replace(/\s+/g, "");
if (expressions.phoneRegex.test(cleanPhone)) { ... }
```

The user might type `+250 788 123 456` with spaces (that is what the placeholder shows), but the regex expects `+250788123456` with no spaces. `replace(/\s+/g, "")` strips all whitespace before testing. This is a common pattern — clean the input, then validate.

---

## Extras — Tables with `Extras/Table.html`

A bonus activity that shows how to build structured data tables in HTML. The example is a recreation of the ALU School Bus Schedule for Kigali (Monday – Thursday).

**File:** [`Extras/Table.html`](Extras/Table.html)

### What the file builds

A `<table border="1">` with 5 rows:

| Row | Content                                                                 |
| --- | ----------------------------------------------------------------------- |
| 1   | Full-width header — Transport Schedule title (uses `colspan="2"`)       |
| 2   | `Morning` + route description (`From Gikondo, Sonatube ...`)            |
| 3   | `1. Round in Morning.` + detailed timetable with `<ul>` inside a `<td>` |
| 4   | `Afternoon` + return route description                                  |
| 5   | `Round 1` + afternoon stops with `<ul>` inside a `<td>`                 |

### Key concepts

**1. Basic table structure**

```html
<table>
  <tr>
    <!-- table row -->
    <td>Morning</td>
    <!-- table data cell -->
    <td>From Gikondo ...</td>
  </tr>
</table>
```

- `<table>` wraps the whole table.
- `<tr>` is a row. Every row contains one or more `<td>` (data) or `<th>` (header) cells.
- In this file all cells use `<td>`. For a more semantic version, the top title cell and any column headers should use `<th>`.

**2. `colspan` — spanning columns**

```html
<td colspan="2">
  <h2>Transport Schedule for Students Around Kigali (Monday - Thursday)</h2>
</td>
```

- `colspan="2"` makes the title cell stretch across both columns. Without it you would have two separate cells on that row.
- `rowspan` is the vertical equivalent — it makes a cell span multiple rows (not used here, but useful for schedules where one label covers several time slots).

**3. Nesting other elements inside `<td>`**

```html
<td>
  <b>07:50 AM - 08:20AM</b>
  <ul>
    <li><b>07:20</b> - Rebero</li>
    <li><b>07:30</b> - Merez II / Merez I</li>
  </ul>
</td>
```

- A `<td>` can contain almost any HTML — headings, lists, bold text. Here each timetable cell holds a bold time range plus a `<ul>` of stops.
- This is valid HTML. Tables are for tabular data, and a list of stops per time slot is tabular data.

**4. `border="1"` — quick borders**

- `border="1"` on `<table>` adds a simple border around every cell. It works and is fine for learning.
- For real projects, prefer CSS: `table, td, th { border: 1px solid #ccc; border-collapse: collapse; }` — it gives you control over color, spacing, and style. The HTML attribute is kept here for simplicity.

### How to improve this table

If you want to take it further:

- Replace the title `<td>` with `<th colspan="2">` — screen readers announce `<th>` as headers, which helps accessibility.
- Wrap header rows in `<thead>` and body rows in `<tbody>` — makes styling easier and helps assistive tech.
- Move `border="1"` to CSS and add `border-collapse: collapse` so borders don't double up.
- Add `scope="col"` or `scope="row"` on header cells for accessibility.

### Try it yourself

- Open `Extras/Table.html` in the browser and inspect the table.
- Try adding a new row for a Friday schedule.
- Try changing `colspan="2"` to `colspan="1"` and see how the layout breaks — that shows what spanning does.
- Try converting the first row to use `<th>` and see if the text becomes bold/centered by default (browsers style `<th>` differently from `<td>`).

---

## How the Three Stages Connect

```
Stage 1                Stage 2                 Stage 3
HTML only    --->      HTML + CSS       --->   HTML + CSS + JS
Structure              Structure + Style        Structure + Style + Behavior
<br> spacing            Grid layout              Regex validation
No styling             Responsive               Error messages
                       Hover/focus states       Red borders on failure
```

If you only do Stage 1, you have a working form that looks plain.
If you add Stage 2, it looks professional and works on phones.
If you add Stage 3, it guides the user and catches mistakes before submission.

---

## How to Run

**Option 1 — Open in browser**
Double-click any `.html` file. For Stage 3, open `Applying Regex - HTML & CSS & JS/index.html` and try submitting the form with valid and invalid inputs.

**Option 2 — VS Code Live Server**
Right-click the HTML file and select "Open with Live Server" so changes to CSS/JS reload instantly.

**What to test in Stage 3:**

| Try This                           | Expected                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| Leave Name as `John` (one word)    | ❌ Error — needs first + last name                                           |
| Enter `John Doe`                   | ✅ Passes                                                                    |
| Enter `test@gmail.com`             | ✅ Passes                                                                    |
| Enter `notanemail`                 | ❌ Alert — invalid email                                                     |
| Enter `@john` for Username         | ❌ Alert — needs 5+ chars after `@`                                          |
| Enter `@johndoe`                   | ✅ Passes                                                                    |
| Enter `weak` for Password          | ❌ Alert — needs upper, lower, digit, special, 8+ chars                      |
| Enter `StrongPass1!`               | ✅ Passes                                                                    |
| Enter `Kigali` for Address         | ❌ Alert — needs two uppercase letters + space first (e.g., `KG 123 Kigali`) |
| Enter `+250 788 123 456` for Phone | ✅ Passes (spaces are stripped before validation)                            |
| Select no Gender                   | ❌ Alert                                                                     |

---

## Hints and Common Pitfalls

- **`<br>` is not layout.** It works for quick spacing but breaks as soon as you need responsive design. Use CSS Grid or Flexbox instead — that is exactly what Stage 2 demonstrates.
- **`novalidate` matters.** Without it on the `<form>`, the browser shows its own validation popup (e.g., "Please include an @") which conflicts with your custom JS messages.
- **`.trim()` before testing.** Always trim whitespace — a user who types `  test@gmail.com  ` with accidental spaces should not fail validation.
- **Inconsistent error display.** In `main.js`, the Name field uses `throwError()` (inline message under the field) while other fields use `alert()`. For a polished form, prefer one approach — inline messages are less disruptive than alerts.
- **Email TLD `{2,3}` is restrictive.** The Week 01 `email-regex` uses `{2,}` (2 or more), but this file uses `{2,3}` which rejects newer TLDs like `.info` or `.travel` (4+ chars). If you want to be more permissive, change it to `{2,}`.
- **`type="date"` returns `YYYY-MM-DD`.** The `dobRegex` allows both `-` and `/` separators (`[-/]`), but the native date picker always produces `-`. The `/` support is for typed input fallback.

---

## Learning Objectives

By the end of Week 02 you should be able to:

1. Write a valid HTML5 document from memory (`<!DOCTYPE>`, `<head>`, `<meta>`, `<body>`)
2. Build a form with `<label>`, `<input>`, `<select>`, and `<button>` with correct `for`/`id` pairing
3. Explain why `box-sizing: border-box` and the viewport meta tag are essential
4. Style a form with CSS Grid, Flexbox, CSS variables, and pseudo-classes (`:hover`, `:focus`, `:active`)
5. Make a layout responsive with `@media` queries
6. Use JavaScript + regex (`regex.test()`) to validate form input before submission
7. Show and clear inline error messages by manipulating the DOM (`createElement`, `appendChild`, `remove`)

---

## References

W3Schools is recommended for this week because the explanations are short, visual, and each page has a live "Try it Yourself" editor. Use them alongside the files above.

**HTML basics (Stage 1)**

- [W3Schools — HTML Introduction](https://www.w3schools.com/html/html_intro.asp) — what HTML is and how a document is structured
- [W3Schools — HTML Elements](https://www.w3schools.com/html/html_elements.asp) — tags, content, and nesting
- [W3Schools — HTML Attributes](https://www.w3schools.com/html/html_attributes.asp) — `id`, `class`, `type`, `placeholder`, etc.
- [W3Schools — HTML Head](https://www.w3schools.com/html/html_head.asp) — `<title>`, `<meta>`, and what goes inside `<head>`
- [W3Schools — HTML Forms](https://www.w3schools.com/html/html_forms.asp) — overview of `<form>`, `<input>`, `<label>`, `<select>`
- [W3Schools — HTML Input Types](https://www.w3schools.com/html/html_form_input_types.asp) — `text`, `email`, `password`, `tel`, `date`, `button`
- [W3Schools — HTML Input Attributes](https://www.w3schools.com/html/html_form_attributes.asp) — `placeholder`, `required`, `autocomplete`, `novalidate`

**HTML tables (Extras)**

- [W3Schools — HTML Tables](https://www.w3schools.com/html/html_tables.asp) — `<table>`, `<tr>`, `<th>`, `<td>` basics
- [W3Schools — HTML Table Borders](https://www.w3schools.com/html/html_table_borders.asp) — `border`, `border-collapse`
- [W3Schools — HTML Table Sizes](https://www.w3schools.com/html/html_table_sizes.asp) — width, height, padding
- [W3Schools — HTML Table Headers](https://www.w3schools.com/html/html_table_headers.asp) — using `<th>` and `scope`
- [W3Schools — HTML Table Colspan & Rowspan](https://www.w3schools.com/html/html_table_colspan_rowspan.asp) — spanning rows and columns
- [W3Schools — HTML Table Styling](https://www.w3schools.com/html/html_table_styling.asp) — zebra stripes, hover, responsive tables

**CSS (Stage 2)**

- [W3Schools — CSS Introduction](https://www.w3schools.com/css/css_intro.asp) — how CSS connects to HTML
- [W3Schools — CSS Syntax](https://www.w3schools.com/css/css_syntax.asp) — selectors, properties, values
- [W3Schools — CSS Box Model](https://www.w3schools.com/css/css_boxmodel.asp) — content, padding, border, margin and why `box-sizing: border-box` matters
- [W3Schools — CSS Selectors](https://www.w3schools.com/css/css_selectors.asp) — class, id, pseudo-classes
- [W3Schools — CSS Colors & Variables](https://www.w3schools.com/css/css3_variables.asp) — CSS custom properties (`--primary` etc.)
- [W3Schools — CSS Grid](https://www.w3schools.com/css/css_grid.asp) — `display: grid`, `grid-template-columns`, `gap`
- [W3Schools — CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) — `display: flex`, `justify-content`, `align-items`
- [W3Schools — CSS Pseudo-classes](https://www.w3schools.com/css/css_pseudo_classes.asp) — `:hover`, `:focus`, `:active`
- [W3Schools — CSS Media Queries / Responsive](https://www.w3schools.com/css/css_rwd_mediaqueries.asp) — `@media` and making layouts work on mobile

**JavaScript + Regex validation (Stage 3)**

- [W3Schools — JavaScript Forms / Validation](https://www.w3schools.com/js/js_validation.asp) — basic form validation flow
- [W3Schools — JavaScript RegExp](https://www.w3schools.com/js/js_regexp.asp) — `test()`, `match()`, regex in JS
- [W3Schools — JavaScript HTML DOM](https://www.w3schools.com/js/js_htmldom.asp) — `getElementById`, `createElement`, `appendChild`
- [W3Schools — JavaScript Events](https://www.w3schools.com/js/js_events.asp) — `onclick`, event handling

**Other useful tools**

- [Regex101](https://regex101.com) — paste any pattern from `main.js` to see step-by-step matching
- Week 01 patterns: revisit `week-01-regular-expressions/` — the password lookaheads in `main.js` use the same technique

---

## Next Up

Week 03 will extend these fundamentals with more advanced HTML and CSS. Until then, make sure you can build the Week 02 form from scratch and explain every regex in `main.js` without looking.
