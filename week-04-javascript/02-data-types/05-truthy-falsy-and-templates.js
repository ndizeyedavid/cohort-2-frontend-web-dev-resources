// 05 - Truthy and Falsy + Template Literals
// Run with: node 05-truthy-falsy-and-templates.js

console.log("=== Truthy and Falsy ===");
console.log("Falsy values: false, 0, \"\", null, undefined, NaN");
console.log("Everything else is truthy");
console.log("");

let values = [false, 0, "", null, undefined, NaN, "hello", 42, [], {}];
values.forEach(function (v) {
  let display;
  if (typeof v === "string") display = '"' + v + '"';
  else if (Array.isArray(v)) display = "[]";
  else if (v !== null && typeof v === "object") display = "{}";
  else display = String(v);
  console.log(display.padEnd(12), "->", Boolean(v) ? "truthy" : "falsy");
});

console.log("");
console.log("=== Template Literals ===");
let firstName = "Mellow";
let score = 95;
console.log(`Student ${firstName} scored ${score}/100`);
console.log(`Next year: ${score + 5} if they improve by 5`);
console.log(`Status: ${score >= 50 ? "Pass" : "Fail"}`);
console.log(`Multiline strings
are easy with
backticks`);
