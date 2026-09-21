// Week 04 - 03 DOM Manipulation
// Open index.html in the browser to see this in action.
// This file runs in the browser, not with Node.

console.log("=== 3 Ways to Select Elements ===\n");

// 1. getElementById  -  fastest, returns one element or null
const greeting = document.getElementById("greeting");
console.log("getElementById('greeting'):", greeting);
console.log("textContent:", greeting.textContent);

// 2. querySelector  -  CSS selector, returns first match
const highlight = document.querySelector(".highlight");
console.log("\nquerySelector('.highlight'):", highlight);
console.log("textContent:", highlight.textContent);

// querySelector can do anything CSS can
const firstItem = document.querySelector(".item-list .item");
console.log("\nquerySelector('.item-list .item'):", firstItem.textContent);

// 3. querySelectorAll  -  CSS selector, returns NodeList of all matches
const allHighlights = document.querySelectorAll(".highlight");
console.log("\nquerySelectorAll('.highlight'): found", allHighlights.length, "elements");
allHighlights.forEach(function (el, i) {
  console.log("  [" + i + "]", el.textContent);
});

const allItems = document.querySelectorAll(".item");
console.log("\nquerySelectorAll('.item'): found", allItems.length, "elements");

// Bonus: getElementsByClassName and getElementsByTagName (older methods)
// They return live HTMLCollections, not NodeLists
const byClass = document.getElementsByClassName("highlight");
console.log("\ngetElementsByClassName('highlight'):", byClass.length);

const byTag = document.getElementsByTagName("p");
console.log("getElementsByTagName('p'): found", byTag.length, "paragraphs");

console.log("\n=== Modifying Content ===\n");

// Setup for interactive demos
const textTarget = document.getElementById("text-target");
const originalText = textTarget.textContent;

// textContent vs innerHTML vs value
document.getElementById("btn-text").addEventListener("click", function () {
  // textContent: plain text, HTML tags are treated as text
  textTarget.textContent = "Updated with textContent at " + new Date().toLocaleTimeString();
  console.log("textContent set");
});

document.getElementById("btn-html").addEventListener("click", function () {
  // innerHTML: parses HTML string
  textTarget.innerHTML = "Updated with <strong>innerHTML</strong> at <em>" + new Date().toLocaleTimeString() + "</em>";
  console.log("innerHTML set");
});

document.getElementById("btn-reset").addEventListener("click", function () {
  textTarget.textContent = originalText;
  console.log("reset");
});

console.log("--- textContent vs innerHTML ---");
console.log("Use textContent for plain text (safe from XSS)");
console.log("Use innerHTML only when you need to insert HTML and trust the source");

console.log("\n=== Modifying Value (Inputs) ===\n");

const nameInput = document.getElementById("name-input");
const valueOutput = document.getElementById("value-output");

document.getElementById("btn-read-value").addEventListener("click", function () {
  // .value reads what the user typed
  let val = nameInput.value.trim();
  if (val === "") {
    valueOutput.textContent = "Input is empty";
  } else {
    valueOutput.textContent = "You typed: " + val;
  }
  console.log("value read:", val);
});

document.getElementById("btn-set-value").addEventListener("click", function () {
  // .value can also set the input programmatically
  nameInput.value = "Mellow";
  valueOutput.textContent = 'Set input to "Mellow"';
  console.log("value set to Mellow");
});

document.getElementById("btn-clear-value").addEventListener("click", function () {
  nameInput.value = "";
  valueOutput.textContent = "Cleared";
  nameInput.focus();
  console.log("value cleared");
});

console.log("\n=== Modifying Style and Classes ===\n");

const styleBox = document.getElementById("style-box");

document.getElementById("btn-style").addEventListener("click", function () {
  // Direct style manipulation
  // Use camelCase for CSS properties: backgroundColor not background-color
  let isStyled = styleBox.style.backgroundColor === "rgb(37, 99, 235)";
  if (isStyled) {
    styleBox.style.backgroundColor = "";
    styleBox.style.color = "";
    styleBox.style.borderColor = "";
  } else {
    styleBox.style.backgroundColor = "#2563eb";
    styleBox.style.color = "#fff";
    styleBox.style.borderColor = "#2563eb";
  }
  console.log("direct style toggled");
});

document.getElementById("btn-toggle").addEventListener("click", function () {
  // classList is cleaner than direct style for most cases
  styleBox.classList.toggle("active");
  console.log("class 'active' toggled, now:", styleBox.classList.contains("active"));
  console.log("classList:", styleBox.classList.toString());
});

console.log("\n=== Creating Elements Dynamically ===\n");

let itemCount = 3;
document.getElementById("btn-add-item").addEventListener("click", function () {
  itemCount++;
  // createElement + textContent + appendChild
  let li = document.createElement("li");
  li.className = "item";
  li.textContent = "Item " + itemCount + " (added dynamically)";
  document.querySelector(".item-list").appendChild(li);
  console.log("added:", li.textContent);
});

console.log("\n=== Other Useful DOM Methods ===");
console.log("element.setAttribute('data-id', '123')  -  set any attribute");
console.log("element.getAttribute('data-id')           -  read attribute");
console.log("element.remove()                           -  remove from DOM");
console.log("element.classList.add('x')                 -  add class");
console.log("element.classList.remove('x')              -  remove class");
console.log("element.classList.contains('x')            -  check class");
console.log("parent.removeChild(child)                  -  remove via parent");
console.log("element.closest('.card')                   -  find nearest ancestor matching selector");
