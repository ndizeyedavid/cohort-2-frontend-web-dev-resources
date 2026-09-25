// 04 - Modifying Style and Classes
// Open index.html. Click the buttons to toggle styles.

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

console.log("=== Style and Classes ===");
console.log("element.style.backgroundColor = '#2563eb' - direct style, camelCase");
console.log("element.classList.add('x')      - add class");
console.log("element.classList.remove('x')   - remove class");
console.log("element.classList.toggle('x')   - toggle class");
console.log("element.classList.contains('x') - check class");
console.log("Prefer classList over direct style for maintainable code");
