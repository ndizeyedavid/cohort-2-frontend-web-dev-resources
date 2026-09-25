// 01 - Function Declaration (Normal Function)
// Run with: node 01-declaration.js

console.log("=== Function Declaration ===");

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

console.log("");
console.log("=== Default Parameters ===");

function createUser(name, role) {
  if (role === undefined) role = "student";
  return name + " (" + role + ")";
}
console.log(createUser("David"));
console.log(createUser("Grace", "instructor"));

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
