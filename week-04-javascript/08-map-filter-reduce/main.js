// Week 04 - 08 Array Map, Filter, Reduce
// Run with: node main.js

console.log("=== 1. map  -  Transform Each Element ===\n");
console.log("map creates a NEW array, original is not modified\n");

let numbers = [1, 2, 3, 4, 5];
console.log("original:", numbers);

// Double each number
let doubled = numbers.map(function (n) { return n * 2; });
console.log("map(n => n * 2)     :", doubled);
console.log("original unchanged  :", numbers);

// Arrow shorthand
let doubledArrow = numbers.map(function (n) { return n * 2; });
let doubledClean = numbers.map(n => n * 2);
console.log("with arrow n => n*2 :", doubledClean);

// String transform
let names = ["david", "aline", "grace"];
let upper = names.map(function (s) { return s.toUpperCase(); });
console.log("\nnames:", names);
console.log("upper:", upper);
console.log("upper (arrow):", names.map(s => s.toUpperCase()));

// Extract property from objects
let students = [
  { name: "David", score: 85 },
  { name: "Aline", score: 92 },
  { name: "Grace", score: 78 }
];
let justNames = students.map(function (s) { return s.name; });
console.log("\nstudents:", students.map(s => s.name + ":" + s.score).join(", "));
console.log("just names:", justNames);
console.log("just scores:", students.map(s => s.score));

// Map with index
let indexed = ["a", "b", "c"].map(function (val, idx) { return idx + ":" + val; });
console.log("\nwith index:", indexed);

// Creating HTML strings (common pattern)
let html = students.map(function (s) { return "<li>" + s.name + "  -  " + s.score + "</li>"; });
console.log("\nHTML from map:", html.join(""));

console.log("\n=== 2. filter  -  Keep Only What Matches ===\n");
console.log("filter creates a NEW array with only elements that pass the test\n");

let scores = [45, 82, 91, 37, 68, 75, 29, 88];
console.log("scores:", scores);

let passing = scores.filter(function (n) { return n >= 50; });
console.log("filter(n >= 50):", passing);

let failing = scores.filter(function (n) { return n < 50; });
console.log("filter(n < 50) :", failing);

// With arrow
console.log("passing (arrow):", scores.filter(n => n >= 50));

// Filtering objects
let products = [
  { name: "Laptop", price: 500000, inStock: true },
  { name: "Phone", price: 300000, inStock: false },
  { name: "Tablet", price: 200000, inStock: true },
  { name: "Watch", price: 80000, inStock: true }
];
let available = products.filter(function (p) { return p.inStock; });
console.log("\nproducts:", products.map(p => p.name + (p.inStock ? " in stock" : " out")).join(", "));
console.log("in stock:", available.map(p => p.name).join(", "));

let affordable = products.filter(function (p) { return p.price < 250000 && p.inStock; });
console.log("affordable + in stock:", affordable.map(p => p.name + " (" + p.price + ")").join(", "));

// Filtering strings
let words = ["hello", "hi", "hey", "h", "greetings"];
console.log("\nwords:", words);
console.log("length > 3:", words.filter(function (w) { return w.length > 3; }));

// Removing falsy values (handy trick)
let mixed = [0, 1, false, 2, "", 3, null, undefined, 4, NaN];
console.log("\nmixed:", mixed);
console.log("filter(Boolean):", mixed.filter(Boolean), "(removes all falsy)");

console.log("\n=== 3. reduce  -  Boil Down to One Value ===\n");
console.log("reduce takes an array and reduces it to a single value\n");

let nums = [1, 2, 3, 4, 5];
console.log("nums:", nums);

// Sum: reduce((accumulator, current) => newAccumulator, initialValue)
let sum = nums.reduce(function (acc, n) { return acc + n; }, 0);
console.log("sum (0 + 1 + 2 + 3 + 4 + 5):", sum);

// Step by step
console.log("\nstep by step (sum):");
nums.reduce(function (acc, n) {
  let next = acc + n;
  console.log("  acc=" + acc + " + n=" + n + " -> " + next);
  return next;
}, 0);

// Product
let product = nums.reduce(function (acc, n) { return acc * n; }, 1);
console.log("\nproduct:", product, "(1*1*2*3*4*5)");

// With arrow shorthand
console.log("sum (arrow):", nums.reduce((acc, n) => acc + n, 0));
console.log("product (arrow):", nums.reduce((acc, n) => acc * n, 1));

// Max value with reduce
let maxVal = nums.reduce(function (max, n) { return n > max ? n : max; }, nums[0]);
console.log("\nmax:", maxVal);

// Building an object with reduce
let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
let count = fruits.reduce(function (acc, fruit) {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log("\nfruits:", fruits);
console.log("count occurrences:", count);

// Flatten array with reduce
let nested = [[1, 2], [3, 4], [5]];
let flat = nested.reduce(function (acc, arr) { return acc.concat(arr); }, []);
console.log("\nnested:", JSON.stringify(nested));
console.log("flattened:", flat);

// Sum of object property
let cart = [
  { item: "Laptop", price: 500000, qty: 1 },
  { item: "Mouse", price: 15000, qty: 2 },
  { item: "Keyboard", price: 25000, qty: 1 }
];
let total = cart.reduce(function (sum, p) { return sum + p.price * p.qty; }, 0);
console.log("\ncart:", cart.map(function (p) { return p.item + " x" + p.qty; }).join(", "));
console.log("total:", total.toLocaleString(), "Rwf");

console.log("\n=== 4. Chaining Map + Filter + Reduce ===\n");
console.log("The real power: chain them together\n");

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("data:", data);

// Example: sum of doubled even numbers
let result = data
  .filter(function (n) { return n % 2 === 0; })  // [2,4,6,8,10]
  .map(function (n) { return n * 2; })            // [4,8,12,16,20]
  .reduce(function (acc, n) { return acc + n; }, 0); // 60

console.log("even -> doubled -> sum:", result);

// Same with arrows (much cleaner)
let resultArrow = data.filter(n => n % 2 === 0).map(n => n * 2).reduce((a, n) => a + n, 0);
console.log("same with arrows:", resultArrow);

// Real example: student average for passing students
let allStudents = [
  { name: "David", score: 85 },
  { name: "Aline", score: 92 },
  { name: "Grace", score: 42 },
  { name: "Bob", score: 78 },
  { name: "Claire", score: 35 }
];

console.log("\nall students:", allStudents.map(function (s) { return s.name + ":" + s.score; }).join(", "));

let passingStudents = allStudents.filter(function (s) { return s.score >= 50; });
console.log("passing:", passingStudents.map(function (s) { return s.name; }).join(", "));

let passingNames = allStudents.filter(s => s.score >= 50).map(s => s.name);
console.log("passing names (chained):", passingNames);

let avgPassing = allStudents
  .filter(s => s.score >= 50)
  .map(s => s.score)
  .reduce((sum, score, _, arr) => sum + score / arr.length, 0);
console.log("average of passing scores:", avgPassing.toFixed(1));

// Another: total price of in-stock items
let items = [
  { name: "Fries", price: 8500, inStock: true },
  { name: "Burger", price: 14000, inStock: true },
  { name: "Steak", price: 28000, inStock: false },
  { name: "Soda", price: 2500, inStock: true }
];
let stockTotal = items.filter(i => i.inStock).reduce((sum, i) => sum + i.price, 0);
console.log("\nin-stock total:", stockTotal.toLocaleString(), "Rwf");
console.log("in-stock items:", items.filter(i => i.inStock).map(i => i.name).join(", "));

console.log("\n=== 5. Map vs For Loop ===\n");
console.log("for loop: manual, imperative, need to push");
let manual = [];
for (let n of [1, 2, 3]) { manual.push(n * 2); }
console.log("for loop:", manual);

console.log("map: declarative, returns new array directly");
let withMap = [1, 2, 3].map(n => n * 2);
console.log("map:", withMap);
console.log("Prefer map/filter/reduce: shorter, no manual array, chainable");

console.log("\n=== 6. Other Useful Methods ===\n");

let arr = [1, 2, 3, 4, 5];
console.log("arr:", arr);
console.log("find(n > 3)    :", arr.find(n => n > 3), "(first match)");
console.log("findIndex(n>3) :", arr.findIndex(n => n > 3));
console.log("some(n > 4)    :", arr.some(n => n > 4), "(any match?)");
console.log("every(n > 0)   :", arr.every(n => n > 0), "(all match?)");
console.log("includes(3)    :", arr.includes(3));
console.log("forEach (logs each):");
arr.forEach(function (n) { console.log("  value:", n); });
