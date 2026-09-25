// 04 - Chaining Map + Filter + Reduce
// Run with: node 04-chaining.js

console.log("=== Chaining Map + Filter + Reduce ===");
console.log("The real power: chain them together");
console.log("");

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("data:", data);

let result = data
  .filter(function (n) { return n % 2 === 0; })
  .map(function (n) { return n * 2; })
  .reduce(function (acc, n) { return acc + n; }, 0);
console.log("even -> doubled -> sum:", result);

let resultArrow = data.filter(n => n % 2 === 0).map(n => n * 2).reduce((a, n) => a + n, 0);
console.log("same with arrows:", resultArrow);

let allStudents = [
  { name: "David", score: 85 },
  { name: "Aline", score: 92 },
  { name: "Grace", score: 42 },
  { name: "Bob", score: 78 },
  { name: "Claire", score: 35 }
];
console.log("all students:", allStudents.map(function (s) { return s.name + ":" + s.score; }).join(", "));
console.log("passing:", allStudents.filter(s => s.score >= 50).map(s => s.name).join(", "));

let passingNames = allStudents.filter(s => s.score >= 50).map(s => s.name);
console.log("passing names (chained):", passingNames);

let avgPassing = allStudents
  .filter(s => s.score >= 50)
  .map(s => s.score)
  .reduce((sum, score, _, arr) => sum + score / arr.length, 0);
console.log("average of passing scores:", avgPassing.toFixed(1));

let items = [
  { name: "Fries", price: 8500, inStock: true },
  { name: "Burger", price: 14000, inStock: true },
  { name: "Steak", price: 28000, inStock: false },
  { name: "Soda", price: 2500, inStock: true }
];
let stockTotal = items.filter(i => i.inStock).reduce((sum, i) => sum + i.price, 0);
console.log("in-stock total:", stockTotal.toLocaleString(), "Rwf");
console.log("in-stock items:", items.filter(i => i.inStock).map(i => i.name).join(", "));

console.log("");
console.log("=== Map vs For Loop ===");
console.log("for loop: manual, imperative, need to push");
let manual = [];
for (let n of [1, 2, 3]) { manual.push(n * 2); }
console.log("for loop:", manual);
console.log("map: declarative, returns new array directly");
console.log("map:", [1, 2, 3].map(n => n * 2));
console.log("Prefer map/filter/reduce: shorter, no manual array, chainable");

console.log("");
console.log("=== Other Useful Methods ===");
let arr = [1, 2, 3, 4, 5];
console.log("arr:", arr);
console.log("find(n > 3)    :", arr.find(n => n > 3), "(first match)");
console.log("findIndex(n>3) :", arr.findIndex(n => n > 3));
console.log("some(n > 4)    :", arr.some(n => n > 4), "(any match?)");
console.log("every(n > 0)   :", arr.every(n => n > 0), "(all match?)");
console.log("includes(3)    :", arr.includes(3));
console.log("forEach (logs each):");
arr.forEach(function (n) { console.log("  value:", n); });
