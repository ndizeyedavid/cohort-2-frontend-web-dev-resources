// 04 - Inheritance with extends and super
// Run with: node 04-inheritance.js

console.log("=== Inheritance ===");

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

console.log("");
console.log("=== Full Example: BankAccount ===");

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
    return this;
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

console.log("");
console.log("savings instanceof SavingsAccount:", savings instanceof SavingsAccount);
console.log("savings instanceof BankAccount  :", savings instanceof BankAccount);
