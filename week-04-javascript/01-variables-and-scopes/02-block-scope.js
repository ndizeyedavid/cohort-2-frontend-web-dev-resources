// 02 - Block Scope
// Run with: node 02-block-scope.js

console.log("=== Block Scope ===");
console.log("Code inside curly braces forms a block (if, for, bare block all count)");
console.log("");

{
  let blockLet = "visible only inside this block";
  const blockConst = "also block scoped";
  var blockVar = "var ignores block scope";
  console.log(blockLet);
  console.log(blockConst);
}

// console.log(blockLet); // ReferenceError: not defined
console.log("blockVar leaked out:", blockVar, "// var leaks");

if (true) {
  let role = "student";
  console.log("inside if:", role);
}
// console.log(role); // ReferenceError: role is not defined

console.log("");
console.log("Loop block scope:");
console.log("with var (leaks):");
for (var i = 0; i < 3; i++) {}
console.log("var i after loop:", i, "// leaked");

console.log("with let (does not leak):");
for (let j = 0; j < 3; j++) {
  console.log("let j:", j);
}
// console.log(j); // ReferenceError: j is block scoped
