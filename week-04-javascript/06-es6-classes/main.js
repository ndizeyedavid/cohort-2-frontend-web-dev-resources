// Week 04 - 06 ES6 Classes
// Run with: node main.js

console.log("=== 1. Basic Class ===\n");

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

console.log("\n=== 2. Constructor Details ===\n");

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

console.log("\n=== 3. Getters and Setters ===\n");

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
    // Keep height, adjust width to match desired area
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

console.log("\n=== 4. Static Methods and Properties ===\n");

class MathHelper {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }

  static circleArea(radius) {
    return this.PI * radius * radius;
  }

  // Instance method for comparison
  instanceAdd(a, b) {
    return a + b;
  }
}

console.log("MathHelper.PI:", MathHelper.PI);
console.log("MathHelper.add(3, 4):", MathHelper.add(3, 4));
console.log("MathHelper.circleArea(5):", MathHelper.circleArea(5).toFixed(2));
// Static methods are called on the class, not instances
// let m = new MathHelper(); m.add(3,4) would also work but static is the intended way

console.log("\n=== 5. Inheritance with extends and super ===\n");

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a sound";
  }

  describe() {
    return "I am " + this.name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // must call super before using this
    this.breed = breed;
  }

  speak() {
    return this.name + " barks: Woof!";
  }

  // Override but still use parent method
  describe() {
    return super.describe() + " (" + this.breed + ")";
  }

  fetch() {
    return this.name + " is fetching";
  }
}

class Cat extends Animal {
  speak() {
    return this.name + " meows: Meow!";
  }
}

let generic = new Animal("Generic");
let dog = new Dog("Buddy", "Labrador");
let cat = new Cat("Whiskers");

console.log(generic.speak());
console.log(dog.speak());
console.log(dog.describe());
console.log(dog.fetch());
console.log(cat.speak());

console.log("\n=== 6. Full Example: BankAccount ===\n");

class BankAccount {
  static nextId = 1;

  constructor(owner, initialBalance) {
    this.id = BankAccount.nextId++;
    this.owner = owner;
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit must be positive");
      return this;
    }
    this.balance += amount;
    this.transactions.push({ type: "deposit", amount: amount, balance: this.balance });
    console.log(this.owner + " deposited " + amount + ", balance: " + this.balance);
    return this; // for chaining
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log(this.owner + " insufficient funds");
      return this;
    }
    this.balance -= amount;
    this.transactions.push({ type: "withdraw", amount: amount, balance: this.balance });
    console.log(this.owner + " withdrew " + amount + ", balance: " + this.balance);
    return this;
  }

  get formattedBalance() {
    return this.balance.toLocaleString() + " Rwf";
  }

  summary() {
    return "[" + this.id + "] " + this.owner + "  -  " + this.formattedBalance + " (" + this.transactions.length + " transactions)";
  }
}

class SavingsAccount extends BankAccount {
  constructor(owner, initialBalance, interestRate) {
    super(owner, initialBalance);
    this.interestRate = interestRate;
  }

  addInterest() {
    let interest = this.balance * this.interestRate;
    this.deposit(Math.round(interest));
    console.log("Interest added: " + Math.round(interest));
    return this;
  }

  summary() {
    return super.summary() + "  -  " + (this.interestRate * 100) + "% interest";
  }
}

let acc1 = new BankAccount("David", 50000);
acc1.deposit(20000).withdraw(10000).deposit(5000);
console.log(acc1.summary());

let savings = new SavingsAccount("Aline", 100000, 0.05);
savings.deposit(50000).addInterest();
console.log(savings.summary());

console.log("\n=== 7. instanceof and typeof ===\n");

console.log("savings instanceof SavingsAccount:", savings instanceof SavingsAccount);
console.log("savings instanceof BankAccount  :", savings instanceof BankAccount);
console.log("savings instanceof Animal       :", savings instanceof Animal);
console.log("typeof Student                  :", typeof Student, "(classes are functions)");
console.log("typeof s1                       :", typeof s1, "(instances are objects)");

console.log("\n=== 8. Private Fields (Modern JS) ===\n");

class Counter {
  #count = 0; // private field, only accessible inside class

  increment() {
    this.#count++;
    return this;
  }

  get value() {
    return this.#count;
  }

  reset() {
    this.#count = 0;
    return this;
  }
}

let counter = new Counter();
counter.increment().increment().increment();
console.log("counter value:", counter.value);
// console.log(counter.#count); // SyntaxError: private field
counter.reset();
console.log("after reset:", counter.value);
