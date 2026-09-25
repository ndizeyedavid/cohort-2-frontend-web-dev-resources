// 02 - Arrays: Slice vs Splice
// Run with: node 02-arrays-slice-splice.js

console.log("=== Slice vs Splice ===");

// slice: copies a portion, does not modify original
let colors = ["red", "green", "blue", "yellow", "purple"];
console.log("original:", colors);
console.log("slice(1, 3)  :", colors.slice(1, 3), "| original unchanged:", colors);
console.log("slice(2)     :", colors.slice(2));
console.log("slice(-2)    :", colors.slice(-2), "(last 2)");

// splice: modifies original, can remove and insert
let numbers = [1, 2, 3, 4, 5];
console.log("");
console.log("original:", numbers);
let removed = numbers.splice(2, 2); // start at index 2, remove 2
console.log("splice(2, 2) ->", removed, "| now:", numbers);

let letters = ["a", "b", "e", "f"];
letters.splice(2, 0, "c", "d"); // insert without removing
console.log("splice(2, 0, 'c','d'):", letters);

console.log("");
console.log("Takeaway: slice is safe (no mutation), splice mutates. If unsure, prefer slice.");
