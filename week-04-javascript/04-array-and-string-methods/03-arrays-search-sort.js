// 03 - Arrays: Searching, Sorting, and Combining
// Run with: node 03-arrays-search-sort.js

console.log("=== Searching ===");

let scores = [10, 42, 7, 42, 99];
console.log("scores:", scores);
console.log("indexOf(42)     :", scores.indexOf(42), "(first occurrence)");
console.log("lastIndexOf(42) :", scores.lastIndexOf(42));
console.log("includes(99)    :", scores.includes(99));
console.log("includes(50)    :", scores.includes(50));

let found = scores.find(function (n) { return n > 40; });
console.log("find(n > 40)    :", found, "(first match)");
console.log("findIndex(n > 40):", scores.findIndex(function (n) { return n > 40; }));

console.log("");
console.log("=== Join and Split ===");

let words = ["Hello", "from", "Kigali"];
console.log("words:", words);
console.log("join(' ')  :", words.join(" "));
console.log("join('-')  :", words.join("-"));
console.log("join('')   :", words.join(""));

let sentence2 = "Rwanda-is-beautiful";
console.log("'" + sentence2 + "'.split('-'):", sentence2.split("-"));

console.log("");
console.log("=== Sorting and Reversing ===");

let nums = [30, 1, 100, 4, 200];
console.log("before sort:", nums);
console.log("sort() default (lexicographic!):", [...nums].sort());
console.log("sort numeric asc  :", [...nums].sort(function (a, b) { return a - b; }));
console.log("sort numeric desc :", [...nums].sort(function (a, b) { return b - a; }));

let names = ["David", "Aline", "Grace", "Bob"];
console.log("names before:", names);
console.log("sort()  :", [...names].sort());
console.log("reverse():", [...names].reverse());

console.log("");
console.log("Hint: sort() without compare sorts as strings. For numbers always use (a,b) => a - b");

console.log("");
console.log("=== Concat, Spread, and Destructuring ===");

let a = [1, 2];
let b = [3, 4];
console.log("concat:", a.concat(b));
console.log("spread: [...a, ...b] =", [...a, ...b]);
console.log("spread with extra: [...a, 99, ...b] =", [...a, 99, ...b]);

let [first2, second, ...rest] = ["a", "b", "c", "d", "e"];
console.log("destructure [first, second, ...rest]:", first2, second, rest);

let [x, y] = [10, 20];
console.log("x:", x, "| y:", y);
[x, y] = [y, x];
console.log("swapped -> x:", x, "| y:", y);
