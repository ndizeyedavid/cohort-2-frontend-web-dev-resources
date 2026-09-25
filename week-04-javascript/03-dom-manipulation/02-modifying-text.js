// 02 - Modifying Text: textContent vs innerHTML
// Open index.html in the browser. Click the buttons to see each method.

const textTarget = document.getElementById("text-target");
const originalText = textTarget.textContent;

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

console.log("=== textContent vs innerHTML ===");
console.log("Use textContent for plain text (safe from XSS)");
console.log("Use innerHTML only when you need to insert HTML and trust the source");
