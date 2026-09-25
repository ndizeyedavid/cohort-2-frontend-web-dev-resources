// 05 - Private Fields
// Run with: node 05-private-fields.js

console.log("=== Private Fields (Modern JS) ===");

class Counter {
  #count = 0; // private field, only accessible inside class

  increment() {
    this.#count++;
    return this;
  }

  get value() {
    return this.#count;
  }

  reset() {
    this.#count = 0;
    return this;
  }
}

let counter = new Counter();
counter.increment().increment().increment();
console.log("counter value:", counter.value);
// console.log(counter.#count); // SyntaxError: private field is not accessible outside
counter.reset();
console.log("after reset:", counter.value);

console.log("");
console.log("Private fields with # truly hide data, unlike _convention which is just naming");
