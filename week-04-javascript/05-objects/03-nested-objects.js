// 03 - Nested Objects and Optional Chaining
// Run with: node 03-nested-objects.js

console.log("=== Nested Objects ===");

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

console.log("");
console.log("=== Optional Chaining (?.) ===");
console.log("Safe access when something might be undefined");

console.log("university.location.city   :", university.location?.city);
console.log("university.foo?.bar        :", university.foo?.bar, "(no error, just undefined)");

let maybeUser = null;
console.log("maybeUser?.name            :", maybeUser?.name);

console.log("");
console.log("=== Object.keys, values, entries ===");

let scores = { math: 85, english: 92, science: 78 };
console.log("object:", scores);
console.log("Object.keys()  :", Object.keys(scores));
console.log("Object.values():", Object.values(scores));
console.log("Object.entries():", Object.entries(scores));

console.log("looping with entries:");
for (let [subject, score] of Object.entries(scores)) {
  console.log("  " + subject + ":", score);
}
