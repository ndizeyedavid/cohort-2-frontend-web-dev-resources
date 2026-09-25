// 05 - Checking Properties and Real Example
// Run with: node 05-checks-and-example.js

console.log("=== Checking Properties ===");

let book = { title: "Eloquent JS", author: "Marijn Haverbeke" };
console.log("'title' in book         :", "title" in book);
console.log("'pages' in book         :", "pages" in book);
console.log("book.hasOwnProperty('title'):", book.hasOwnProperty("title"));
console.log("book.title !== undefined:", book.title !== undefined);

// hasOwnProperty vs in: in checks prototype chain too
console.log("'toString' in book      :", "toString" in book, "(from prototype)");
console.log("book.hasOwnProperty('toString'):", book.hasOwnProperty("toString"));

console.log("");
console.log("=== Real Example: Student Records ===");

let students = [
  { name: "David", scores: [85, 90, 78], city: "Kigali" },
  { name: "Aline", scores: [92, 88, 95], city: "Huye" },
  { name: "Grace", scores: [70, 75, 80], city: "Kigali" }
];

students.forEach(function (s) {
  let avg = s.scores.reduce(function (sum, n) { return sum + n; }, 0) / s.scores.length;
  console.log(s.name + " (" + s.city + ")  -  avg: " + avg.toFixed(1));
});

// Find students from Kigali
let fromKigali = students.filter(function (s) { return s.city === "Kigali"; });
console.log("from Kigali:", fromKigali.map(function (s) { return s.name; }).join(", "));
