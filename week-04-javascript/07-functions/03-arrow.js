// 03 - Arrow Functions
// Run with: node 03-arrow.js

console.log("=== Arrow Functions ===");

// Arrow functions: shorter syntax, no own this, no own arguments
const addArrow = (a, b) => {
  return a + b;
};
const addShort = (a, b) => a + b; // implicit return for single expression

console.log("addArrow(3, 4):", addArrow(3, 4));
console.log("addShort(3, 4):", addShort(3, 4));

// Single parameter can omit parentheses
const double = n => n * 2;
console.log("double(5):", double(5));

// No parameters needs empty parentheses
const getRandom = () => Math.random();
console.log("getRandom():", getRandom().toFixed(4));

// Returning an object: wrap in parentheses
const makePoint = (x, y) => ({ x: x, y: y });
console.log("makePoint(3, 4):", makePoint(3, 4));

console.log("");
console.log("=== Arrow Functions in Array Methods ===");
let numbers = [1, 2, 3, 4, 5];
console.log("numbers:", numbers);
console.log("doubled (function):", numbers.map(function (n) { return n * 2; }));
console.log("doubled (arrow)   :", numbers.map(n => n * 2));
console.log("filtered > 3:", numbers.filter(n => n > 3));
console.log("sum:", numbers.reduce((sum, n) => sum + n, 0));
