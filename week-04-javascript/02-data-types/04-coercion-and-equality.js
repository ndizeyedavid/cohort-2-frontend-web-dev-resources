// 04 - Type Coercion and Equality
// Run with: node 04-coercion-and-equality.js

console.log("=== Implicit Coercion ===");
console.log('"5" + 3 =', "5" + 3, "(string concatenation)");
console.log('"5" - 3 =', "5" - 3, "(numeric subtraction)");
console.log('"5" * "2" =', "5" * "2");
console.log('true + 1 =', true + 1, "(true becomes 1)");
console.log('false + 1 =', false + 1, "(false becomes 0)");
console.log('null + 1 =', null + 1, "(null becomes 0)");
console.log('undefined + 1 =', undefined + 1, "(undefined becomes NaN)");

console.log("");
console.log("=== Explicit Conversion ===");
console.log('Number("42")  :', Number("42"), "| typeof:", typeof Number("42"));
console.log('String(42)    :', String(42), "| typeof:", typeof String(42));
console.log('Boolean(0)    :', Boolean(0));
console.log('Boolean(1)    :', Boolean(1));
console.log('Boolean("")   :', Boolean(""));
console.log('Boolean("hi") :', Boolean("hi"));

console.log("");
console.log("=== Equality: == vs === ===");
console.log('5 == "5"  :', 5 == "5", "(coercion, true)");
console.log('5 === "5" :', 5 === "5", "(no coercion, false)");
console.log('0 == false:', 0 == false, "(true with ==)");
console.log('0 === false:', 0 === false, "(false with ===)");
console.log('null == undefined :', null == undefined);
console.log('null === undefined:', null === undefined);
console.log("Always use === unless you have a reason not to");
