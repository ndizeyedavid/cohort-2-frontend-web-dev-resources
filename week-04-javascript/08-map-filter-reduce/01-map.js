// 01 - map: Transform Each Element
// Run with: node 01-map.js

console.log("=== map: Transform Each Element ===");
console.log("map creates a NEW array, original is not modified");
console.log("");

let numbers = [1, 2, 3, 4, 5];
console.log("original:", numbers);

let doubled = numbers.map(function (n) { return n * 2; });
console.log("map(n => n * 2)     :", doubled);
console.log("original unchanged  :", numbers);
console.log("with arrow n => n*2 :", numbers.map(n => n * 2));

let names = ["david", "aline", "grace"];
console.log("names:", names);
console.log("upper:", names.map(s => s.toUpperCase()));

let students = [
  { name: "David", score: 85 },
  { name: "Aline", score: 92 },
  { name: "Grace", score: 78 }
];
console.log("students:", students.map(s => s.name + ":" + s.score).join(", "));
console.log("just names:", students.map(s => s.name));
console.log("just scores:", students.map(s => s.score));

let indexed = ["a", "b", "c"].map(function (val, idx) { return idx + ":" + val; });
console.log("with index:", indexed);

let html = students.map(function (s) { return "<li>" + s.name + "  -  " + s.score + "</li>"; });
console.log("HTML from map:", html.join(""));
