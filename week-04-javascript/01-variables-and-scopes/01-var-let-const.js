// 01 - var vs let vs const
// Run with: node 01-var-let-const.js

console.log("=== var vs let vs const ===");

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
// pi = 3.1415; // TypeError: Assignment to constant variable
console.log("const pi:", pi);

// const with objects: the binding is constant, not the content
const student = { name: "David", cohort: "C2" };
student.name = "Mellow"; // allowed: mutating the object
console.log("const object mutated:", student);
// student = {}; // not allowed: reassigning the binding

console.log("");
console.log("Takeaway: use const by default, let when you need to reassign, avoid var");
