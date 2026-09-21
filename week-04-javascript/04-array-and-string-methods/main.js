// Week 04 - 04 Array and String Methods
// Run with: node main.js

console.log("=== ARRAY METHODS ===\n");

// Starting array
let fruits = ["apple", "banana", "mango"];
console.log("start:", fruits);

console.log("\n--- Adding and Removing ---");

fruits.push("orange"); // add to end
console.log("push('orange')     :", fruits);

fruits.unshift("grape"); // add to start
console.log("unshift('grape')   :", fruits);

let last = fruits.pop(); // remove from end
console.log("pop() ->", last, "| now:", fruits);

let first = fruits.shift(); // remove from start
console.log("shift() ->", first, "| now:", fruits);

console.log("\n--- Slice vs Splice ---");

// slice: copies a portion, does not modify original
let colors = ["red", "green", "blue", "yellow", "purple"];
console.log("original:", colors);
console.log("slice(1, 3)  :", colors.slice(1, 3), "| original unchanged:", colors);
console.log("slice(2)     :", colors.slice(2));
console.log("slice(-2)    :", colors.slice(-2), "(last 2)");

// splice: modifies original, can remove and insert
let numbers = [1, 2, 3, 4, 5];
console.log("\noriginal:", numbers);
let removed = numbers.splice(2, 2); // start at index 2, remove 2
console.log("splice(2, 2) ->", removed, "| now:", numbers);

let letters = ["a", "b", "e", "f"];
letters.splice(2, 0, "c", "d"); // insert without removing
console.log("splice(2, 0, 'c','d'):", letters);

console.log("\n--- Searching ---");

let scores = [10, 42, 7, 42, 99];
console.log("scores:", scores);
console.log("indexOf(42)     :", scores.indexOf(42), "(first occurrence)");
console.log("lastIndexOf(42) :", scores.lastIndexOf(42));
console.log("includes(99)    :", scores.includes(99));
console.log("includes(50)    :", scores.includes(50));

let found = scores.find(function (n) { return n > 40; });
console.log("find(n > 40)    :", found, "(first match)");
console.log("findIndex(n > 40):", scores.findIndex(function (n) { return n > 40; }));

console.log("\n--- Join and Split ---");

let words = ["Hello", "from", "Kigali"];
console.log("words:", words);
console.log("join(' ')  :", words.join(" "));
console.log("join('-')  :", words.join("-"));
console.log("join('')   :", words.join(""));

let sentence2 = "Rwanda-is-beautiful";
console.log("\n'" + sentence2 + "'.split('-'):", sentence2.split("-"));

console.log("\n--- Sorting and Reversing ---");

let nums = [30, 1, 100, 4, 200];
console.log("before sort:", nums);
console.log("sort() default (lexicographic!):", [...nums].sort());
console.log("sort numeric asc  :", [...nums].sort(function (a, b) { return a - b; }));
console.log("sort numeric desc :", [...nums].sort(function (a, b) { return b - a; }));

let names = ["David", "Aline", "Grace", "Bob"];
console.log("\nnames before:", names);
console.log("sort()  :", [...names].sort());
console.log("reverse():", [...names].reverse());

console.log("\n--- Concat and Spread ---");

let a = [1, 2];
let b = [3, 4];
console.log("concat:", a.concat(b));
console.log("spread: [...a, ...b] =", [...a, ...b]);
console.log("spread with extra: [...a, 99, ...b] =", [...a, 99, ...b]);

console.log("\n--- Destructuring Arrays ---");
let [first2, second, ...rest] = ["a", "b", "c", "d", "e"];
console.log("first:", first2, "| second:", second, "| rest:", rest);

let [x, y] = [10, 20];
console.log("x:", x, "| y:", y);
[x, y] = [y, x]; // swap without temp variable
console.log("swapped -> x:", x, "| y:", y);

console.log("\n\n=== STRING METHODS ===\n");

let str = "  Hello, Kigali! Welcome to JavaScript.  ";
console.log("original: '" + str + "'");

console.log("\n--- Trim ---");
console.log("trim()     : '" + str.trim() + "'");
console.log("trimStart(): '" + str.trimStart() + "'");
console.log("trimEnd()  : '" + str.trimEnd() + "'");

console.log("\n--- Case ---");
console.log("toUpperCase():", str.trim().toUpperCase());
console.log("toLowerCase():", str.trim().toLowerCase());

console.log("\n--- Searching in Strings ---");
let msg = "JavaScript is amazing";
console.log("msg:", msg);
console.log("includes('amazing')  :", msg.includes("amazing"));
console.log("startsWith('Java')   :", msg.startsWith("Java"));
console.log("endsWith('amazing')  :", msg.endsWith("amazing"));
console.log("indexOf('a')         :", msg.indexOf("a"));
console.log("lastIndexOf('a')     :", msg.lastIndexOf("a"));

console.log("\n--- Extracting ---");
let text = "Frontend Web Development";
console.log("text:", text);
console.log("slice(0, 8)      :", text.slice(0, 8));
console.log("slice(9)         :", text.slice(9));
console.log("slice(-11)       :", text.slice(-11));
console.log("substring(0, 8)  :", text.substring(0, 8));
console.log("split(' ')       :", text.split(" "));
console.log("split('').slice(0,5):", text.split("").slice(0, 5));

console.log("\n--- Replacing ---");
let phrase = "I love Kigali, Kigali is beautiful";
console.log("original:", phrase);
console.log("replace('Kigali', 'Rwanda')     :", phrase.replace("Kigali", "Rwanda"), "(first only)");
console.log("replaceAll('Kigali', 'Rwanda')  :", phrase.replaceAll("Kigali", "Rwanda"));
console.log("replace(/Kigali/g, 'Rwanda')    :", phrase.replace(/Kigali/g, "Rwanda"), "(regex)");

console.log("\n--- Padding and Repeating ---");
console.log("'5'.padStart(3, '0')  :", "5".padStart(3, "0"), "(useful for dates: 05)");
console.log("'5'.padEnd(3, '-')    :", "5".padEnd(3, "-"));
console.log("'ha'.repeat(3)        :", "ha".repeat(3));
console.log("'-'.repeat(20)        :", "-".repeat(20));

console.log("\n--- String + Array Together ---");
let csv = "apple,banana,mango,orange";
console.log("csv:", csv);
let arr = csv.split(",");
console.log("split by comma:", arr);
let upper = arr.map(function (s) { return s.toUpperCase(); });
console.log("uppercased:", upper);
console.log("joined with ' | ':", upper.join(" | "));

console.log("\n--- Template Literals ---");
let student = "Grace";
let score = 87;
console.log(`Student ${student} scored ${score}/100`);
console.log(`Status: ${score >= 50 ? "Pass" : "Fail"}`);
console.log(`Multiline
strings with
backticks`);
