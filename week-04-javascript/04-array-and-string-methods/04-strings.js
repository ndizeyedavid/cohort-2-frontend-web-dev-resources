// 04 - String Methods
// Run with: node 04-strings.js

console.log("=== String Methods ===");

let str = "  Hello, Kigali! Welcome to JavaScript.  ";
console.log("original: '" + str + "'");

console.log("");
console.log("--- Trim ---");
console.log("trim()     : '" + str.trim() + "'");
console.log("trimStart(): '" + str.trimStart() + "'");
console.log("trimEnd()  : '" + str.trimEnd() + "'");

console.log("");
console.log("--- Case ---");
console.log("toUpperCase():", str.trim().toUpperCase());
console.log("toLowerCase():", str.trim().toLowerCase());

console.log("");
console.log("--- Searching in Strings ---");
let msg = "JavaScript is amazing";
console.log("msg:", msg);
console.log("includes('amazing')  :", msg.includes("amazing"));
console.log("startsWith('Java')   :", msg.startsWith("Java"));
console.log("endsWith('amazing')  :", msg.endsWith("amazing"));
console.log("indexOf('a')         :", msg.indexOf("a"));
console.log("lastIndexOf('a')     :", msg.lastIndexOf("a"));

console.log("");
console.log("--- Extracting ---");
let text = "Frontend Web Development";
console.log("text:", text);
console.log("slice(0, 8)      :", text.slice(0, 8));
console.log("slice(9)         :", text.slice(9));
console.log("slice(-11)       :", text.slice(-11));
console.log("substring(0, 8)  :", text.substring(0, 8));
console.log("split(' ')       :", text.split(" "));
console.log("split('').slice(0,5):", text.split("").slice(0, 5));

console.log("");
console.log("--- Replacing ---");
let phrase = "I love Kigali, Kigali is beautiful";
console.log("original:", phrase);
console.log("replace('Kigali', 'Rwanda')     :", phrase.replace("Kigali", "Rwanda"), "(first only)");
console.log("replaceAll('Kigali', 'Rwanda')  :", phrase.replaceAll("Kigali", "Rwanda"));
console.log("replace(/Kigali/g, 'Rwanda')    :", phrase.replace(/Kigali/g, "Rwanda"), "(regex)");

console.log("");
console.log("--- Padding and Repeating ---");
console.log("'5'.padStart(3, '0')  :", "5".padStart(3, "0"), "(useful for dates: 05)");
console.log("'5'.padEnd(3, '-')    :", "5".padEnd(3, "-"));
console.log("'ha'.repeat(3)        :", "ha".repeat(3));
console.log("'-'.repeat(20)        :", "-".repeat(20));

console.log("");
console.log("--- String + Array Together ---");
let csv = "apple,banana,mango,orange";
console.log("csv:", csv);
let arr = csv.split(",");
console.log("split by comma:", arr);
let upper = arr.map(function (s) { return s.toUpperCase(); });
console.log("uppercased:", upper);
console.log("joined with ' | ':", upper.join(" | "));

console.log("");
console.log("--- Template Literals ---");
let student = "Grace";
let score = 87;
console.log(`Student ${student} scored ${score}/100`);
console.log(`Status: ${score >= 50 ? "Pass" : "Fail"}`);
console.log(`Multiline
strings with
backticks`);
