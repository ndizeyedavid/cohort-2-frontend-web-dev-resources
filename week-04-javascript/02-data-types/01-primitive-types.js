// 01 - Primitive Types
// Run with: node 01-primitive-types.js

console.log("=== Primitive Types (copied by value) ===");

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
