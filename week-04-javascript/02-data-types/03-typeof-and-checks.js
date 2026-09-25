// 03 - typeof and Proper Type Checks
// Run with: node 03-typeof-and-checks.js

console.log("=== typeof Cheat Sheet ===");
console.log("typeof 'hello'    :", typeof "hello");
console.log("typeof 42         :", typeof 42);
console.log("typeof 42n        :", typeof 42n);
console.log("typeof true       :", typeof true);
console.log("typeof undefined  :", typeof undefined);
console.log("typeof null       :", typeof null, "(quirk, really null)");
console.log("typeof Symbol()   :", typeof Symbol());
console.log("typeof {}         :", typeof {});
console.log("typeof []         :", typeof []);
console.log("typeof function(){}:", typeof function () {});

console.log("");
console.log("=== Checking Types Properly ===");
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
