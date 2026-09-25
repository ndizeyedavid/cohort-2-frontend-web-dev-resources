// 04 - this and arguments
// Run with: node 04-this-and-arguments.js

console.log("=== Hoisting Recap ===");
console.log("Function declaration: hoisted, can call before definition");
console.log("Function expression:  not hoisted, must define first");
console.log("Arrow function:       not hoisted, must define first");

console.log(declaredFunc());
function declaredFunc() { return "I am hoisted"; }

const expressedFunc = function () { return "I am not hoisted"; };
console.log(expressedFunc());

const arrowFunc = () => "I am also not hoisted";
console.log(arrowFunc());

console.log("");
console.log("=== this Keyword ===");

let obj = {
  name: "MyObject",
  normalFunc: function () {
    console.log("normalFunc this.name:", this.name);
  },
  arrowFunc: () => {
    console.log("arrowFunc this.name:", this.name, "(from outer scope, not MyObject)");
  },
  shortFunc() {
    console.log("shortFunc this.name:", this.name);
  }
};

console.log("Calling as object method:");
obj.normalFunc();
obj.arrowFunc();
obj.shortFunc();

console.log("");
console.log("Inside setTimeout, arrow preserves this:");
let timer = {
  count: 0,
  startNormal: function () {
    let self = this;
    setTimeout(function () {
      console.log("normal callback this.count:", this.count, "(undefined, this is wrong)");
      console.log("workaround with self.count:", self.count);
    }, 0);
  },
  startArrow: function () {
    setTimeout(() => {
      console.log("arrow callback this.count:", this.count, "(correct)");
    }, 0);
  }
};
timer.startNormal();
timer.startArrow();

console.log("");
console.log("=== arguments Object ===");

function showArgs() {
  console.log("normal function arguments:", arguments);
  console.log("arguments[0]:", arguments[0]);
}
showArgs(1, 2, 3);

const showArgsArrowRest = (...args) => {
  console.log("arrow with rest params:", args);
};
showArgsArrowRest(1, 2, 3);
console.log("Arrow functions do not have arguments, use ...args instead");
