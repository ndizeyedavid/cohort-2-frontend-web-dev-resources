# Week 03 — Advanced HTML and CSS

**Prerequisites:** Week 02 — Basic HTML and CSS
**Assessment:** Non-graded practice — this is where structure and style become professional.

In Week 02 you built a form and made it responsive. This week you go deeper: semantic markup that machines understand, real data tables, one-dimensional layouts with Flexbox, two-dimensional layouts with Grid, decorative content with pseudo-elements, and motion with transitions and animations.

---

## What's Included

| #   | Folder                                               | Files                     | What You Learn                                                                        |
| --- | ---------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| 1   | [semantic-html](semantic-html)                       | `index.html`              | Semantic tags — `header`, `nav`, `main`, `section`, `footer`                          |
| 2   | [lists](lists)                                       | `index.html`              | Ordered and unordered lists — `<ol>`, `<ul>`, `<li>`                                  |
| 3   | [tables](tables)                                     | `index.html`              | Data tables — `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`                         |
| 4   | [pseudo-elements](pseudo-elements)                   | `index.html` · `main.css` | `::before` and `::after` — decorative content without extra HTML                      |
| 5   | [flexbox](flexbox)                                   | `index.html` · `main.css` | Flexbox — main axis, cross axis, wrapping, centering                                  |
| 6   | [grid](grid)                                         | `index.html` · `main.css` | CSS Grid — rows, columns, `gap`, `grid-area`, spanning                                |
| 7   | [animations](animations)                             | `index.html` · `main.css` | Transitions and `@keyframes` animations                                               |
| 8   | [extra / crate-digging](extra/crate-digging)         | `index.html` · `main.css` | Extra — Flexbox record shelf (wrapping, `flex: 1 1 260px`, `gap`)                     |
| 9   | [extra / the-kigali-review](extra/the-kigali-review) | `index.html` · `main.css` | Extra — Grid editorial / newspaper ( `grid-template-areas`, spanning)                 |
| 10  | [extra / late-night-menu](extra/late-night-menu)     | `index.html` · `main.css` | Extra — Animations + pseudo-elements diner menu ( `::before`/`::after`, `@keyframes`) |

> All folders are self-contained — open any `index.html` in the browser to see the result.

---

## 1 — Semantic HTML with `semantic-html/index.html`

**File:** [`semantic-html/index.html`](semantic-html/index.html)

A landing page that uses semantic tags instead of generic `<div>` everywhere:

```html
<header>
  <div id="logo-container"><img src="..." alt="Logo" /></div>
  <nav>
    <a href="#">Courses</a>
    <a href="#">Pricing</a>
    <a href="#">Login</a>
  </nav>
</header>

<main>
  <h1>Get Schooled</h1>
  <div id="hero-text">
    <span>SMILES</span><span>GRIN</span><span>LAUGH</span>
  </div>
  <button>REGISTER FOR FREE</button>
</main>

<section id="testimonial">
  <img src="..." alt="testimonial image" />
  <div id="quote">
    <blockquote>"Those tutorials are concise ..."</blockquote>
    <div id="author">
      <h3>Person Name</h3>
      <i>weather presenter</i>
    </div>
  </div>
</section>

<footer>
  <img src="..." alt="logo" />
  <img src="..." alt="social icons" />
  <span>&copy;Mellow 2026 | Made with 🍟 and Care ...</span>
</footer>
```

**What each tag means:**

| Tag            | Purpose                             | Why not just `<div>`?                                  |
| -------------- | ----------------------------------- | ------------------------------------------------------ |
| `<header>`     | Intro area — logo + navigation      | Screen readers know this is the page header            |
| `<nav>`        | Navigation links                    | Screen readers can jump directly to navigation         |
| `<main>`       | Primary content (only one per page) | Search engines know this is the most important section |
| `<section>`    | Thematic grouping (testimonial)     | Gives structure that `<div>` does not                  |
| `<blockquote>` | A quote from someone else           | Browsers and screen readers announce it as a quotation |
| `<footer>`     | Closing area — copyright, links     | Same as header but at the bottom                       |

**Takeaway:** `<div>` says nothing. Semantic tags tell browsers, search engines, and screen readers what each part _is_. The page looks the same either way — the difference is meaning.

**How to improve this file:**

- Add `aria-label` to `<nav>` if you have more than one nav on a page.
- Use `<figure>` + `<figcaption>` around the testimonial image and quote for even better semantics.

---

## 2 — Lists with `lists/index.html`

**File:** [`lists/index.html`](lists/index.html)

Two lists that show the difference between ordered and unordered:

```html
<!-- Ordered — the order matters -->
<ol>
  <li>Fries</li>
  <li>Steak</li>
  <li>Pizza</li>
</ol>

<!-- Unordered — the order doesn't matter -->
<ul>
  <li>Ghost of Yotei</li>
  <li>GTA VI</li>
  <li>Euro Truck Simulator</li>
</ul>
```

**Key points:**

- `<ol>` numbers items automatically (1, 2, 3...). Use it when sequence matters — steps, rankings, instructions.
- `<ul>` uses bullets. Use it when order does not matter — features, favourites, navigation links.
- `<li>` is the only direct child allowed inside `<ol>` or `<ul>`.
- You can nest lists — a `<ul>` inside an `<li>` creates a sub-list. Useful for dropdown menus or grouped content.

**Try it:**

- Change `<ol>` to `<ul>` and see the numbers become bullets.
- Add `type="A"` to `<ol>` — it counts A, B, C instead of 1, 2, 3. Try `type="i"` for roman numerals.
- Add `start="5"` to `<ol>` — it starts counting from 5.

---

## 3 — Tables with `tables/index.html`

**File:** [`tables/index.html`](tables/index.html)

A weekly class timetable (09:00–05:00, Monday to Friday), built with proper table semantics:

```html
<table border="1">
  <thead>
    <tr>
      <th>Time</th>
      <th>Mon</th>
      <th>Tue</th>
      ...
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>09:00 - 11:00</td>
      <td>Frontend Web Development</td>
      ...
    </tr>
  </tbody>
</table>
```

This expands on Week 02's `Extras/Table.html`:

| What's new vs Week 02               | Why it matters                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| `<thead>` and `<tbody>`             | Splits header from body — helps screen readers and makes CSS targeting easier |
| `<th>` for every header cell        | Screen readers announce `<th>` as headers; `<td>` is just data                |
| 6 columns (Time + Mon–Fri), 10 rows | More realistic — shows how tables handle lots of data                         |
| Empty `<td></td>` for free periods  | An empty cell still needs a `<td>` — if you skip it, columns misalign         |

**Hints:**

- `border="1"` is the quick HTML way to add borders. For production, prefer CSS: `table, th, td { border: 1px solid #ccc; border-collapse: collapse; }`.
- Add `scope="col"` on header `<th>` cells (e.g., `<th scope="col">Mon</th>`) so screen readers know the header applies to the column below it.
- For responsive tables on mobile, wrap the table in a `<div style="overflow-x: auto;">` so it scrolls horizontally instead of breaking the layout.

---

## 4 — Pseudo-elements with `pseudo-elements/`

**Folder:** [`pseudo-elements/`](pseudo-elements) — `index.html` + `main.css`

Pseudo-elements let you add decorative content before or after an element without changing the HTML.

```css
/* Adds content before the element */
h2::before {
  content: "→ ";
  color: #2563eb;
}

/* Adds content after the element */
h2::after {
  content: "";
  display: block;
  width: 40px;
  height: 3px;
  background: #2563eb;
}
```

> `::before` and `::after` both require `content` — even if it is just `content: ""` for a shape. Without `content`, nothing renders.

**What the demo page shows:**

| #   | Demo                                    | Technique                                                                 |
| --- | --------------------------------------- | ------------------------------------------------------------------------- |
| 1   | Fancy quote with opening/closing quotes | `content: "\201C"` / `"\201D"` (unicode quotes) + `position: absolute`    |
| 2   | Heading with coloured underline bar     | `content: ""` + `position: absolute` + `width`/`height`/`background`      |
| 3   | Custom bullets (🍟 instead of dots)     | `list-style: none` + `li::before { content: "🍟"; }`                      |
| 4   | Tooltip on hover                        | `attr(data-tip)` reads the HTML attribute + `opacity` transition on hover |
| 5   | "NEW" badge on a card                   | `content: "NEW"` + `position: absolute` in the corner                     |

**Fun snippets to try yourself:**

**Gradient underline that grows on hover:**

```css
h2 {
  position: relative;
  display: inline-block;
}
h2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #2563eb, #f59e0b);
  transition: width 0.3s ease;
}
h2:hover::after {
  width: 100%;
}
```

**Numbered steps with circles:**

```css
.steps {
  counter-reset: step;
  list-style: none;
}
.steps li {
  counter-increment: step;
  position: relative;
  padding-left: 36px;
}
.steps li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  background: #2563eb;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
}
```

**Common pitfall:** `::before` and `::after` are **not** real DOM elements — JavaScript cannot select them with `querySelector`, and screen readers may not announce their `content`. Use them for decoration only, never for important information.

---

## 5 — Flexbox with `flexbox/`

**Folder:** [`flexbox/`](flexbox) — `index.html` + `main.css`

Flexbox is a **one-dimensional** layout system — it arranges items along a single axis (row or column). You control the main axis and the cross axis separately.

```
Main axis  → → →  (default: left to right)
Cross axis ↓
             (perpendicular to main axis)
```

**Key properties from the slides:**

| Property          | Axis       | What it does                                                       |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| `justify-content` | Main axis  | Aligns items along the row (or column if `flex-direction: column`) |
| `align-items`     | Cross axis | Aligns items perpendicular to the main axis                        |
| `flex-wrap`       | —          | Allows items to wrap to the next line instead of shrinking         |

**What the demo page shows:**

| #   | Demo                                                          | Key CSS                                                                       |
| --- | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | Perfect centering (both axes)                                 | `display: flex; justify-content: center; align-items: center; height: 160px;` |
| 2   | `justify-content` — `space-between`, `space-around`, `center` | Three rows, same children, different `justify-content`                        |
| 3   | `align-items` — `flex-start`, `center`, `stretch`             | Tall container with different-height items                                    |
| 4   | `flex-wrap: wrap` + `flex: 1 1 160px`                         | Cards that wrap responsively — resize the window                              |
| 5   | Real navbar                                                   | `display: flex; justify-content: space-between; align-items: center;`         |

**Fun snippets to try yourself:**

**Equal-height cards that wrap:**

```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card-row .card {
  flex: 1 1 200px; /* grow, shrink, minimum width */
}
```

**Centering anything (the classic Flexbox trick):**

```css
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

**Auto-margin for pushing one item to the end:**

```css
.navbar {
  display: flex;
}
.navbar .logout {
  margin-left: auto;
} /* pushes logout to the far right */
```

**Common pitfall:** Forgetting that `justify-content` and `align-items` swap meaning when you change `flex-direction`. If you set `flex-direction: column`, then `justify-content` controls vertical alignment and `align-items` controls horizontal.

---

## 6 — CSS Grid with `grid/`

**Folder:** [`grid/`](grid) — `index.html` + `main.css`

Grid is a **two-dimensional** system — you control rows and columns at the same time. Flexbox is one row or one column; Grid is both.

**Key properties from the slides:**

| Property                | What it does                                               |
| ----------------------- | ---------------------------------------------------------- |
| `grid-template-columns` | Defines number and width of columns                        |
| `grid-template-rows`    | Defines number and height of rows                          |
| `gap`                   | Space between rows and columns (replaces old margin hacks) |
| `grid-area`             | Names an area so you can place items by name               |

**What the demo page shows:**

| #   | Demo                                | Key CSS                                                                              |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | 3 equal columns                     | `grid-template-columns: 1fr 1fr 1fr; gap: 12px;`                                     |
| 2   | Responsive gallery (no media query) | `repeat(auto-fit, minmax(140px, 1fr))` — columns appear/disappear as you resize      |
| 3   | Named areas layout                  | `grid-template-areas: "header header header" "nav main side" "footer footer footer"` |
| 4   | Spanning                            | `grid-column: span 2; grid-row: span 2;` — featured card takes 2x2                   |

**Fun snippets to try yourself:**

**Holy grail layout in 5 lines:**

```css
.page {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  gap: 12px;
  min-height: 100vh;
}
.page header {
  grid-area: header;
}
.page nav {
  grid-area: nav;
}
.page main {
  grid-area: main;
}
.page aside {
  grid-area: aside;
}
.page footer {
  grid-area: footer;
}
```

**Masonry-style gallery:**

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
```

**The `auto-fit` vs `auto-fill` difference:** Both create as many columns as fit. `auto-fit` collapses empty tracks (items stretch to fill), `auto-fill` keeps them (items stay their size with empty space). Try swapping them in Demo 2 to see the difference.

---

## 7 — Transitions and Animations with `animations/`

**Folder:** [`animations/`](animations) — `index.html` + `main.css`

Two ways to add motion: **transitions** (smooth change between two states) and **animations** (custom multi-step movement with `@keyframes`).

**Transitions — smooth property changes:**

```css
.button {
  background: #2563eb;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}
.button:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}
```

| Property                     | Meaning                                                            |
| ---------------------------- | ------------------------------------------------------------------ |
| `transition-property`        | What to animate (e.g., `background-color`, `transform`, `opacity`) |
| `transition-duration`        | How long it takes (e.g., `0.3s`, `500ms`)                          |
| `transition-delay`           | Wait before starting (e.g., `0.1s`)                                |
| `transition-timing-function` | Speed curve (`ease`, `ease-in-out`, `linear`)                      |

Shorthand: `transition: background-color 0.3s ease 0s;` — property, duration, easing, delay.

**Animations — custom movement with `@keyframes`:**

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.box {
  animation: slideIn 0.8s ease-out;
}
```

```css
/* Infinite bounce */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
.ball {
  animation: bounce 0.8s ease-in-out infinite;
}
```

**What the demo page shows:**

| #   | Demo                                           | Technique                                                           |
| --- | ---------------------------------------------- | ------------------------------------------------------------------- |
| 1   | Button that scales and changes colour on hover | `transition: background-color, transform`                           |
| 2   | Box that slides in from the left on page load  | `@keyframes slideIn` + `animation: slideIn 0.8s ease-out`           |
| 3   | Pulsing dot (infinite)                         | `@keyframes pulse` + `animation: pulse 1.5s infinite`               |
| 4   | Bouncing basketball                            | `@keyframes bounce` + `animation: bounce 0.8s infinite`             |
| 5   | Loading spinner                                | `border-top-color` + `@keyframes spin { to { rotate: 360deg } }`    |
| 6   | Card that lifts with shadow on hover           | `transition: transform, box-shadow` + `transform: translateY(-6px)` |

**Fun snippets to try yourself:**

**Fade-in on page load:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.hero {
  animation: fadeIn 1s ease-in;
}
```

**Shake on error:**

```css
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-6px);
  }
  75% {
    transform: translateX(6px);
  }
}
.input-error {
  animation: shake 0.3s ease;
  border-color: #ef4444;
}
```

**Underline that draws itself:**

```css
.link {
  position: relative;
}
.link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: #2563eb;
  transition: width 0.3s ease;
}
.link:hover::after {
  width: 100%;
}
```

**Hint:** Use `transform` and `opacity` for animations — they are GPU-accelerated and stay smooth at 60fps. Avoid animating `width`, `height`, `top`, or `left` for large elements, as those trigger layout recalculation and can feel janky.

---

## 8 — Extra Projects — Putting It All Together

Three non-generic projects that combine the week's concepts into something you would actually want to show someone. Each has a distinct style, palette, and personality. Open them, steal the patterns, remix them.

| Project           | Folder                                               | Main Concepts                                                                                                                     | Vibe                                                                            |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Crate Digging     | [`extra/crate-digging`](extra/crate-digging)         | Flexbox (`flex-wrap`, `flex: 1 1 260px`, `gap`, `justify-content`/`align-items`) + pseudo-element vinyl peek + `transition` hover | Brutalist record store — cream paper, chunky borders, vinyl that peeks on hover |
| The Kigali Review | [`extra/the-kigali-review`](extra/the-kigali-review) | Grid (`grid-template-areas`, spanning, responsive reflow) + semantic structure                                                    | Editorial newspaper — serif headlines, double-rule masthead, 3-col to 1-col     |
| Late Night Menu   | [`extra/late-night-menu`](extra/late-night-menu)     | Pseudo-elements (`::before` badges, `::after` dotted leaders) + `transition` + `@keyframes` flicker                               | Diner at 1am — dark, neon, dotted leaders between name and price                |

**What to steal from each:**

- **Crate Digging** — The shelf needs no media queries. `display: flex; flex-wrap: wrap; gap: 20px` + `flex: 1 1 260px` on each card does all the responsive work. The vinyl peek is a single `::after` with `opacity` + `right` transition.
- **The Kigali Review** — The whole page is one grid with `grid-template-areas: "lead lead side" "a b c" "strip strip strip"`. To rearrange, you change one line. The strip at the bottom is a nested grid (`repeat(4, 1fr)`). On mobile it collapses to `1fr`.
- **Late Night Menu** — The dotted line between dish name and price is a flex `::after` (`flex: 1; border-bottom: 2px dotted`), not a hack. The description reveals with `max-height` + `opacity` transition on hover. The neon uses `@keyframes flicker` with staggered `opacity` stops. NEW and SOLD OUT are `::before` — no extra HTML.

Try opening all three and resizing the window — each responds differently, and each does it with a different layout system.

---

## How It All Connects

```
Week 02                     Week 03
HTML structure  ─────────►  Semantic HTML (meaningful structure)
Basic form      ─────────►  Lists + Tables (more content types)
CSS Grid (form) ─────────►  Flexbox + Grid deep dive (any layout)
Styled inputs   ─────────►  Pseudo-elements (decoration without HTML)
Static page     ─────────►  Transitions & Animations (motion)
```

Week 02 taught you to build one layout (a form). Week 03 gives you the tools to build _any_ layout and make it feel alive.

---

## How to Run

Open any `index.html` in the browser:

- `semantic-html/index.html` — landing page structure
- `lists/index.html` — ordered vs unordered lists
- `tables/index.html` — weekly timetable
- `pseudo-elements/index.html` — 5 decorative demos
- `flexbox/index.html` — 5 flexbox layouts (resize to see wrapping)
- `grid/index.html` — 4 grid layouts (resize to see responsive gallery)
- `animations/index.html` — 6 motion demos (hover and watch)
- `extra/crate-digging/index.html` — flexbox record shelf
- `extra/the-kigali-review/index.html` — grid editorial
- `extra/late-night-menu/index.html` — diner menu with motion + pseudo-elements

Or use VS Code Live Server for instant reload.

---

## Learning Objectives

By the end of Week 03 you should be able to:

1. Choose the right semantic tag (`header`, `nav`, `main`, `section`, `footer`, `blockquote`) and explain why it matters for accessibility and SEO
2. Build ordered and unordered lists and know when to use each
3. Create data tables with `<thead>`, `<tbody>`, `<th>`, `<td>` and make them accessible with `scope`
4. Use `::before` and `::after` to add decorative content (quotes, underlines, bullets, tooltips, badges) without extra HTML
5. Explain main axis vs cross axis and use `justify-content`, `align-items`, and `flex-wrap` to build any one-dimensional layout
6. Use `grid-template-columns`, `grid-template-rows`, `gap`, and `grid-area` to build two-dimensional layouts and responsive galleries
7. Create smooth hover effects with `transition` and custom motion with `@keyframes` and `animation`
8. Know which CSS properties to animate for best performance (`transform` and `opacity`)

---

## References

W3Schools is recommended because every page has a live "Try it Yourself" editor — change the code and see the result instantly.

**Semantic HTML**

- [W3Schools — Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp) — `header`, `nav`, `main`, `section`, `footer`, `article`, `aside`
- [W3Schools — HTML Blockquote](https://www.w3schools.com/tags/tag_blockquote.asp) — quoting with `<blockquote>`

**Lists**

- [W3Schools — HTML Lists](https://www.w3schools.com/html/html_lists.asp) — `<ol>`, `<ul>`, `<li>` overview
- [W3Schools — Ordered Lists](https://www.w3schools.com/html/html_lists_ordered.asp) — `type`, `start` attributes
- [W3Schools — Unordered Lists](https://www.w3schools.com/html/html_lists_unordered.asp) — bullet styles, nesting

**Tables**

- [W3Schools — HTML Tables](https://www.w3schools.com/html/html_tables.asp) — `<table>`, `<tr>`, `<th>`, `<td>` basics
- [W3Schools — Table Borders](https://www.w3schools.com/html/html_table_borders.asp) — `border`, `border-collapse`
- [W3Schools — Table Headers](https://www.w3schools.com/html/html_table_headers.asp) — `<th>` and `scope`
- [W3Schools — Table Colspan & Rowspan](https://www.w3schools.com/html/html_table_colspan_rowspan.asp) — spanning cells

**Pseudo-elements**

- [W3Schools — Pseudo-elements](https://www.w3schools.com/css/css_pseudo_elements.asp) — `::before`, `::after`, `::first-line`, `::selection`
- [W3Schools — CSS Content Property](https://www.w3schools.com/cssref/pr_content.php) — what `content` can do

**Flexbox**

- [W3Schools — CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) — `display: flex`, `justify-content`, `align-items`, `flex-wrap`
- [W3Schools — Flex Container](https://www.w3schools.com/css/css3_flexbox_container.asp) — container properties in detail
- [W3Schools — Flex Items](https://www.w3schools.com/css/css3_flexbox_items.asp) — `flex`, `order`, `align-self`

**Grid**

- [W3Schools — CSS Grid](https://www.w3schools.com/css/css_grid.asp) — `display: grid` intro
- [W3Schools — Grid Container](https://www.w3schools.com/css/css_grid_container.asp) — `grid-template-columns`, `grid-template-rows`, `gap`
- [W3Schools — Grid Item](https://www.w3schools.com/css/css_grid_item.asp) — `grid-column`, `grid-row`, `grid-area`

**Transitions and Animations**

- [W3Schools — CSS Transitions](https://www.w3schools.com/css/css3_transitions.asp) — `transition`, `transition-delay`, timing functions
- [W3Schools — CSS Animations](https://www.w3schools.com/css/css3_animations.asp) — `@keyframes`, `animation` shorthand
- [W3Schools — CSS Transforms (2D)](https://www.w3schools.com/css/css3_2dtransforms.asp) — `translate`, `scale`, `rotate`

**Other useful tools**

- [CSS Tricks — A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-complete-guide-to-flexbox/) — visual cheatsheet
- [CSS Tricks — A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) — visual cheatsheet
- [Flexbox Froggy](https://flexboxfroggy.com) — learn Flexbox by playing a game
- [Grid Garden](https://cssgridgarden.com) — learn Grid by playing a game

---

## Next Up

Week 04 covers JavaScript — you will make these layouts interactive with event listeners and DOM manipulation. Until then, try rebuilding the flexbox navbar and the grid gallery from memory.
