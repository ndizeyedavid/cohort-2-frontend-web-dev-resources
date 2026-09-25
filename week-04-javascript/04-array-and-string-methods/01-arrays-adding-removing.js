// 01 - Arrays: Adding and Removing Elements
// Run with: node 01-arrays-adding-removing.js

console.log("=== Adding and Removing ===");

let fruits = ["apple", "banana", "mango"];
console.log("start:", fruits);

fruits.push("orange"); // add to end
console.log("push('orange')     :", fruits);

fruits.unshift("grape"); // add to start
console.log("unshift('grape')   :", fruits);

let last = fruits.pop(); // remove from end
console.log("pop() ->", last, "| now:", fruits);

let first = fruits.shift(); // remove from start
console.log("shift() ->", first, "| now:", fruits);
