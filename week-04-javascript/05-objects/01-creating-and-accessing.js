// 01 - Creating and Accessing Objects
// Run with: node 01-creating-and-accessing.js

console.log("=== Creating Objects ===");

// Object literal (most common)
let student = {
  name: "David",
  age: 22,
  city: "Kigali",
  isEnrolled: true
};
console.log("object literal:", student);

// Empty object then add properties
let course = {};
course.title = "Frontend Web Dev";
course.weeks = 5;
course["instructor"] = "Mellow"; // bracket notation
console.log("built step by step:", course);

// Using Object constructor
let car = new Object();
car.brand = "Toyota";
car.year = 2022;
console.log("with new Object():", car);

console.log("");
console.log("=== Accessing Properties ===");

let person = { firstName: "Aline", lastName: "Uwase", age: 21 };

console.log("dot notation      :", person.firstName);
console.log("bracket notation  :", person["lastName"]);
let key = "age";
console.log("dynamic key [key] :", person[key]);

// Bracket notation is needed for keys with spaces or special chars
let weird = { "full name": "Grace Hopper", "fav-color": "blue" };
console.log("weird['full name']:", weird["full name"]);
console.log("weird['fav-color']:", weird["fav-color"]);

console.log("");
console.log("=== Adding, Updating, Deleting ===");

let product = { name: "Laptop", price: 500000 };
console.log("start:", product);

product.price = 450000; // update
console.log("updated price:", product);

product.inStock = true; // add new property
console.log("added inStock:", product);

delete product.inStock; // delete
console.log("after delete:", product);
