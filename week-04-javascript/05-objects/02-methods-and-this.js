// 02 - Object Methods and the this Keyword
// Run with: node 02-methods-and-this.js

console.log("=== Methods (Functions Inside Objects) ===");

let calculator = {
  value: 0,
  add: function (n) {
    this.value += n; // this refers to calculator
    return this;
  },
  subtract: function (n) {
    this.value -= n;
    return this;
  },
  getValue: function () {
    return this.value;
  }
};

calculator.add(10).subtract(3).add(5);
console.log("chained calculator value:", calculator.getValue());

// Shorthand method syntax (ES6)
let greeter = {
  name: "Kigali",
  greet() {
    return "Hello from " + this.name;
  },
  greetPerson(personName) {
    return "Hello " + personName + ", welcome to " + this.name;
  }
};
console.log(greeter.greet());
console.log(greeter.greetPerson("David"));

console.log("");
console.log("=== this Keyword ===");

let counter = {
  count: 0,
  increment() {
    this.count++;
    console.log("count:", this.count);
  },
  // Arrow function does NOT have its own this
  // It inherits this from the surrounding scope
  arrowIncrement: () => {
    // this here is not counter, it is the outer scope
    console.log("arrow this.count:", this.count, "(not what you expect)");
  }
};

counter.increment();
counter.increment();
counter.arrowIncrement();
console.log("Arrow this is wrong for methods, use normal function or shorthand instead");
