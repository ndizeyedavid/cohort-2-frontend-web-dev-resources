// Week 04 - 05 Objects in JavaScript
// Run with: node main.js

console.log("=== 1. Creating Objects ===\n");

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

console.log("\n=== 2. Accessing Properties ===\n");

let person = { firstName: "Aline", lastName: "Uwase", age: 21 };

console.log("dot notation      :", person.firstName);
console.log("bracket notation  :", person["lastName"]);
let key = "age";
console.log("dynamic key [key] :", person[key]);

// Bracket notation is needed for keys with spaces or special chars
let weird = { "full name": "Grace Hopper", "fav-color": "blue" };
console.log("weird['full name']:", weird["full name"]);
console.log("weird['fav-color']:", weird["fav-color"]);

console.log("\n=== 3. Adding, Updating, Deleting ===\n");

let product = { name: "Laptop", price: 500000 };
console.log("start:", product);

product.price = 450000; // update
console.log("updated price:", product);

product.inStock = true; // add new property
console.log("added inStock:", product);

delete product.inStock; // delete
console.log("after delete:", product);

console.log("\n=== 4. Methods (Functions Inside Objects) ===\n");

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

console.log("\n=== 5. Nested Objects ===\n");

let university = {
  name: "ALU",
  location: {
    city: "Kigali",
    country: "Rwanda",
    coordinates: { lat: -1.94, lng: 30.06 }
  },
  students: [
    { name: "David", cohort: "C2" },
    { name: "Aline", cohort: "C2" }
  ]
};

console.log("city:", university.location.city);
console.log("coordinates:", university.location.coordinates.lat, university.location.coordinates.lng);
console.log("first student:", university.students[0].name);
console.log("second student cohort:", university.students[1].cohort);

// Optional chaining (?.)  -  safe access when something might be undefined
console.log("\noptional chaining:");
console.log("university.location.city   :", university.location?.city);
console.log("university.foo?.bar        :", university.foo?.bar, "(no error, just undefined)");

console.log("\n=== 6. Object.keys, values, entries ===\n");

let scores = { math: 85, english: 92, science: 78 };
console.log("object:", scores);
console.log("Object.keys()  :", Object.keys(scores));
console.log("Object.values():", Object.values(scores));
console.log("Object.entries():", Object.entries(scores));

console.log("\nlooping with entries:");
for (let [subject, score] of Object.entries(scores)) {
  console.log("  " + subject + ":", score);
}

console.log("\n=== 7. Destructuring Objects ===\n");

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
let { location: { city } } = university;
console.log("nested city:", city);

// Destructuring in function params
function printUser({ username, email, role }) {
  console.log("User:", username, "|", email, "|", role);
}
printUser(user);

console.log("\n=== 8. Spread and Object.assign ===\n");

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

console.log("\n=== 9. this Keyword ===\n");

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

console.log("\n=== 10. Checking Properties ===\n");

let book = { title: "Eloquent JS", author: "Marijn Haverbeke" };
console.log("'title' in book         :", "title" in book);
console.log("'pages' in book         :", "pages" in book);
console.log("book.hasOwnProperty('title'):", book.hasOwnProperty("title"));
console.log("book.title !== undefined:", book.title !== undefined);

// hasOwnProperty vs in: in checks prototype chain too
console.log("'toString' in book      :", "toString" in book, "(from prototype)");
console.log("book.hasOwnProperty('toString'):", book.hasOwnProperty("toString"));

console.log("\n=== 11. Real Example: Student Records ===\n");

let students = [
  { name: "David", scores: [85, 90, 78], city: "Kigali" },
  { name: "Aline", scores: [92, 88, 95], city: "Huye" },
  { name: "Grace", scores: [70, 75, 80], city: "Kigali" }
];

students.forEach(function (s) {
  let avg = s.scores.reduce(function (sum, n) { return sum + n; }, 0) / s.scores.length;
  console.log(s.name + " (" + s.city + ")  -  avg: " + avg.toFixed(1));
});

// Find students from Kigali
let fromKigali = students.filter(function (s) { return s.city === "Kigali"; });
console.log("\nfrom Kigali:", fromKigali.map(function (s) { return s.name; }).join(", "));
