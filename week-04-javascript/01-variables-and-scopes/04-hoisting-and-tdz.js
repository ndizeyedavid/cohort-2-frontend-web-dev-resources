// 04 - Hoisting and Temporal Dead Zone (TDZ)
// Run with: node 04-hoisting-and-tdz.js

console.log("=== Hoisting ===");

// var is hoisted and initialized as undefined
console.log("var before declaration:", hoistedVar); // undefined, not error
var hoistedVar = "now defined";
console.log("var after declaration:", hoistedVar);

// let and const are hoisted but in Temporal Dead Zone
try {
  console.log(hoistedLet);
} catch (err) {
  console.log("let before declaration throws:", err.message);
}
let hoistedLet = "now defined";
console.log("let after declaration:", hoistedLet);

// Function declarations are fully hoisted
console.log("calling hoisted function:", greet("Aline"));
function greet(name) {
  return "Hello, " + name;
}

console.log("");
console.log("=== Temporal Dead Zone ===");

function tdzDemo() {
  // console.log(value); // ReferenceError: in TDZ
  let value = 10;
  console.log("after initialization:", value);
}
tdzDemo();

console.log("");
console.log("TDZ protects you from using a variable before it is ready");
