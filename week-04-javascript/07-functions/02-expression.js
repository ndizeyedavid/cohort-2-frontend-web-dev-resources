// 02 - Function Expression
// Run with: node 02-expression.js

console.log("=== Function Expression ===");

// Not hoisted: cannot call before assignment
// console.log(multiply(3, 4)); // ReferenceError

const multiply = function (a, b) {
  return a * b;
};

console.log("multiply(3, 4):", multiply(3, 4));
console.log("typeof multiply:", typeof multiply);

// Named function expression (useful for recursion and debugging)
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};
console.log("factorial(5):", factorial(5));
// console.log(fact(5)); // ReferenceError: fact only visible inside itself

// Function expression assigned conditionally
let operation;
let useAdd = true;
if (useAdd) {
  operation = function (a, b) { return a + b; };
} else {
  operation = function (a, b) { return a - b; };
}
console.log("conditional operation(10, 3):", operation(10, 3));

console.log("");
console.log("Expression is not hoisted, must define before calling");
