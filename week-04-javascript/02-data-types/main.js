// Week 04 - 02 Variable Data Types
// Run with: node main.js

console.log("=== 1. Primitive Types ===\n");

// String
let name = "David";
let course = 'Frontend Web Dev';
let greeting = `Hello, ${name} from ${course}`;
console.log("string:", greeting, "| typeof:", typeof greeting);

// Number (all numbers are double precision floats)
let age = 22;
let price = 14999.99;
let notANumber = NaN;
let infinity = Infinity;
console.log("number:", age, "|", price, "| typeof:", typeof age);
console.log("NaN:", notANumber, "| typeof:", typeof notANumber);
console.log("Infinity:", infinity);

// BigInt for very large integers
let big = 9007199254740991n;
let big2 = BigInt("12345678901234567890");
console.log("bigint:", big, "| typeof:", typeof big);
console.log("bigint2:", big2);

// Boolean
let isStudent = true;
let hasPaid = false;
console.log("boolean:", isStudent, "| typeof:", typeof isStudent);

// Undefined (declared but not assigned)
let notAssigned;
console.log("undefined:", notAssigned, "| typeof:", typeof notAssigned);

// Null (intentional empty value)
let emptyValue = null;
console.log("null:", emptyValue, "| typeof:", typeof emptyValue, "(this is a known JS quirk)");

// Symbol (unique identifier)
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log("symbol:", id1.toString(), "| id1 === id2:", id1 === id2, "(always unique)");

console.log("\n=== 2. Reference Types ===\n");

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

console.log("\n=== 3. typeof Cheat Sheet ===\n");
console.log("typeof 'hello'    :", typeof "hello");
console.log("typeof 42         :", typeof 42);
console.log("typeof 42n        :", typeof 42n);
console.log("typeof true       :", typeof true);
console.log("typeof undefined  :", typeof undefined);
console.log("typeof null       :", typeof null);
console.log("typeof Symbol()   :", typeof Symbol());
console.log("typeof {}         :", typeof {});
console.log("typeof []         :", typeof []);
console.log("typeof function(){}:", typeof function () {});

console.log("\n=== 4. Type Coercion ===\n");

// Implicit coercion
console.log('"5" + 3 =', "5" + 3, "(string concatenation)");
console.log('"5" - 3 =', "5" - 3, "(numeric subtraction)");
console.log('"5" * "2" =', "5" * "2");
console.log('true + 1 =', true + 1, "(true becomes 1)");
console.log('false + 1 =', false + 1, "(false becomes 0)");
console.log('null + 1 =', null + 1, "(null becomes 0)");
console.log('undefined + 1 =', undefined + 1, "(undefined becomes NaN)");

// Explicit conversion
console.log("\nExplicit conversion:");
console.log('Number("42")  :', Number("42"), "| typeof:", typeof Number("42"));
console.log('String(42)    :', String(42), "| typeof:", typeof String(42));
console.log('Boolean(0)    :', Boolean(0));
console.log('Boolean(1)    :', Boolean(1));
console.log('Boolean("")   :', Boolean(""));
console.log('Boolean("hi") :', Boolean("hi"));

console.log("\n=== 5. Equality: == vs === ===\n");
console.log('5 == "5"  :', 5 == "5", "(coercion, true)");
console.log('5 === "5" :', 5 === "5", "(no coercion, false)");
console.log('0 == false:', 0 == false, "(true with ==)");
console.log('0 === false:', 0 === false, "(false with ===)");
console.log('null == undefined :', null == undefined);
console.log('null === undefined:', null === undefined);
console.log("Always use === unless you have a reason not to");

console.log("\n=== 6. Truthy and Falsy ===\n");

let values = [false, 0, "", null, undefined, NaN, "hello", 42, [], {}];
values.forEach(function (v) {
  let display;
  if (typeof v === "string") display = '"' + v + '"';
  else if (Array.isArray(v)) display = "[]";
  else if (v !== null && typeof v === "object") display = "{}";
  else display = String(v);
  console.log(display.padEnd(12), "->", Boolean(v) ? "truthy" : "falsy");
});

console.log("\n=== 7. Checking Types Properly ===\n");
console.log("Array.isArray([])        :", Array.isArray([]));
console.log("Array.isArray({})        :", Array.isArray({}));
console.log("Number.isNaN(NaN)        :", Number.isNaN(NaN));
console.log("Number.isNaN('hello')    :", Number.isNaN("hello"));
console.log("isNaN('hello')           :", isNaN("hello"), "(coerces first, avoid this)");
console.log("typeof null === 'object' :", typeof null === "object", "(quirk, use === null check)");

let maybeNull = null;
console.log("Check for null: maybeNull === null ->", maybeNull === null);

let maybeArray = [1, 2, 3];
console.log("Check for array: Array.isArray(maybeArray) ->", Array.isArray(maybeArray));

console.log("\n=== 8. Template Literals (String Interpolation) ===\n");
let firstName = "Mellow";
let score = 95;
console.log(`Student ${firstName} scored ${score}/100`);
console.log(`Next year: ${score + 5} if they improve by 5`);
console.log(`Multiline strings
are easy with
backticks`);
