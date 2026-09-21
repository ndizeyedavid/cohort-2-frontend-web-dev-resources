// Week 04 - 01 Variables and Variable Scopes
// Run with: node main.js

console.log("=== 1. var vs let vs const ===\n");

// var is function scoped and can be redeclared
var city = "Kigali";
var city = "Huye"; // no error with var
console.log("var city redeclared:", city);

// let is block scoped and cannot be redeclared in same scope
let country = "Rwanda";
// let country = "Kenya"; // would throw SyntaxError
country = "Kenya"; // reassignment is allowed
console.log("let country reassigned:", country);

// const cannot be reassigned or redeclared
const pi = 3.14;
// pi = 3.1415; // TypeError
console.log("const pi:", pi);

// const with objects: the binding is constant, not the content
const student = { name: "David", cohort: "C2" };
student.name = "Mellow"; // allowed: mutating the object
console.log("const object mutated:", student);
// student = {}; // not allowed: reassigning the binding

console.log("\n=== 2. Block Scope ===\n");

{
  let blockLet = "visible only inside this block";
  const blockConst = "also block scoped";
  var blockVar = "var ignores block scope";
  console.log(blockLet);
  console.log(blockConst);
}

// console.log(blockLet); // ReferenceError: not defined
console.log("blockVar leaked out:", blockVar); // var leaks

if (true) {
  let role = "student";
  console.log("inside if:", role);
}
// console.log(role); // ReferenceError

console.log("\n=== 3. Function Scope ===\n");

function scopeDemo() {
  var functionVar = "function scoped";
  let functionLet = "also function scoped here";
  console.log("inside function:", functionVar, "|", functionLet);
}
scopeDemo();
// console.log(functionVar); // ReferenceError

console.log("\n=== 4. Global Scope ===\n");

let globalName = "I am global";

function showGlobal() {
  console.log("accessing global inside function:", globalName);
}
showGlobal();
console.log("accessing global outside:", globalName);

console.log("\n=== 5. Hoisting ===\n");

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

console.log("\n=== 6. Temporal Dead Zone (TDZ) ===\n");

function tdzDemo() {
  // console.log(value); // ReferenceError: in TDZ
  let value = 10;
  console.log("after initialization:", value);
}
tdzDemo();

console.log("\n=== 7. Practical Scope Example ===\n");

// Classic loop problem: var vs let
console.log("with var (all share same binding):");
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    // by the time this runs, i is 3 for all
    // uncomment next line to see the var issue
    // console.log("var i:", i);
  }, 0);
}
console.log("var i after loop:", i); // leaks: 3

console.log("with let (each iteration gets own binding):");
for (let j = 0; j < 3; j++) {
  // each j is a fresh binding
  console.log("let j:", j);
}
// console.log(j); // ReferenceError: j is block scoped

console.log("\n=== 8. When to Use What ===\n");
console.log("Use const by default");
console.log("Use let when you need to reassign");
console.log("Avoid var in modern code");
