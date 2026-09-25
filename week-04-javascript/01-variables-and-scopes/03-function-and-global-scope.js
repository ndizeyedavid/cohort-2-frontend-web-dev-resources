// 03 - Function Scope and Global Scope
// Run with: node 03-function-and-global-scope.js

console.log("=== Function Scope ===");

function scopeDemo() {
  var functionVar = "function scoped";
  let functionLet = "also function scoped here";
  console.log("inside function:", functionVar, "|", functionLet);
}
scopeDemo();
// console.log(functionVar); // ReferenceError

console.log("");
console.log("=== Global Scope ===");

let globalName = "I am global";

function showGlobal() {
  console.log("accessing global inside function:", globalName);
}
showGlobal();
console.log("accessing global outside:", globalName);

console.log("");
console.log("Global is accessible everywhere in the file");
console.log("Be careful with naming to avoid collisions");
