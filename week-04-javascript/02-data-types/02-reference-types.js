// 02 - Reference Types
// Run with: node 02-reference-types.js

console.log("=== Reference Types (copied by reference) ===");

// Object
let student = { name: "Aline", age: 21, city: "Kigali" };
console.log("object:", student, "| typeof:", typeof student);

// Array (special type of object)
let colors = ["red", "blue", "green"];
console.log("array:", colors, "| typeof:", typeof colors, "| Array.isArray:", Array.isArray(colors));

// Function (also an object, but callable)
function sayHi() { return "hi"; }
console.log("function:", typeof sayHi);

// Date, RegExp etc are also objects
console.log("date:", new Date().toISOString(), "| typeof:", typeof new Date());
console.log("regexp:", typeof /hello/);

console.log("");
console.log("Reference means two variables can point to the same object:");
let a = { value: 1 };
let b = a;
b.value = 99;
console.log("a.value after b.value = 99:", a.value, "(same object)");
