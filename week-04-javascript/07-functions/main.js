// Week 04 - 07 Functions: Normal, Expression and Arrow Functions
// Run with: node main.js

console.log("=== 1. Function Declaration (Normal Function) ===\n");

// Hoisted: you can call it before it is defined
console.log("calling before definition:", add(3, 4));

function add(a, b) {
  return a + b;
}

console.log("add(3, 4):", add(3, 4));
console.log("typeof add:", typeof add);
console.log("add.name:", add.name);

function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("David"));
console.log(greet("Aline"));

// Function with default parameters (old way vs ES6 way)
function createUser(name, role) {
  if (role === undefined) role = "student";
  return name + " (" + role + ")";
}
console.log(createUser("David"));
console.log(createUser("Grace", "instructor"));

// Modern default parameter syntax
function makeUser(name, role = "student") {
  return `${name} (${role})`;
}
console.log(makeUser("David"));
console.log(makeUser("David", "admin"));

function withDefaults(a, b = 10) {
  return a + b;
}
console.log("withDefaults(5):", withDefaults(5));
console.log("withDefaults(5, 3):", withDefaults(5, 3));

console.log("\n=== 2. Function Expression ===\n");

// Not hoisted: cannot call before assignment
// console.log(multiply(3, 4)); // ReferenceError

const multiply = function (a, b) {
  return a * b;
};

console.log("multiply(3, 4):", multiply(3, 4));
console.log("typeof multiply:", typeof multiply);

// Named function expression (useful for recursion and debugging)
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};
console.log("factorial(5):", factorial(5));
// console.log(fact(5)); // ReferenceError: fact only visible inside itself

// Function expression assigned conditionally
let operation;
let useAdd = true;
if (useAdd) {
  operation = function (a, b) { return a + b; };
} else {
  operation = function (a, b) { return a - b; };
}
console.log("conditional operation(10, 3):", operation(10, 3));

console.log("\n=== 3. Arrow Functions ===\n");

// Arrow functions: shorter syntax, no own this, no own arguments
const addArrow = function (a, b) { return a + b; }; // equivalent expression
const addArrow2 = (a, b) => {
  return a + b;
};
const addShort = (a, b) => a + b; // implicit return for single expression

console.log("addArrow(3, 4):", addArrow(3, 4));
console.log("addArrow2(3, 4):", addArrow2(3, 4));
console.log("addShort(3, 4):", addShort(3, 4));

// Single parameter can omit parentheses
const double = function (n) { return n * 2; };
const doubleArrow = n => n * 2;
console.log("double(5):", double(5));
console.log("doubleArrow(5):", doubleArrow(5));

// No parameters needs empty parentheses
const getRandom = () => Math.random();
console.log("getRandom():", getRandom().toFixed(4));

// Returning an object: wrap in parentheses
const makePoint = (x, y) => ({ x: x, y: y });
console.log("makePoint(3, 4):", makePoint(3, 4));

console.log("\n--- Arrow Functions in Array Methods (where they shine) ---");
let numbers = [1, 2, 3, 4, 5];
console.log("numbers:", numbers);
console.log("doubled (function):", numbers.map(function (n) { return n * 2; }));
console.log("doubled (arrow)   :", numbers.map(n => n * 2));
console.log("filtered > 3:", numbers.filter(n => n > 3));
console.log("sum:", numbers.reduce((sum, n) => sum + n, 0));

console.log("\n=== 4. Key Differences ===\n");

console.log("--- Hoisting ---");
console.log("Function declaration: hoisted, can call before definition -> works");
console.log("Function expression:  not hoisted, must define first");
console.log("Arrow function:       not hoisted, must define first");

// hoisted
console.log(declaredFunc());
function declaredFunc() { return "I am hoisted"; }

// not hoisted
const expressedFunc = function () { return "I am not hoisted"; };
console.log(expressedFunc());

const arrowFunc = () => "I am also not hoisted";
console.log(arrowFunc());

console.log("\n--- this Keyword ---\n");

let obj = {
  name: "MyObject",
  // Normal function: this is the object that called it
  normalFunc: function () {
    console.log("normalFunc this.name:", this.name);
  },
  // Arrow function: this is inherited from surrounding scope (not the object)
  arrowFunc: () => {
    console.log("arrowFunc this.name:", this.name, "(from outer scope, not MyObject)");
  },
  // Shorthand method (also has correct this)
  shortFunc() {
    console.log("shortFunc this.name:", this.name);
  }
};

console.log("Calling as object method:");
obj.normalFunc();
obj.arrowFunc();
obj.shortFunc();

console.log("\nInside setTimeout, arrow preserves this:");
let timer = {
  count: 0,
  startNormal: function () {
    let self = this; // old workaround
    setTimeout(function () {
      // this here is not timer
      console.log("normal callback this.count:", this.count, "(undefined, this is wrong)");
      console.log("workaround with self.count:", self.count);
    }, 0);
  },
  startArrow: function () {
    setTimeout(() => {
      // arrow inherits this from startArrow, which is timer
      console.log("arrow callback this.count:", this.count, "(correct)");
    }, 0);
  }
};
timer.startNormal();
timer.startArrow();

console.log("\n--- arguments Object ---\n");

function showArgs() {
  console.log("normal function arguments:", arguments);
  console.log("arguments[0]:", arguments[0]);
}
showArgs(1, 2, 3);

// Arrow functions do not have arguments, use rest params instead
const showArgsArrow = function () {
  let args = Array.from(arguments);
  console.log("arrow workaround with rest:", args);
};
const showArgsArrowRest = (...args) => {
  console.log("arrow with rest params:", args);
};
showArgsArrow(1, 2, 3);
showArgsArrowRest(1, 2, 3);

console.log("\n=== 5. Rest and Spread with Functions ===\n");

function sumAll() {
  let args = Array.from(arguments);
  return args.reduce(function (s, n) { return s + n; }, 0);
}
console.log("sumAll(1,2,3,4):", sumAll(1, 2, 3, 4));

// Modern rest parameter
function sumRest(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}
console.log("sumRest(1,2,3,4):", sumRest(1, 2, 3, 4));
console.log("sumRest(10, 20):", sumRest(10, 20));

function introduce(firstName, ...hobbies) {
  return firstName + " likes " + hobbies.join(", ");
}
console.log(introduce("David", "coding", "music", "football"));

console.log("\n=== 6. Callback Functions ===\n");

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

console.log("\n=== 7. When to Use Which ===\n");
console.log("Function declaration: general purpose, hoisted, good for main logic");
console.log("Function expression:  when you need to assign conditionally or pass as value");
console.log("Arrow function:       callbacks, array methods, when you need to preserve this");
console.log("Avoid arrow for:      object methods (this will be wrong), constructors");
