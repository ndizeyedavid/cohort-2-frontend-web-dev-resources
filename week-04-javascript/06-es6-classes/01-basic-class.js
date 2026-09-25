// 01 - Basic Class and Constructor
// Run with: node 01-basic-class.js

console.log("=== Basic Class ===");

class Student {
  constructor(name, cohort, city) {
    this.name = name;
    this.cohort = cohort;
    this.city = city;
  }

  introduce() {
    return "Hi, I am " + this.name + " from " + this.city + " (" + this.cohort + ")";
  }

  study(subject) {
    return this.name + " is studying " + subject;
  }
}

let s1 = new Student("David", "C2", "Kigali");
let s2 = new Student("Aline", "C2", "Huye");
console.log(s1.introduce());
console.log(s2.introduce());
console.log(s1.study("JavaScript"));

console.log("");
console.log("=== Constructor Details ===");

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = Math.random().toString(36).slice(2, 7);
    console.log("Created product:", this.name, "id:", this.id);
  }
}

let laptop = new Product("Laptop", 500000);
let phone = new Product("Phone", 300000);
console.log(laptop);
console.log(phone);
