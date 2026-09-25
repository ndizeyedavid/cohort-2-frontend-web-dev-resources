// 03 - reduce: Boil Down to One Value
// Run with: node 03-reduce.js

console.log("=== reduce: Boil Down to One Value ===");
console.log("reduce takes an array and reduces it to a single value");
console.log("");

let nums = [1, 2, 3, 4, 5];
console.log("nums:", nums);

let sum = nums.reduce(function (acc, n) { return acc + n; }, 0);
console.log("sum (0 + 1 + 2 + 3 + 4 + 5):", sum);

console.log("step by step (sum):");
nums.reduce(function (acc, n) {
  let next = acc + n;
  console.log("  acc=" + acc + " + n=" + n + " -> " + next);
  return next;
}, 0);

let product = nums.reduce(function (acc, n) { return acc * n; }, 1);
console.log("product:", product, "(1*1*2*3*4*5)");
console.log("sum (arrow):", nums.reduce((acc, n) => acc + n, 0));
console.log("product (arrow):", nums.reduce((acc, n) => acc * n, 1));

let maxVal = nums.reduce(function (max, n) { return n > max ? n : max; }, nums[0]);
console.log("max:", maxVal);

let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
let count = fruits.reduce(function (acc, fruit) {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log("fruits:", fruits);
console.log("count occurrences:", count);

let nested = [[1, 2], [3, 4], [5]];
let flat = nested.reduce(function (acc, arr) { return acc.concat(arr); }, []);
console.log("nested:", JSON.stringify(nested));
console.log("flattened:", flat);

let cart = [
  { item: "Laptop", price: 500000, qty: 1 },
  { item: "Mouse", price: 15000, qty: 2 },
  { item: "Keyboard", price: 25000, qty: 1 }
];
let total = cart.reduce(function (sum, p) { return sum + p.price * p.qty; }, 0);
console.log("cart:", cart.map(function (p) { return p.item + " x" + p.qty; }).join(", "));
console.log("total:", total.toLocaleString(), "Rwf");
