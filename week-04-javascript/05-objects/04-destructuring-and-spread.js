// 04 - Destructuring and Spread
// Run with: node 04-destructuring-and-spread.js

console.log("=== Destructuring Objects ===");

let user = { username: "mellow", email: "mellow@alu.edu", role: "student", age: 22 };

// Basic destructuring
let { username, email } = user;
console.log("username:", username, "| email:", email);

// Rename while destructuring
let { username: uname, role: userRole } = user;
console.log("uname:", uname, "| userRole:", userRole);

// Default values
let { nickname = "Anonymous", role } = user;
console.log("nickname (default):", nickname, "| role:", role);

// Nested destructuring
let university = {
  name: "ALU",
  location: { city: "Kigali", country: "Rwanda" }
};
let { location: { city } } = university;
console.log("nested city:", city);

// Destructuring in function params
function printUser({ username, email, role }) {
  console.log("User:", username, "|", email, "|", role);
}
printUser(user);

console.log("");
console.log("=== Spread and Object.assign ===");

// Spread: copy and merge
let defaults = { theme: "light", fontSize: 14, showSidebar: true };
let overrides = { theme: "dark", fontSize: 16 };
let settings = { ...defaults, ...overrides };
console.log("merged with spread:", settings);

// Copy without mutating original
let original = { a: 1, b: 2 };
let copy = { ...original };
copy.a = 99;
console.log("original:", original, "| copy:", copy, "(original unchanged)");

let merged = Object.assign({}, defaults, overrides);
console.log("Object.assign:", merged);
