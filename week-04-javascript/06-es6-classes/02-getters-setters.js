// 02 - Getters and Setters
// Run with: node 02-getters-setters.js

console.log("=== Getters and Setters ===");

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  get perimeter() {
    return 2 * (this.width + this.height);
  }

  set area(value) {
    this.width = value / this.height;
  }

  describe() {
    return this.width + " x " + this.height + " (area: " + this.area + ")";
  }
}

let rect = new Rectangle(10, 5);
console.log(rect.describe());
console.log("area:", rect.area);
console.log("perimeter:", rect.perimeter);
rect.area = 100;
console.log("after setting area to 100:", rect.describe());
console.log("Getting area looks like a property but runs a function");
