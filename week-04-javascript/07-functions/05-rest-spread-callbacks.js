// 05 - Rest, Spread, and Callbacks
// Run with: node 05-rest-spread-callbacks.js

console.log("=== Rest and Spread with Functions ===");

function sumAll() {
  let args = Array.from(arguments);
  return args.reduce(function (s, n) { return s + n; }, 0);
}
console.log("sumAll(1,2,3,4):", sumAll(1, 2, 3, 4));

function sumRest(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}
console.log("sumRest(1,2,3,4):", sumRest(1, 2, 3, 4));
console.log("sumRest(10, 20):", sumRest(10, 20));

function introduce(firstName, ...hobbies) {
  return firstName + " likes " + hobbies.join(", ");
}
console.log(introduce("David", "coding", "music", "football"));

console.log("");
console.log("=== Callback Functions ===");

function doTwice(callback) {
  callback();
  callback();
}
doTwice(function () { console.log("called!"); });
doTwice(() => console.log("arrow called!"));

function processArray(arr, fn) {
  let result = [];
  for (let item of arr) {
    result.push(fn(item));
  }
  return result;
}
console.log(processArray([1, 2, 3], function (n) { return n * 10; }));
console.log(processArray([1, 2, 3], n => n * 10));

console.log("");
console.log("=== When to Use Which ===");
console.log("Function declaration: general purpose, hoisted, good for main logic");
console.log("Function expression:  when you need to assign conditionally or pass as value");
console.log("Arrow function:       callbacks, array methods, when you need to preserve this");
console.log("Avoid arrow for:      object methods (this will be wrong), constructors");
