// 03 - Static Methods and Properties
// Run with: node 03-static.js

console.log("=== Static Methods and Properties ===");

class MathHelper {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }

  static circleArea(radius) {
    return this.PI * radius * radius;
  }

  instanceAdd(a, b) {
    return a + b;
  }
}

console.log("MathHelper.PI:", MathHelper.PI);
console.log("MathHelper.add(3, 4):", MathHelper.add(3, 4));
console.log("MathHelper.circleArea(5):", MathHelper.circleArea(5).toFixed(2));
console.log("Static methods are called on the class, not instances");
console.log("typeof MathHelper:", typeof MathHelper, "(classes are functions)");
