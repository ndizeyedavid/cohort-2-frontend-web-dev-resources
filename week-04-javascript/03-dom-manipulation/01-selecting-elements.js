// 01 - Selecting Elements: 3 Common Methods
// Open index.html in the browser and check the console.

console.log("=== 3 Ways to Select Elements ===");

// 1. getElementById - fastest, returns one element or null
const greeting = document.getElementById("greeting");
console.log("getElementById('greeting'):", greeting);
console.log("textContent:", greeting.textContent);

// 2. querySelector - CSS selector, returns first match
const highlight = document.querySelector(".highlight");
console.log("querySelector('.highlight'):", highlight);
console.log("textContent:", highlight.textContent);

// querySelector can do anything CSS can
const firstItem = document.querySelector(".item-list .item");
console.log("querySelector('.item-list .item'):", firstItem.textContent);

// 3. querySelectorAll - CSS selector, returns NodeList of all matches
const allHighlights = document.querySelectorAll(".highlight");
console.log("querySelectorAll('.highlight'): found", allHighlights.length, "elements");
allHighlights.forEach(function (el, i) {
  console.log("  [" + i + "]", el.textContent);
});

const allItems = document.querySelectorAll(".item");
console.log("querySelectorAll('.item'): found", allItems.length, "elements");

// Bonus: older methods - getElementsByClassName and getElementsByTagName
// They return live HTMLCollections, not NodeLists
const byClass = document.getElementsByClassName("highlight");
console.log("getElementsByClassName('highlight'):", byClass.length);

const byTag = document.getElementsByTagName("p");
console.log("getElementsByTagName('p'): found", byTag.length, "paragraphs");

console.log("");
console.log("Summary: use getElementById for IDs, querySelector and querySelectorAll for everything else");
