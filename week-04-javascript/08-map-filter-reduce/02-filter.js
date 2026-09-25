// 02 - filter: Keep Only What Matches
// Run with: node 02-filter.js

console.log("=== filter: Keep Only What Matches ===");
console.log("filter creates a NEW array with only elements that pass the test");
console.log("");

let scores = [45, 82, 91, 37, 68, 75, 29, 88];
console.log("scores:", scores);

let passing = scores.filter(function (n) { return n >= 50; });
console.log("filter(n >= 50):", passing);

let failing = scores.filter(function (n) { return n < 50; });
console.log("filter(n < 50) :", failing);
console.log("passing (arrow):", scores.filter(n => n >= 50));

let products = [
  { name: "Laptop", price: 500000, inStock: true },
  { name: "Phone", price: 300000, inStock: false },
  { name: "Tablet", price: 200000, inStock: true },
  { name: "Watch", price: 80000, inStock: true }
];
console.log("products:", products.map(p => p.name + (p.inStock ? " in stock" : " out")).join(", "));
console.log("in stock:", products.filter(p => p.inStock).map(p => p.name).join(", "));

let affordable = products.filter(function (p) { return p.price < 250000 && p.inStock; });
console.log("affordable + in stock:", affordable.map(p => p.name + " (" + p.price + ")").join(", "));

let words = ["hello", "hi", "hey", "h", "greetings"];
console.log("words:", words);
console.log("length > 3:", words.filter(function (w) { return w.length > 3; }));

let mixed = [0, 1, false, 2, "", 3, null, undefined, 4, NaN];
console.log("mixed:", mixed);
console.log("filter(Boolean):", mixed.filter(Boolean), "(removes all falsy)");
